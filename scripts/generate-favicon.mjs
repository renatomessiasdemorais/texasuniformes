import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const APP_DIR = path.join(__dirname, "..", "src", "app");

const NAVY = "#14213D";
const TEAL = "#1C9C8B";
const WHITE = "#FFFFFF";

function markSvg(size) {
  const radius = size * 0.22;
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
      <rect width="${size}" height="${size}" rx="${radius}" fill="${NAVY}" />
      <text x="${size / 2}" y="${size * 0.72}" text-anchor="middle"
        font-family="Arial, Helvetica, sans-serif" font-weight="700"
        font-size="${size * 0.62}" fill="${WHITE}">T<tspan fill="${TEAL}">U</tspan></text>
    </svg>
  `;
}

async function renderPng(size, outPath) {
  await sharp(Buffer.from(markSvg(size))).png().toFile(outPath);
  console.log("✓", path.relative(process.cwd(), outPath));
}

/** Builds a minimal single-image ICO container wrapping a PNG payload (supported since Windows Vista). */
function pngToIco(pngBuffer, size) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(1, 4); // image count

  const entry = Buffer.alloc(16);
  entry.writeUInt8(size >= 256 ? 0 : size, 0); // width (0 = 256)
  entry.writeUInt8(size >= 256 ? 0 : size, 1); // height (0 = 256)
  entry.writeUInt8(0, 2); // color palette
  entry.writeUInt8(0, 3); // reserved
  entry.writeUInt16LE(1, 4); // color planes
  entry.writeUInt16LE(32, 6); // bits per pixel
  entry.writeUInt32LE(pngBuffer.length, 8); // image size
  entry.writeUInt32LE(22, 12); // offset (6 header + 16 entry)

  return Buffer.concat([header, entry, pngBuffer]);
}

async function main() {
  await mkdir(APP_DIR, { recursive: true });

  await renderPng(512, path.join(APP_DIR, "icon.png"));
  await renderPng(180, path.join(APP_DIR, "apple-icon.png"));

  const icoPngBuffer = await sharp(Buffer.from(markSvg(64))).png().toBuffer();
  const ico = pngToIco(icoPngBuffer, 64);
  const icoPath = path.join(APP_DIR, "favicon.ico");
  await writeFile(icoPath, ico);
  console.log("✓", path.relative(process.cwd(), icoPath));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
