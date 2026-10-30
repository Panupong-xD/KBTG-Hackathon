// Capture the phone mockup in each demo state as PNGs for slides and the demo video.
// Usage: start `npm run dev`, then `npm run screenshots` (env: DEMO_URL, CHROME_PATH, OUT_DIR).
// Drives a local headless Chrome over the DevTools protocol, so no extra dependency is needed.
import { spawn } from 'node:child_process';
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';

const url = process.env.DEMO_URL ?? 'http://localhost:3000/';
const outDir = path.resolve(process.env.OUT_DIR ?? 'screenshots');
const chromePath = process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
// Same size and density every run, so new shots can replace old ones on the slides.
const viewport = { width: 1440, height: 1000, deviceScaleFactor: 2 };
const port = 9300 + Math.floor(Math.random() * 500);

// Each scene starts from a fresh page load. Steps are DOM selectors or button text to click.
const scenes = [
  { name: '01-home', steps: [] },
  { name: '02-overview-details', steps: [{ selector: 'button[aria-label="ดูรายละเอียดค่าใช้จ่ายและยอดใช้ได้วันนี้"]' }] },
  { name: '03-saving', steps: [{ selector: '[data-phone-mockup] button[aria-label="ออมเงิน"]' }] },
  { name: '04-choose-pocket', steps: [{ selector: '[data-phone-mockup] button[aria-label="ออมเงิน"]' }, { text: 'เลย' }] },
  { name: '05-saved', steps: [
    { selector: '[data-phone-mockup] button[aria-label="ออมเงิน"]' }, { text: 'เลย' },
    { selector: '[role="dialog"] button[aria-pressed]:not([disabled])' }, { text: 'ยืนยัน' },
  ] },
  { name: '06-my-finance', steps: [{ text: 'การเงินของฉัน' }] },
  { name: '07-account-summary', steps: [{ text: 'การเงินของฉัน' }, { text: 'ดูที่มาของยอด' }] },
  { name: '08-account-timeline', steps: [{ text: 'การเงินของฉัน' }, { text: 'ดูที่มาของยอด' }, { scroll: '[role="dialog"] ol' }] },
  { name: '09-customize-income', steps: [{ text: 'การเงินของฉัน' }, { text: 'อัปเดตวันเงินเข้า' }] },
  { name: '10-customize-preview', steps: [{ text: 'การเงินของฉัน' }, { text: 'แก้เอง' }, { text: 'ยืนยัน' }, { text: 'กลาง' }, { scroll: '[role="dialog"] footer' }] },
];

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function waitForJson(endpoint) {
  for (let i = 0; i < 50; i++) {
    try { return await (await fetch(endpoint)).json(); } catch { await sleep(200); }
  }
  throw new Error(`Chrome did not start (${chromePath}). Set CHROME_PATH.`);
}

function connect(wsUrl) {
  const socket = new WebSocket(wsUrl);
  let id = 0;
  const pending = new Map();
  const listeners = new Set();
  socket.onmessage = ({ data }) => {
    const message = JSON.parse(data);
    if (message.id && pending.has(message.id)) {
      const { resolve, reject } = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) reject(new Error(message.error.message)); else resolve(message.result);
    } else for (const listener of listeners) listener(message);
  };
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    pending.set(++id, { resolve, reject });
    socket.send(JSON.stringify({ id, method, params }));
  });
  const once = method => new Promise(resolve => {
    const listener = message => { if (message.method === method) { listeners.delete(listener); resolve(message.params); } };
    listeners.add(listener);
  });
  return new Promise((resolve, reject) => {
    socket.onopen = () => resolve({ send, once, close: () => socket.close() });
    socket.onerror = reject;
  });
}

// Runs in the page: find the target inside the phone (or an open dialog) and click it,
// or scroll it into view inside its scrolling page.
function clickScript(step) {
  return `(() => {
    const step = ${JSON.stringify(step)};
    const visible = el => el && el.getClientRects().length > 0 && !el.closest('[inert],[hidden]');
    if (step.scroll) {
      const element = [...document.querySelectorAll(step.scroll)].find(visible);
      element?.scrollIntoView({ block: 'end' });
      document.querySelector('[data-phone-mockup]')?.scrollIntoView({ block: 'center' });
      return Boolean(element);
    }
    const target = step.selector
      ? [...document.querySelectorAll(step.selector)].find(visible)
      : [...document.querySelectorAll('[data-phone-mockup] button, [role="dialog"] button')]
          .find(el => visible(el) && el.textContent.includes(step.text));
    if (!target) return false;
    target.click();
    return true;
  })()`;
}

async function capture(client, scene) {
  const loaded = client.once('Page.loadEventFired');
  await client.send('Page.navigate', { url });
  await loaded;
  await client.send('Runtime.evaluate', { expression: `document.querySelector('[data-phone-mockup]')?.scrollIntoView({ block: 'center' })` });
  await sleep(1500);
  for (const step of scene.steps) {
    const { result } = await client.send('Runtime.evaluate', { expression: clickScript(step) });
    if (!result.value) throw new Error(`${scene.name}: could not find ${step.selector ?? step.scroll ?? `button "${step.text}"`}`);
    await sleep(900);
  }
  const { result } = await client.send('Runtime.evaluate', {
    // Screenshot clips use page coordinates, so add the scroll offset.
    expression: `(() => { const r = document.querySelector('[data-phone-mockup]').getBoundingClientRect();
      return JSON.stringify({ x: r.x + scrollX, y: r.y + scrollY, width: r.width, height: r.height }); })()`,
  });
  const rect = JSON.parse(result.value);
  const pad = 24;
  const { data } = await client.send('Page.captureScreenshot', {
    format: 'png',
    clip: { x: Math.max(0, rect.x - pad), y: Math.max(0, rect.y - pad), width: rect.width + pad * 2, height: rect.height + pad * 2, scale: 1 },
  });
  const file = path.join(outDir, `${scene.name}.png`);
  await writeFile(file, Buffer.from(data, 'base64'));
  return file;
}

const profile = await mkdtemp(path.join(tmpdir(), 'demo-shots-'));
const chrome = spawn(chromePath, [
  '--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`,
  '--no-first-run', '--no-default-browser-check', '--hide-scrollbars', 'about:blank',
], { stdio: 'ignore' });

try {
  await fetch(url).catch(() => { throw new Error(`${url} is not reachable. Start \`npm run dev\` first.`); });
  await mkdir(outDir, { recursive: true });
  const targets = await waitForJson(`http://127.0.0.1:${port}/json/list`);
  const page = targets.find(target => target.type === 'page');
  const client = await connect(page.webSocketDebuggerUrl);
  await client.send('Page.enable');
  await client.send('Emulation.setDeviceMetricsOverride', { ...viewport, mobile: false });
  await client.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  for (const scene of scenes) console.log(await capture(client, scene));
  client.close();
} finally {
  chrome.kill();
  await rm(profile, { recursive: true, force: true }).catch(() => {});
}
