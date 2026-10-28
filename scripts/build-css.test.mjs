import assert from 'node:assert/strict';
import test from 'node:test';
import { mkdtempSync, mkdirSync, readFileSync, realpathSync, rmSync, symlinkSync, writeFileSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const repository = dirname(dirname(fileURLToPath(import.meta.url)));
const source = readFileSync(join(repository, 'scripts/build-css.mjs'));

function fixture(run, { name = 'project', outputDirectory = true } = {}) {
  const root = realpathSync(mkdtempSync(join(tmpdir(), 'runway-css-test-')));
  const project = join(root, name);
  mkdirSync(join(project, 'scripts'), { recursive: true });
  mkdirSync(join(project, outputDirectory ? 'src/app' : 'src'), { recursive: true });
  symlinkSync(join(repository, 'node_modules'), join(project, 'node_modules'), 'dir');
  writeFileSync(join(project, 'scripts/build-css.mjs'), source);
  writeFileSync(join(project, 'src/example.tsx'), '<div className="bg-red-500 md:p-7" />');
  try { run(project); } finally { rmSync(root, { recursive: true, force: true }); }
}

test('CSS generation runs from paths containing spaces and non-ASCII characters', () => {
  fixture(project => {
    const result = spawnSync(process.execPath, [join(project, 'scripts/build-css.mjs')], { cwd: project, encoding: 'utf8' });
    assert.equal(result.status, 0, result.stderr);
    const css = readFileSync(join(project, 'src/app/globals.css'), 'utf8');
    assert.match(css, /\.bg-red-500/);
    assert.match(css, /\.md\\:p-7/);
  }, { name: 'Mobile Documents ทดสอบ' });
});

test('a symlinked script entry still runs generation', () => {
  fixture(project => {
    const alias = join(project, 'scripts/css-alias.mjs');
    symlinkSync(join(project, 'scripts/build-css.mjs'), alias);
    const result = spawnSync(process.execPath, [alias], { cwd: project, encoding: 'utf8' });
    assert.equal(result.status, 0, result.stderr);
    assert.ok(existsSync(join(project, 'src/app/globals.css')));
  });
});

test('a CSS generation failure stops the npm prebuild hook before build starts', () => {
  fixture(project => {
    writeFileSync(join(project, 'package.json'), JSON.stringify({ scripts: {
      prebuild: 'node scripts/build-css.mjs',
      build: 'node -e "require(\'fs\').writeFileSync(\'build-started\', \'yes\')"',
    } }));
    const result = spawnSync('npm', ['run', 'build'], { cwd: project, encoding: 'utf8', env: { ...process.env, npm_config_cache: join(project, '.npm-cache') } });
    assert.notEqual(result.status, 0);
    assert.equal(existsSync(join(project, 'build-started')), false);
    assert.match(result.stderr, /ENOENT/);
  }, { outputDirectory: false });
});
