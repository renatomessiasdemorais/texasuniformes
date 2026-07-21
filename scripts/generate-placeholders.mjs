import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "..", "public", "placeholders");

const NAVY = "#14213D";
const NAVY_SECONDARY = "#1C2B45";
const TEAL = "#1C9C8B";
const WHITE = "#FFFFFF";

const FONT = "Arial, Helvetica, sans-serif";

const WATERMARK = `
  <text x="97%" y="96%" text-anchor="end" font-family="${FONT}" font-size="18"
    fill="${WHITE}" fill-opacity="0.55" letter-spacing="1">IMAGEM ILUSTRATIVA — EM BREVE FOTO REAL</text>
`;

function wordmark(x, y, size, anchor = "start") {
  return `
    <text x="${x}" y="${y}" text-anchor="${anchor}" font-family="${FONT}" font-weight="700"
      font-size="${size}" letter-spacing="2" fill="${WHITE}">TEXAS <tspan fill="${TEAL}">UNIFORMES</tspan></text>
  `;
}

function diagonalStripes(w, h, color, opacity = 0.08) {
  const stripes = [];
  const step = Math.max(w, h) / 14;
  for (let i = -14; i < 28; i++) {
    const x = i * step;
    stripes.push(
      `<line x1="${x}" y1="${h + step}" x2="${x + h + step}" y2="-${step}" stroke="${color}" stroke-opacity="${opacity}" stroke-width="${step * 0.45}" />`
    );
  }
  return stripes.join("\n");
}

function concentricArcs(w, h, color, opacity = 0.1) {
  const cx = w * 0.82;
  const cy = h * 0.18;
  const rings = [];
  for (let r = 60; r < Math.max(w, h); r += 90) {
    rings.push(
      `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${color}" stroke-opacity="${opacity}" stroke-width="26" />`
    );
  }
  return rings.join("\n");
}

function crosshatch(w, h, color, opacity = 0.08) {
  const lines = [];
  const step = Math.max(w, h) / 16;
  for (let i = -16; i < 32; i++) {
    const x = i * step;
    lines.push(
      `<line x1="${x}" y1="0" x2="${x}" y2="${h}" stroke="${color}" stroke-opacity="${opacity}" stroke-width="${step * 0.18}" />`
    );
  }
  for (let j = -4; j < 20; j++) {
    const y = j * step;
    lines.push(
      `<line x1="0" y1="${y}" x2="${w}" y2="${y}" stroke="${color}" stroke-opacity="${opacity}" stroke-width="${step * 0.18}" />`
    );
  }
  return lines.join("\n");
}

function waves(w, h, color, opacity = 0.1) {
  const paths = [];
  const amplitude = h / 22;
  for (let i = 0; i < 10; i++) {
    const yBase = (h / 10) * i + amplitude;
    paths.push(
      `<path d="M0 ${yBase} Q ${w / 4} ${yBase - amplitude}, ${w / 2} ${yBase} T ${w} ${yBase}" fill="none" stroke="${color}" stroke-opacity="${opacity}" stroke-width="10" />`
    );
  }
  return paths.join("\n");
}

const SEGMENTS = [
  {
    slug: "uniformes-profissionais",
    title: "Uniformes Profissionais",
    from: NAVY,
    to: NAVY_SECONDARY,
    pattern: diagonalStripes,
    pieces: ["Camisa Social", "Calça Social", "Colete Corporativo", "Jaqueta"],
  },
  {
    slug: "linha-hospitalar",
    title: "Linha Hospitalar",
    from: "#0F7A6D",
    to: NAVY,
    pattern: concentricArcs,
    pieces: ["Jaleco", "Scrub Conjunto", "Touca Cirúrgica", "Sapato Impermeável"],
  },
  {
    slug: "uniformes-escolares",
    title: "Uniformes Escolares",
    from: NAVY_SECONDARY,
    to: "#20345A",
    pattern: crosshatch,
    pieces: ["Camiseta Escolar", "Bermuda", "Agasalho", "Conjunto Ed. Física"],
  },
  {
    slug: "texteis-hotelaria",
    title: "Têxteis para Hotelaria",
    from: "#0D5C52",
    to: NAVY_SECONDARY,
    pattern: waves,
    pieces: ["Jogo de Lençol", "Toalha de Banho", "Roupão", "Uniforme Recepção"],
  },
];

function baseSvg(w, h, from, to, patternFn, angle = 135) {
  return `
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%" gradientTransform="rotate(${angle} 0.5 0.5)">
        <stop offset="0%" stop-color="${from}" />
        <stop offset="100%" stop-color="${to}" />
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#bg)" />
    ${patternFn(w, h, WHITE)}
  `;
}

async function renderJpg(svg, w, h, outPath) {
  await sharp(Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${svg}</svg>`))
    .jpeg({ quality: 82 })
    .toFile(outPath);
  console.log("✓", path.relative(process.cwd(), outPath));
}

async function renderPng(svg, w, h, outPath) {
  await sharp(Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${svg}</svg>`))
    .png()
    .toFile(outPath);
  console.log("✓", path.relative(process.cwd(), outPath));
}

async function generateHome() {
  const w = 2400,
    h = 1350;
  const svg = `
    ${baseSvg(w, h, NAVY, "#0D5C52", diagonalStripes, 120)}
    ${wordmark(w / 2, h / 2 - 10, 96, "middle")}
    <text x="${w / 2}" y="${h / 2 + 60}" text-anchor="middle" font-family="${FONT}" font-size="34"
      fill="${WHITE}" fill-opacity="0.85" letter-spacing="1">Fabricação própria de uniformes desde 1995 — Ananindeua/PA</text>
    ${WATERMARK}
  `;
  await renderJpg(svg, w, h, path.join(OUT_DIR, "hero-home.jpg"));
}

async function generateSegmentHero(seg) {
  const w = 2400,
    h = 1350;
  const svg = `
    ${baseSvg(w, h, seg.from, seg.to, seg.pattern)}
    ${wordmark(80, 100, 34)}
    <text x="80" y="${h / 2}" font-family="${FONT}" font-weight="700" font-size="72" fill="${WHITE}"
      letter-spacing="1">${seg.title.toUpperCase()}</text>
    ${WATERMARK}
  `;
  await renderJpg(svg, w, h, path.join(OUT_DIR, `hero-${seg.slug}.jpg`));
}

async function generateCategoryImage(seg) {
  const w = 1024,
    h = 1365;
  const svg = `
    ${baseSvg(w, h, seg.from, seg.to, seg.pattern, 200)}
    ${wordmark(60, 80, 26)}
    <text x="60" y="${h - 140}" font-family="${FONT}" font-weight="700" font-size="46" fill="${WHITE}">
      <tspan x="60" dy="0">${seg.title.split(" ")[0].toUpperCase()}</tspan>
      <tspan x="60" dy="56">${seg.title.split(" ").slice(1).join(" ").toUpperCase()}</tspan>
    </text>
    <text x="60" y="97%" font-family="${FONT}" font-size="16" fill="${WHITE}" fill-opacity="0.55">IMAGEM ILUSTRATIVA</text>
  `;
  await renderJpg(svg, w, h, path.join(OUT_DIR, `category-${seg.slug}.jpg`));
}

async function generateGallery(seg) {
  const w = 800,
    h = 1000;
  for (let i = 0; i < seg.pieces.length; i++) {
    const angle = 90 + i * 35;
    const svg = `
      ${baseSvg(w, h, seg.from, seg.to, seg.pattern, angle)}
      ${wordmark(40, 56, 18)}
      <text x="40" y="${h - 50}" font-family="${FONT}" font-weight="700" font-size="34" fill="${WHITE}">${seg.pieces[i]}</text>
      <text x="40" y="97%" font-family="${FONT}" font-size="14" fill="${WHITE}" fill-opacity="0.55">IMAGEM ILUSTRATIVA</text>
    `;
    await renderJpg(svg, w, h, path.join(OUT_DIR, `gallery-${seg.slug}-${i + 1}.jpg`));
  }
}

const CLIENT_NAMES = [
  "Indústria Regional",
  "Rede Hospitalar",
  "Grupo Escolar",
  "Rede de Hotéis",
  "Empresa Parceira",
  "Cliente Corporativo",
];

async function generateLogos() {
  const w = 300,
    h = 150;
  for (let i = 0; i < CLIENT_NAMES.length; i++) {
    const name = CLIENT_NAMES[i];
    const svg = `
      <rect x="4" y="4" width="${w - 8}" height="${h - 8}" rx="12" fill="none" stroke="${NAVY}" stroke-opacity="0.25" stroke-width="3" />
      <text x="${w / 2}" y="${h / 2 + 8}" text-anchor="middle" font-family="${FONT}" font-weight="700" font-size="22"
        fill="${NAVY}" fill-opacity="0.75">${name}</text>
    `;
    await renderPng(svg, w, h, path.join(OUT_DIR, `logo-${i + 1}.png`));
  }
}

async function generateAvatars() {
  const w = 150,
    h = 150;
  const colors = [NAVY, TEAL, NAVY_SECONDARY, "#0F7A6D", "#20345A", "#0D5C52"];
  for (let i = 0; i < 6; i++) {
    const initials = ["CC", "LH", "GE", "RH", "EP", "CC"][i];
    const svg = `
      <circle cx="${w / 2}" cy="${h / 2}" r="${w / 2}" fill="${colors[i]}" />
      <text x="${w / 2}" y="${h / 2 + 14}" text-anchor="middle" font-family="${FONT}" font-weight="700" font-size="48" fill="${WHITE}">${initials}</text>
    `;
    await renderPng(svg, w, h, path.join(OUT_DIR, `avatar-${i + 1}.png`));
  }
}

async function generateOgImage() {
  const w = 1200,
    h = 630;
  const svg = `
    ${baseSvg(w, h, NAVY, "#0D5C52", diagonalStripes, 135)}
    ${wordmark(w / 2, h / 2 - 10, 58, "middle")}
    <text x="${w / 2}" y="${h / 2 + 46}" text-anchor="middle" font-family="${FONT}" font-size="24"
      fill="${WHITE}" fill-opacity="0.85">Uniformes profissionais sob medida desde 1995</text>
  `;
  await renderJpg(svg, w, h, path.join(OUT_DIR, "og-image.jpg"));
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  await generateHome();
  await generateOgImage();
  await generateLogos();
  await generateAvatars();
  for (const seg of SEGMENTS) {
    await generateSegmentHero(seg);
    await generateCategoryImage(seg);
    await generateGallery(seg);
  }
  console.log("\nDone — placeholder images written to", OUT_DIR);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
