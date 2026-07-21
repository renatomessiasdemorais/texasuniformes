export type SanityImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  blurDataURL?: string;
};

export type Benefit = {
  icon: string;
  title: string;
  description: string;
};

export type ProcessStep = {
  title: string;
  description: string;
};

export type FaqItem = {
  _id: string;
  question: string;
  answer: string;
  category: "geral" | SegmentSlug;
};

export type Testimonial = {
  _id: string;
  name: string;
  company: string;
  quote: string;
  avatar?: SanityImage;
};

export type ClientLogo = {
  _id: string;
  name: string;
  logo: SanityImage;
};

export type SegmentSlug =
  | "uniformes-profissionais"
  | "linha-hospitalar"
  | "uniformes-escolares"
  | "texteis-hotelaria";

export type Segment = {
  _id: string;
  slug: SegmentSlug;
  title: string;
  shortName: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroImage: SanityImage;
  categoryImage: SanityImage;
  intro: string;
  benefits: Benefit[];
  gallery: SanityImage[];
  faq: FaqItem[];
};

export type SiteSettings = {
  phone: string;
  whatsapp: string;
  whatsappMessage: string;
  email: string;
  address: {
    line1: string;
    line2: string;
    mapUrl: string;
  };
  social: {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
  };
  home: {
    heroHeadline: string;
    heroSubheadline: string;
    heroImage: SanityImage;
  };
};
