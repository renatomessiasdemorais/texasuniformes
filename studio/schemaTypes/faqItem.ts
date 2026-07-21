import { defineField, defineType } from "sanity";

export const faqItem = defineType({
  name: "faqItem",
  title: "Item de FAQ",
  type: "document",
  fields: [
    defineField({
      name: "question",
      title: "Pergunta",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "answer",
      title: "Resposta",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Categoria",
      type: "string",
      options: {
        list: [
          { title: "Geral", value: "geral" },
          { title: "Uniformes Profissionais", value: "uniformes-profissionais" },
          { title: "Linha Hospitalar", value: "linha-hospitalar" },
          { title: "Uniformes Escolares", value: "uniformes-escolares" },
          { title: "Têxteis para Hotelaria", value: "texteis-hotelaria" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: "question", subtitle: "category" },
  },
});
