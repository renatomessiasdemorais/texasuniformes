import { defineField, defineType } from "sanity";
import { imageField } from "./lib/imageField";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Configurações do Site",
  type: "document",
  fields: [
    defineField({ name: "phone", title: "Telefone", type: "string" }),
    defineField({
      name: "whatsapp",
      title: "WhatsApp (só números, com DDI 55)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "whatsappMessage",
      title: "Mensagem padrão do WhatsApp",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "email",
      title: "E-mail comercial",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "address",
      title: "Endereço",
      type: "object",
      fields: [
        defineField({ name: "line1", title: "Linha 1 (cidade/estado)", type: "string" }),
        defineField({ name: "line2", title: "Linha 2 (rua/número)", type: "string" }),
        defineField({ name: "mapUrl", title: "URL do Google Maps", type: "url" }),
      ],
    }),
    defineField({
      name: "social",
      title: "Redes sociais",
      type: "object",
      fields: [
        defineField({ name: "instagram", title: "Instagram", type: "url" }),
        defineField({ name: "facebook", title: "Facebook", type: "url" }),
        defineField({ name: "linkedin", title: "LinkedIn", type: "url" }),
      ],
    }),
    defineField({
      name: "home",
      title: "Home",
      type: "object",
      fields: [
        defineField({ name: "heroHeadline", title: "Título do Hero", type: "string" }),
        defineField({ name: "heroSubheadline", title: "Subtítulo do Hero", type: "text", rows: 2 }),
        imageField("heroImage", "Imagem do Hero (2400x1350 — 16:9)"),
      ],
    }),
  ],
  preview: {
    select: { title: "email" },
    prepare: ({ title }) => ({ title: "Configurações do Site", subtitle: title }),
  },
});
