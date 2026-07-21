const imageProjection = `{
  "src": asset->url,
  "alt": coalesce(alt, ""),
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height,
  "blurDataURL": asset->metadata.lqip
}`;

export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  phone,
  whatsapp,
  whatsappMessage,
  email,
  address,
  social,
  home{
    heroHeadline,
    heroSubheadline,
    "heroImage": heroImage${imageProjection}
  }
}`;

export const allSegmentsQuery = `*[_type == "segment"] | order(order asc){
  _id,
  "slug": slug.current,
  title,
  shortName,
  heroHeadline,
  heroSubheadline,
  "heroImage": heroImage${imageProjection},
  "categoryImage": categoryImage${imageProjection},
  intro,
  benefits,
  "gallery": gallery[]${imageProjection},
  "faq": *[_type == "faqItem" && category == ^.slug.current]{
    _id, question, answer, category
  }
}`;

export const segmentBySlugQuery = `*[_type == "segment" && slug.current == $slug][0]{
  _id,
  "slug": slug.current,
  title,
  shortName,
  heroHeadline,
  heroSubheadline,
  "heroImage": heroImage${imageProjection},
  "categoryImage": categoryImage${imageProjection},
  intro,
  benefits,
  "gallery": gallery[]${imageProjection},
  "faq": *[_type == "faqItem" && category == $slug]{
    _id, question, answer, category
  }
}`;

export const testimonialsQuery = `*[_type == "testimonial"] | order(_createdAt asc){
  _id,
  name,
  company,
  quote,
  "avatar": avatar${imageProjection}
}`;

export const clientLogosQuery = `*[_type == "clientLogo"] | order(_createdAt asc){
  _id,
  name,
  "logo": logo${imageProjection}
}`;

export const generalFaqQuery = `*[_type == "faqItem" && category == "geral"] | order(_createdAt asc){
  _id, question, answer, category
}`;
