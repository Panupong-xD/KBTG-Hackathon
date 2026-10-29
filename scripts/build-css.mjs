import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'node:url';
import { compile } from 'tailwindcss';

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== 'node_modules' && file !== '.next' && file !== '.git') {
        getAllFiles(fullPath, arrayOfFiles);
      }
    } else if (/\.(tsx|ts|jsx|js|html)$/.test(file)) {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

function extractCandidates(content) {
  const regex = /(?:className|class)\s*=\s*(?:["']([^"']*)["']|{`([^`]*)`})/g;
  const candidates = new Set();
  
  let match;
  while ((match = regex.exec(content)) !== null) {
    const rawClasses = (match[1] || match[2] || '').split(/\s+/);
    for (const cls of rawClasses) {
      const cleaned = cls.trim().replace(/^['"`]|['"`]$/g, '');
      if (cleaned && !cleaned.includes('${')) {
        candidates.add(cleaned);
      }
    }
  }

  const tokenRegex = /['"`]([a-zA-Z0-9_\-:#%.\/\[\]]+(?:\s+[a-zA-Z0-9_\-:#%.\/\[\]]+)*)['"`]/g;
  while ((match = tokenRegex.exec(content)) !== null) {
    const words = match[1].split(/\s+/);
    for (const w of words) {
      if (w && /^[a-zA-Z0-9_\-:#%.\/\[\]]+$/.test(w)) {
        candidates.add(w);
      }
    }
  }

  return Array.from(candidates);
}

export async function generateTailwindCSS() {
  const srcDir = path.join(process.cwd(), 'src');
  const files = getAllFiles(srcDir);
  
  const allCandidates = new Set();
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf-8');
    const candidates = extractCandidates(content);
    for (const c of candidates) {
      allCandidates.add(c);
    }
  }

  // Common core classes for light theme & responsive
  const baseDefaults = [
    'flex', 'inline-flex', 'grid', 'hidden', 'block', 'inline-block',
    'items-center', 'items-start', 'items-end', 'justify-between', 'justify-center', 'justify-start', 'justify-end',
    'relative', 'absolute', 'fixed', 'sticky', 'inset-0', 'top-0', 'left-0', 'right-0', 'bottom-0', 'z-10', 'z-20', 'z-30', 'z-40', 'z-50',
    'w-full', 'h-full', 'min-h-screen', 'max-w-7xl', 'max-w-6xl', 'max-w-5xl', 'max-w-4xl', 'max-w-3xl', 'max-w-2xl', 'max-w-xl', 'max-w-lg', 'max-w-md',
    'mx-auto', 'my-auto', 'p-4', 'p-6', 'p-8', 'px-4', 'px-6', 'py-2', 'py-3', 'py-4', 'py-6', 'py-8', 'py-12', 'py-16', 'py-20', 'py-24',
    'gap-2', 'gap-3', 'gap-4', 'gap-6', 'gap-8', 'gap-12',
    'rounded-lg', 'rounded-xl', 'rounded-2xl', 'rounded-3xl', 'rounded-full',
    'border', 'border-slate-100', 'border-slate-200', 'border-slate-300', 'border-emerald-200', 'border-emerald-500',
    'bg-white', 'bg-slate-50', 'bg-slate-100', 'bg-slate-200', 'bg-slate-900', 'bg-slate-950',
    'bg-emerald-50', 'bg-emerald-100', 'bg-emerald-500', 'bg-emerald-600',
    'text-white', 'text-slate-900', 'text-slate-800', 'text-slate-700', 'text-slate-600', 'text-slate-500', 'text-slate-400',
    'text-emerald-600', 'text-emerald-700', 'text-emerald-500',
    'font-normal', 'font-medium', 'font-semibold', 'font-bold', 'font-extrabold',
    'text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl', 'text-4xl', 'text-5xl', 'text-6xl',
    'transition-all', 'transition-colors', 'transition-transform', 'duration-200', 'duration-300', 'duration-500',
    'cursor-pointer', 'overflow-hidden', 'shadow-sm', 'shadow-md', 'shadow-lg', 'shadow-xl', 'shadow-2xl'
  ];
  for (const b of baseDefaults) allCandidates.add(b);

  // KaTang brand tokens (kt-*), mirrored from the KaTang design system.
  // The phone mockup keeps its own CSS modules and does not use these.
  const katangTheme = `@theme {
  --color-kt-cream: #FAF5EA;
  --color-kt-paper: #FFFDF8;
  --color-kt-sage: #EEF3E2;
  --color-kt-tint: #DCE8C8;
  --color-kt-line: #E6DCC8;
  --color-kt-ink: #263321;
  --color-kt-muted: #66705A;
  --color-kt-leaf: #5FA057;
  --color-kt-leaf-strong: #3F7A3F;
  --color-kt-deep: #3E5A2E;
  --color-kt-fresh: #A7C957;
  --color-kt-blush: #F4A39A;
  --color-kt-coin: #F6C344;
  --color-kt-warn: #A44A06;
  --color-kt-danger: #C0262D;
  --font-brand: "Itim", "Prompt", system-ui, sans-serif;
}`;

  const compiler = await compile(`@import "tailwindcss";\n${katangTheme}`, {
    base: process.cwd(),
    loadStylesheet: async (id, base) => {
      let resolved = id === 'tailwindcss' 
        ? path.join(process.cwd(), 'node_modules/tailwindcss/index.css')
        : path.resolve(base, id);
      return {
        content: fs.readFileSync(resolved, 'utf-8'),
        base: path.dirname(resolved)
      };
    }
  });

  const generatedCss = compiler.build(Array.from(allCandidates));

  // Custom prototype light theme styles
  const customCss = `
body {
  font-family: 'Prompt', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* KaTang primary button: brand-strong fill, white text (5.2:1) */
.kt-btn {
  background-color: #3F7A3F;
  color: #ffffff;
  transition: background-color 0.2s ease-in-out, transform 0.2s ease-in-out;
}

.kt-btn:hover {
  background-color: #34663A;
}

.kt-btn:active {
  transform: translateY(1px);
}

/* Custom warm scrollbar */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: #FAF5EA;
}
::-webkit-scrollbar-thumb {
  background: #E6DCC8;
  border-radius: 9999px;
}
::-webkit-scrollbar-thumb:hover {
  background: #5FA057;
}

@media (prefers-reduced-motion: no-preference) {
  .kt-float {
    animation: kt-float 4s ease-in-out infinite;
  }
}

@keyframes kt-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}
`;

  const finalCss = generatedCss + '\n' + customCss;
  fs.writeFileSync(path.join(process.cwd(), 'src/app/globals.css'), finalCss);
  console.log(`[build-css] Generated globals.css (${finalCss.length} bytes, ${allCandidates.size} candidates)`);
}

if (process.argv[1] && fs.realpathSync(path.resolve(process.argv[1])) === fileURLToPath(import.meta.url)) {
  generateTailwindCSS().catch(error => {
    console.error(error);
    process.exitCode = 1;
  });
}
