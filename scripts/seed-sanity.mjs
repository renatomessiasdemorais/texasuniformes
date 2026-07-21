/**
 * Popula um projeto Sanity vazio com o mesmo conteúdo placeholder usado
 * como fallback local (src/lib/content/fallback-data.ts), incluindo as
 * imagens geradas em public/placeholders.
 *
 * Uso:
 *   1. Crie o projeto Sanity (npx sanity login && npx sanity init) e defina
 *      NEXT_PUBLIC_SANITY_PROJECT_ID / NEXT_PUBLIC_SANITY_DATASET no .env.local
 *   2. Gere um token de escrita em manage.sanity.io (API > Tokens > Editor)
 *      e exporte como SANITY_API_WRITE_TOKEN
 *   3. node scripts/seed-sanity.mjs
 */
import { createClient } from "@sanity/client";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PLACEHOLDERS_DIR = path.join(__dirname, "..", "public", "placeholders");

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    "Defina NEXT_PUBLIC_SANITY_PROJECT_ID e SANITY_API_WRITE_TOKEN antes de rodar este script."
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-01-01",
  token,
  useCdn: false,
});

const assetCache = new Map();

async function uploadImage(filename, alt) {
  if (assetCache.has(filename)) return assetCache.get(filename);
  const filePath = path.join(PLACEHOLDERS_DIR, filename);
  const buffer = readFileSync(filePath);
  const asset = await client.assets.upload("image", buffer, { filename });
  const value = {
    _type: "image",
    asset: { _type: "reference", _ref: asset._id },
    alt,
  };
  assetCache.set(filename, value);
  console.log("  ✓ upload", filename);
  return value;
}

const SEGMENTS = [
  {
    slug: "uniformes-profissionais",
    title: "Uniformes Profissionais",
    shortName: "Corporativo",
    order: 1,
    heroHeadline: "Uniformes corporativos que reforçam a imagem da sua empresa",
    heroSubheadline:
      "Camisas sociais, calças, coletes e jaquetas personalizados com a identidade visual da sua marca.",
    intro:
      "Desenvolvemos uniformes administrativos e operacionais para empresas de médio e grande porte, com foco em conforto, durabilidade e padronização visual da equipe.",
    benefits: [
      { icon: "briefcase", title: "Padronização de equipe", description: "Identidade visual consistente em todos os setores da empresa." },
      { icon: "shirt", title: "Tecidos sob medida", description: "Opções de tecido de acordo com o ambiente de trabalho." },
      { icon: "badge-check", title: "Bordado corporativo", description: "Logotipo bordado ou estampado com acabamento profissional." },
    ],
    pieces: ["Camisa Social", "Calça Social", "Colete Corporativo", "Jaqueta"],
    faq: [
      { question: "Qual a quantidade mínima de peças por pedido?", answer: "Trabalhamos sob encomenda para empresas — a quantidade mínima varia conforme o modelo. Fale com nosso time pelo WhatsApp para uma resposta específica ao seu caso." },
      { question: "Qual o prazo de produção?", answer: "O prazo depende da quantidade e complexidade da personalização. Após aprovação do orçamento, informamos uma data estimada de entrega." },
      { question: "Como tirar as medidas dos funcionários à distância?", answer: "Enviamos uma tabela de medidas padrão e orientações simples para sua equipe de RH coletar os dados sem precisar de visita presencial." },
    ],
  },
  {
    slug: "linha-hospitalar",
    title: "Linha Hospitalar",
    shortName: "Hospitalar",
    order: 2,
    heroHeadline: "Uniformes hospitalares que unem conforto, higiene e segurança",
    heroSubheadline:
      "Jalecos, scrubs e uniformes técnicos para hospitais e clínicas, com tecidos apropriados para uso profissional de saúde.",
    intro:
      "Fabricamos a linha hospitalar com tecidos de fácil higienização, conforto para longas jornadas e personalização por setor (enfermagem, corpo clínico, apoio).",
    benefits: [
      { icon: "cross", title: "Tecidos apropriados", description: "Materiais pensados para rotina hospitalar e higienização frequente." },
      { icon: "users", title: "Diferenciação por setor", description: "Cores e cortes distintos para identificar equipes rapidamente." },
      { icon: "shield-check", title: "Conforto para plantões longos", description: "Modelagem pensada para uso durante toda a jornada de trabalho." },
    ],
    pieces: ["Jaleco", "Scrub Conjunto", "Touca Cirúrgica", "Sapato Impermeável"],
    faq: [
      { question: "Os tecidos são adequados para higienização hospitalar frequente?", answer: "Sim, trabalhamos com tecidos resistentes a lavagens frequentes, mantendo conforto e durabilidade da peça." },
      { question: "É possível personalizar por setor do hospital?", answer: "Sim, definimos cores e bordados diferentes por setor (enfermagem, corpo clínico, apoio) para facilitar identificação visual." },
      { question: "Qual o prazo mínimo para um pedido hospitalar?", answer: "Varia conforme a quantidade solicitada. Envie sua necessidade pelo formulário para recebermos e responder com prazo estimado." },
    ],
  },
  {
    slug: "uniformes-escolares",
    title: "Uniformes Escolares",
    shortName: "Escolar",
    order: 3,
    heroHeadline: "Uniformes escolares resistentes para o dia a dia dos alunos",
    heroSubheadline:
      "Confecção completa de uniformes escolares com tecidos duráveis para escolas particulares de todos os portes.",
    intro:
      "Produzimos uniformes escolares completos — camisetas, shorts, calças e agasalhos — com foco em durabilidade para o uso diário dos alunos e identidade visual da instituição.",
    benefits: [
      { icon: "shirt", title: "Alta durabilidade", description: "Tecidos resistentes ao uso diário e à lavagem frequente." },
      { icon: "palette", title: "Identidade da escola", description: "Cores, brasão e bordado personalizados conforme a instituição." },
      { icon: "ruler", title: "Tabela de tamanhos completa", description: "Do infantil ao adulto, para atender toda a comunidade escolar." },
    ],
    pieces: ["Camiseta Escolar", "Bermuda", "Agasalho", "Conjunto Ed. Física"],
    faq: [
      { question: "Vocês atendem escolas de qualquer tamanho?", answer: "Sim, atendemos desde escolas menores até instituições com várias unidades e grande volume de alunos." },
      { question: "Como funciona a reposição de uniformes durante o ano letivo?", answer: "Após o pedido inicial, a escola pode solicitar reposições pontuais conforme a necessidade dos alunos." },
      { question: "É possível incluir o brasão da escola bordado?", answer: "Sim, o brasão ou logotipo da instituição pode ser bordado ou estampado nas peças do uniforme." },
    ],
  },
  {
    slug: "texteis-hotelaria",
    title: "Têxteis para Hotelaria",
    shortName: "Hotelaria",
    order: 4,
    heroHeadline: "Têxteis e uniformes para hotéis e pousadas",
    heroSubheadline:
      "Enxoval, toalhas e uniformes de equipe para hotéis e pousadas que buscam padrão e conforto para hóspedes e colaboradores.",
    intro:
      "Fornecemos enxoval completo (lençóis, toalhas, colchas) e uniformes de equipe para hotéis e pousadas, com foco em conforto para o hóspede e padronização visual da equipe.",
    benefits: [
      { icon: "bed", title: "Enxoval completo", description: "Lençóis, toalhas e colchas com padrão hoteleiro de qualidade." },
      { icon: "shirt", title: "Uniformes de equipe", description: "Recepção, camareiras e restaurante com visual padronizado." },
      { icon: "sparkles", title: "Conforto para o hóspede", description: "Tecidos selecionados para experiência de hospedagem superior." },
    ],
    pieces: ["Jogo de Lençol", "Toalha de Banho", "Roupão", "Uniforme Recepção"],
    faq: [
      { question: "Vocês fornecem enxoval e uniformes juntos?", answer: "Sim, atendemos tanto o enxoval (lençóis, toalhas, colchas) quanto os uniformes da equipe do hotel ou pousada." },
      { question: "Há quantidade mínima para pousadas menores?", answer: "Trabalhamos sob encomenda e ajustamos a proposta conforme o porte do estabelecimento. Fale com a gente para um orçamento específico." },
      { question: "Os tecidos aguentam lavagens industriais frequentes?", answer: "Sim, selecionamos tecidos resistentes ao ciclo intenso de lavagem industrial típico da hotelaria." },
    ],
  },
];

const GENERAL_FAQ = [
  { question: "A Texas Uniformes vende para pessoa física?", answer: "Nosso foco é o atendimento sob encomenda para empresas, hospitais, escolas e hotelaria. Entre em contato para verificarmos a viabilidade do seu caso." },
  { question: "Como funciona o processo de orçamento?", answer: "Você envia sua necessidade pelo formulário do site ou pelo WhatsApp, e nossa equipe retorna com uma proposta detalhada considerando quantidade, modelo e personalização." },
  { question: "Há quanto tempo a Texas Uniformes está no mercado?", answer: "Atuamos desde 1995 em Ananindeua/PA, com fabricação própria de uniformes profissionais." },
];

const CLIENT_LOGOS = [
  "Indústria Regional",
  "Rede Hospitalar",
  "Grupo Escolar",
  "Rede de Hotéis",
  "Empresa Parceira",
  "Cliente Corporativo",
];

const TESTIMONIALS = [
  { segment: "Corporativo", avatar: "avatar-1.png" },
  { segment: "Hospitalar", avatar: "avatar-2.png" },
  { segment: "Escolar", avatar: "avatar-3.png" },
  { segment: "Hotelaria", avatar: "avatar-4.png" },
];

async function seedSiteSettings() {
  const heroImage = await uploadImage("hero-home-v2.jpg", "Uniformes profissionais Texas Uniformes");
  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    phone: "(91) 0000-0000",
    whatsapp: "5591000000000",
    whatsappMessage: "Olá! Gostaria de solicitar um orçamento de uniformes.",
    email: "contato@texasuniformes.com.br",
    address: {
      line1: "Ananindeua, PA – Brasil",
      line2: "Endereço completo a confirmar com o cliente",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Ananindeua+PA",
    },
    social: {
      instagram: "https://instagram.com/texasuniformes",
      facebook: "https://facebook.com/texasuniformes",
    },
    home: {
      heroHeadline: "Uniformes profissionais sob medida para o seu negócio",
      heroSubheadline:
        "Fabricação própria desde 1995 em Ananindeua/PA — bordado e estamparia personalizados para empresas, hospitais, escolas e hotelaria.",
      heroImage,
    },
  });
  console.log("✓ siteSettings");
}

async function seedSegments() {
  for (const seg of SEGMENTS) {
    const heroImage = await uploadImage(`hero-${seg.slug}.jpg`, `${seg.title} — Texas Uniformes`);
    const categoryImage = await uploadImage(`category-${seg.slug}.jpg`, `${seg.title} — Texas Uniformes`);
    const gallery = [];
    for (let i = 0; i < seg.pieces.length; i++) {
      gallery.push(
        await uploadImage(`gallery-${seg.slug}-${i + 1}.jpg`, seg.pieces[i])
      );
    }

    await client.createOrReplace({
      _id: `segment-${seg.slug}`,
      _type: "segment",
      title: seg.title,
      slug: { _type: "slug", current: seg.slug },
      shortName: seg.shortName,
      order: seg.order,
      heroHeadline: seg.heroHeadline,
      heroSubheadline: seg.heroSubheadline,
      heroImage,
      categoryImage,
      intro: seg.intro,
      benefits: seg.benefits,
      gallery,
    });
    console.log("✓ segment", seg.slug);

    for (let i = 0; i < seg.faq.length; i++) {
      await client.createOrReplace({
        _id: `faq-${seg.slug}-${i}`,
        _type: "faqItem",
        question: seg.faq[i].question,
        answer: seg.faq[i].answer,
        category: seg.slug,
      });
    }
  }
}

async function seedGeneralFaq() {
  for (let i = 0; i < GENERAL_FAQ.length; i++) {
    await client.createOrReplace({
      _id: `faq-geral-${i}`,
      _type: "faqItem",
      question: GENERAL_FAQ[i].question,
      answer: GENERAL_FAQ[i].answer,
      category: "geral",
    });
  }
  console.log("✓ faq geral");
}

async function seedClientLogos() {
  for (let i = 0; i < CLIENT_LOGOS.length; i++) {
    const name = CLIENT_LOGOS[i];
    const logo = await uploadImage(`logo-${i + 1}.png`, name);
    await client.createOrReplace({
      _id: `clientLogo-${i}`,
      _type: "clientLogo",
      name,
      logo,
    });
  }
  console.log("✓ clientLogos");
}

async function seedTestimonials() {
  for (let i = 0; i < TESTIMONIALS.length; i++) {
    const t = TESTIMONIALS[i];
    const avatar = await uploadImage(t.avatar, `Depoimento ${t.segment}`);
    await client.createOrReplace({
      _id: `testimonial-${i}`,
      _type: "testimonial",
      name: `Cliente ${t.segment}`,
      company: `Depoimento ilustrativo — segmento ${t.segment.toLowerCase()}`,
      quote:
        "Depoimento de exemplo. Será substituído por um relato real de cliente assim que o material for reunido.",
      avatar,
    });
  }
  console.log("✓ testimonials");
}

async function main() {
  console.log(`Semeando dataset "${dataset}" do projeto ${projectId}...\n`);
  await seedSiteSettings();
  await seedSegments();
  await seedGeneralFaq();
  await seedClientLogos();
  await seedTestimonials();
  console.log("\nConcluído.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
