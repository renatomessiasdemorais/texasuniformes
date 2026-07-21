import type {
  ClientLogo,
  Segment,
  SegmentSlug,
  SiteSettings,
  Testimonial,
} from "@/types/content";

const img = (src: string, alt: string, width: number, height: number) => ({
  src,
  alt,
  width,
  height,
});

export const fallbackSiteSettings: SiteSettings = {
  phone: "(91) 0000-0000",
  whatsapp: "5591000000000",
  whatsappMessage:
    "Olá! Gostaria de solicitar um orçamento de uniformes.",
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
    heroImage: img(
      "/placeholders/hero-home-v2.jpg",
      "Uniformes profissionais Texas Uniformes",
      2400,
      1350
    ),
  },
};

export const fallbackBenefits = [
  {
    icon: "factory",
    title: "Fabricação própria",
    description:
      "Produção interna do começo ao fim, sem intermediários, com controle total de qualidade e prazo.",
  },
  {
    icon: "clock",
    title: "Desde 1995",
    description:
      "Mais de duas décadas fabricando uniformes profissionais em Ananindeua/PA.",
  },
  {
    icon: "shirt",
    title: "Bordado e estamparia",
    description:
      "Personalização completa da identidade da sua marca em cada peça.",
  },
  {
    icon: "truck",
    title: "Entrega para todo o Brasil",
    description:
      "Logística estruturada para atender empresas de qualquer região.",
  },
];

export const fallbackProcessSteps = [
  {
    title: "Orçamento",
    description:
      "Você envia a necessidade pelo formulário ou WhatsApp e recebe uma proposta detalhada.",
  },
  {
    title: "Aprovação",
    description:
      "Alinhamos modelo, tecido, cores e personalização (bordado/estamparia) antes da produção.",
  },
  {
    title: "Produção",
    description:
      "Fabricação própria com acompanhamento de qualidade em cada etapa.",
  },
  {
    title: "Entrega",
    description:
      "Envio para todo o Brasil com prazo combinado previamente com sua empresa.",
  },
];

const segmentDefs: Array<{
  slug: SegmentSlug;
  title: string;
  shortName: string;
  heroHeadline: string;
  heroSubheadline: string;
  intro: string;
  benefits: Segment["benefits"];
  faq: Array<{ question: string; answer: string }>;
  galleryCount: number;
}> = [
  {
    slug: "uniformes-profissionais",
    title: "Uniformes Profissionais",
    shortName: "Corporativo",
    heroHeadline: "Uniformes corporativos que reforçam a imagem da sua empresa",
    heroSubheadline:
      "Camisas sociais, calças, coletes e jaquetas personalizados com a identidade visual da sua marca.",
    intro:
      "Desenvolvemos uniformes administrativos e operacionais para empresas de médio e grande porte, com foco em conforto, durabilidade e padronização visual da equipe.",
    benefits: [
      {
        icon: "briefcase",
        title: "Padronização de equipe",
        description: "Identidade visual consistente em todos os setores da empresa.",
      },
      {
        icon: "shirt",
        title: "Tecidos sob medida",
        description: "Opções de tecido de acordo com o ambiente de trabalho.",
      },
      {
        icon: "badge-check",
        title: "Bordado corporativo",
        description: "Logotipo bordado ou estampado com acabamento profissional.",
      },
    ],
    faq: [
      {
        question: "Qual a quantidade mínima de peças por pedido?",
        answer:
          "Trabalhamos sob encomenda para empresas — a quantidade mínima varia conforme o modelo. Fale com nosso time pelo WhatsApp para uma resposta específica ao seu caso.",
      },
      {
        question: "Qual o prazo de produção?",
        answer:
          "O prazo depende da quantidade e complexidade da personalização. Após aprovação do orçamento, informamos uma data estimada de entrega.",
      },
      {
        question: "Como tirar as medidas dos funcionários à distância?",
        answer:
          "Enviamos uma tabela de medidas padrão e orientações simples para sua equipe de RH coletar os dados sem precisar de visita presencial.",
      },
    ],
    galleryCount: 4,
  },
  {
    slug: "linha-hospitalar",
    title: "Linha Hospitalar",
    shortName: "Hospitalar",
    heroHeadline: "Uniformes hospitalares que unem conforto, higiene e segurança",
    heroSubheadline:
      "Jalecos, scrubs e uniformes técnicos para hospitais e clínicas, com tecidos apropriados para uso profissional de saúde.",
    intro:
      "Fabricamos a linha hospitalar com tecidos de fácil higienização, conforto para longas jornadas e personalização por setor (enfermagem, corpo clínico, apoio).",
    benefits: [
      {
        icon: "cross",
        title: "Tecidos apropriados",
        description: "Materiais pensados para rotina hospitalar e higienização frequente.",
      },
      {
        icon: "users",
        title: "Diferenciação por setor",
        description: "Cores e cortes distintos para identificar equipes rapidamente.",
      },
      {
        icon: "shield-check",
        title: "Conforto para plantões longos",
        description: "Modelagem pensada para uso durante toda a jornada de trabalho.",
      },
    ],
    faq: [
      {
        question: "Os tecidos são adequados para higienização hospitalar frequente?",
        answer:
          "Sim, trabalhamos com tecidos resistentes a lavagens frequentes, mantendo conforto e durabilidade da peça.",
      },
      {
        question: "É possível personalizar por setor do hospital?",
        answer:
          "Sim, definimos cores e bordados diferentes por setor (enfermagem, corpo clínico, apoio) para facilitar identificação visual.",
      },
      {
        question: "Qual o prazo mínimo para um pedido hospitalar?",
        answer:
          "Varia conforme a quantidade solicitada. Envie sua necessidade pelo formulário para recebermos e responder com prazo estimado.",
      },
    ],
    galleryCount: 4,
  },
  {
    slug: "uniformes-escolares",
    title: "Uniformes Escolares",
    shortName: "Escolar",
    heroHeadline: "Uniformes escolares resistentes para o dia a dia dos alunos",
    heroSubheadline:
      "Confecção completa de uniformes escolares com tecidos duráveis para escolas particulares de todos os portes.",
    intro:
      "Produzimos uniformes escolares completos — camisetas, shorts, calças e agasalhos — com foco em durabilidade para o uso diário dos alunos e identidade visual da instituição.",
    benefits: [
      {
        icon: "shirt",
        title: "Alta durabilidade",
        description: "Tecidos resistentes ao uso diário e à lavagem frequente.",
      },
      {
        icon: "palette",
        title: "Identidade da escola",
        description: "Cores, brasão e bordado personalizados conforme a instituição.",
      },
      {
        icon: "ruler",
        title: "Tabela de tamanhos completa",
        description: "Do infantil ao adulto, para atender toda a comunidade escolar.",
      },
    ],
    faq: [
      {
        question: "Vocês atendem escolas de qualquer tamanho?",
        answer:
          "Sim, atendemos desde escolas menores até instituições com várias unidades e grande volume de alunos.",
      },
      {
        question: "Como funciona a reposição de uniformes durante o ano letivo?",
        answer:
          "Após o pedido inicial, a escola pode solicitar reposições pontuais conforme a necessidade dos alunos.",
      },
      {
        question: "É possível incluir o brasão da escola bordado?",
        answer:
          "Sim, o brasão ou logotipo da instituição pode ser bordado ou estampado nas peças do uniforme.",
      },
    ],
    galleryCount: 4,
  },
  {
    slug: "texteis-hotelaria",
    title: "Têxteis para Hotelaria",
    shortName: "Hotelaria",
    heroHeadline: "Têxteis e uniformes para hotéis e pousadas",
    heroSubheadline:
      "Enxoval, toalhas e uniformes de equipe para hotéis e pousadas que buscam padrão e conforto para hóspedes e colaboradores.",
    intro:
      "Fornecemos enxoval completo (lençóis, toalhas, colchas) e uniformes de equipe para hotéis e pousadas, com foco em conforto para o hóspede e padronização visual da equipe.",
    benefits: [
      {
        icon: "bed",
        title: "Enxoval completo",
        description: "Lençóis, toalhas e colchas com padrão hoteleiro de qualidade.",
      },
      {
        icon: "shirt",
        title: "Uniformes de equipe",
        description: "Recepção, camareiras e restaurante com visual padronizado.",
      },
      {
        icon: "sparkles",
        title: "Conforto para o hóspede",
        description: "Tecidos selecionados para experiência de hospedagem superior.",
      },
    ],
    faq: [
      {
        question: "Vocês fornecem enxoval e uniformes juntos?",
        answer:
          "Sim, atendemos tanto o enxoval (lençóis, toalhas, colchas) quanto os uniformes da equipe do hotel ou pousada.",
      },
      {
        question: "Há quantidade mínima para pousadas menores?",
        answer:
          "Trabalhamos sob encomenda e ajustamos a proposta conforme o porte do estabelecimento. Fale com a gente para um orçamento específico.",
      },
      {
        question: "Os tecidos aguentam lavagens industriais frequentes?",
        answer:
          "Sim, selecionamos tecidos resistentes ao ciclo intenso de lavagem industrial típico da hotelaria.",
      },
    ],
    galleryCount: 4,
  },
];

export const fallbackSegments: Segment[] = segmentDefs.map((def) => ({
  _id: `fallback-${def.slug}`,
  slug: def.slug,
  title: def.title,
  shortName: def.shortName,
  heroHeadline: def.heroHeadline,
  heroSubheadline: def.heroSubheadline,
  heroImage: img(
    `/placeholders/hero-${def.slug}.jpg`,
    `${def.title} — Texas Uniformes`,
    2400,
    1350
  ),
  categoryImage: img(
    `/placeholders/category-${def.slug}.jpg`,
    `${def.title} — Texas Uniformes`,
    1024,
    1365
  ),
  intro: def.intro,
  benefits: def.benefits,
  gallery: Array.from({ length: def.galleryCount }, (_, i) =>
    img(
      `/placeholders/gallery-${def.slug}-${i + 1}.jpg`,
      `Peça de ${def.title.toLowerCase()} — Texas Uniformes`,
      800,
      1000
    )
  ),
  faq: def.faq.map((f, i) => ({
    _id: `fallback-faq-${def.slug}-${i}`,
    question: f.question,
    answer: f.answer,
    category: def.slug,
  })),
}));

export const fallbackGeneralFaq = [
  {
    _id: "fallback-faq-geral-0",
    question: "A Texas Uniformes vende para pessoa física?",
    answer:
      "Nosso foco é o atendimento sob encomenda para empresas, hospitais, escolas e hotelaria. Entre em contato para verificarmos a viabilidade do seu caso.",
    category: "geral" as const,
  },
  {
    _id: "fallback-faq-geral-1",
    question: "Como funciona o processo de orçamento?",
    answer:
      "Você envia sua necessidade pelo formulário do site ou pelo WhatsApp, e nossa equipe retorna com uma proposta detalhada considerando quantidade, modelo e personalização.",
    category: "geral" as const,
  },
  {
    _id: "fallback-faq-geral-2",
    question: "Há quanto tempo a Texas Uniformes está no mercado?",
    answer:
      "Atuamos desde 1995 em Ananindeua/PA, com fabricação própria de uniformes profissionais.",
    category: "geral" as const,
  },
];

const testimonialDefs = [
  { segment: "Corporativo" },
  { segment: "Hospitalar" },
  { segment: "Escolar" },
  { segment: "Hotelaria" },
];

export const fallbackTestimonials: Testimonial[] = testimonialDefs.map(
  (t, i) => ({
    _id: `fallback-testimonial-${i}`,
    name: `Cliente ${t.segment}`,
    company: `Depoimento ilustrativo — segmento ${t.segment.toLowerCase()}`,
    quote:
      "Depoimento de exemplo. Será substituído por um relato real de cliente assim que o material for reunido.",
    avatar: img(
      `/placeholders/avatar-${i + 1}.png`,
      `Depoimento ${t.segment}`,
      150,
      150
    ),
  })
);

export const fallbackClientLogos: ClientLogo[] = [
  "Indústria Regional",
  "Rede Hospitalar",
  "Grupo Escolar",
  "Rede de Hotéis",
  "Empresa Parceira",
  "Cliente Corporativo",
].map((name, i) => ({
  _id: `fallback-logo-${i}`,
  name,
  logo: img(`/placeholders/logo-${i + 1}.png`, name, 300, 150),
}));
