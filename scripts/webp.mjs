// Converte os PNG de public/ para WebP.
// Uso: node scripts/webp.mjs [quality]   (padrão 88)
import { readdir } from 'node:fs/promises';
import { statSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const DIR = 'public';
const quality = Number(process.argv[2] ?? 88);

const files = (await readdir(DIR)).filter((f) => f.endsWith('.png'));

for (const file of files) {
  const src = path.join(DIR, file);
  const out = src.replace(/\.png$/, '.webp');

  await sharp(src).webp({ quality, effort: 6 }).toFile(out);

  const kb = (n) => Math.round(statSync(n).size / 1024);
  console.log(`${file.padEnd(24)} ${kb(src)}K → ${kb(out)}K`);
}
