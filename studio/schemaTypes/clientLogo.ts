import { defineField, defineType } from "sanity";
import { imageField } from "./lib/imageField";

export const clientLogo = defineType({
  name: "clientLogo",
  title: "Logo de Cliente",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nome da empresa",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    imageField("logo", "Logo (300x150 — PNG transparente)", {
      required: true,
    }),
  ],
  preview: {
    select: { title: "name", media: "logo" },
  },
});
