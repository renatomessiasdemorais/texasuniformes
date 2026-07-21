import { defineArrayMember, defineField, defineType } from "sanity";
import { imageField } from "./lib/imageField";

const SEGMENT_SLUGS = [
  { title: "Uniformes Profissionais", value: "uniformes-profissionais" },
  { title: "Linha Hospitalar", value: "linha-hospitalar" },
  { title: "Uniformes Escolares", value: "uniformes-escolares" },
  { title: "Têxteis para Hotelaria", value: "texteis-hotelaria" },
];

export const segment = defineType({
  name: "segment",
  title: "Linha de Produto (Segmento)",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: {
        source: "title",
      },
      validation: (Rule) => Rule.required(),
      description:
        "Deve ser exatamente um dos valores de rota: uniformes-profissionais, linha-hospitalar, uniformes-escolares, texteis-hotelaria",
    }),
    defineField({
      name: "shortName",
      title: "Nome curto (menus/badges)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Ordem de exibição",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "heroHeadline",
      title: "Título do Hero",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroSubheadline",
      title: "Subtítulo do Hero",
      type: "text",
      rows: 2,
    }),
    imageField("heroImage", "Imagem do Hero (2400x1350 — 16:9)", {
      required: true,
    }),
    imageField(
      "categoryImage",
      "Imagem de categoria (1024x1365 — vertical 3:4)"
    ),
    defineField({
      name: "intro",
      title: "Texto de introdução",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "benefits",
      title: "Benefícios do segmento",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "benefit",
          fields: [
            defineField({ name: "icon", title: "Ícone (nome lucide)", type: "string" }),
            defineField({ name: "title", title: "Título", type: "string" }),
            defineField({ name: "description", title: "Descrição", type: "text", rows: 2 }),
          ],
        }),
      ],
    }),
    defineField({
      name: "gallery",
      title: "Galeria de peças (800x1000 — 4:5)",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          name: "image",
          title: "Foto",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              title: "Texto alternativo (SEO/acessibilidade)",
              type: "string",
            },
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "shortName", media: "heroImage" },
  },
});

export const SEGMENT_SLUG_OPTIONS = SEGMENT_SLUGS;
