import { defineField, defineType } from "sanity";
import { imageField } from "./lib/imageField";

export const testimonial = defineType({
  name: "testimonial",
  title: "Depoimento",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nome",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "company",
      title: "Empresa",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "quote",
      title: "Depoimento",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    imageField("avatar", "Foto (150x150 — 1:1, opcional)"),
  ],
  preview: {
    select: { title: "name", subtitle: "company", media: "avatar" },
  },
});
