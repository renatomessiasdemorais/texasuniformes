import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./studio/schemaTypes";
import { structure } from "./studio/structure";

// Keep the production Studio connected even if a deploy misses its public env var.
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "7kwze5p4";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export default defineConfig({
  name: "texas-uniformes",
  title: "Texas Uniformes",
  basePath: "/studio",
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [structureTool({ structure }), visionTool()],
  document: {
    actions: (input, context) =>
      context.schemaType === "siteSettings"
        ? input.filter(
            ({ action }) => action !== "duplicate" && action !== "delete"
          )
        : input,
    newDocumentOptions: (prev, { creationContext }) =>
      creationContext.type === "global"
        ? prev.filter((template) => template.templateId !== "siteSettings")
        : prev,
  },
});
