import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Conteúdo")
    .items([
      S.documentTypeListItem("segment").title("Linhas de Produto"),
      S.documentTypeListItem("testimonial").title("Depoimentos"),
      S.documentTypeListItem("clientLogo").title("Logos de Clientes"),
      S.documentTypeListItem("faqItem").title("FAQ"),
      S.divider(),
      S.listItem()
        .title("Configurações do Site")
        .id("siteSettings")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings")
        ),
    ]);
