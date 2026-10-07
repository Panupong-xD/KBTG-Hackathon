import { readFile, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

// public/brand-mark.svg is the single source for the site mark and every favicon.
const source = await readFile(new URL('../public/brand-mark.svg', import.meta.url));
for (const path of ['../public/icon.svg', '../src/app/icon.svg']) {
  await writeFile(new URL(path, import.meta.url), source);
}
for (const [name, size] of [['icon.png', 256], ['apple-icon.png', 180]]) {
  const png = await sharp(source).resize(size, size).png().toBuffer();
  for (const root of ['../public/', '../src/app/']) {
    await writeFile(new URL(root + name, import.meta.url), png);
  }
}

// ICO supports PNG payloads. Keep real 16, 32 and 48 px entries for small tabs.
const sizes = [16, 32, 48];
const images = await Promise.all(sizes.map(size => sharp(source).resize(size, size).png().toBuffer()));
const header = Buffer.alloc(6 + images.length * 16);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(images.length, 4);
let offset = header.length;
images.forEach((png, index) => {
  const entry = 6 + index * 16;
  header[entry] = sizes[index];
  header[entry + 1] = sizes[index];
  header.writeUInt16LE(1, entry + 4);
  header.writeUInt16LE(32, entry + 6);
  header.writeUInt32LE(png.length, entry + 8);
  header.writeUInt32LE(offset, entry + 12);
  offset += png.length;
});
const ico = Buffer.concat([header, ...images]);
for (const path of ['../public/favicon.ico', '../src/app/favicon.ico']) {
  await writeFile(new URL(path, import.meta.url), ico);
}
console.log('Generated matching SVG, PNG, Apple touch icon and ICO assets.');
