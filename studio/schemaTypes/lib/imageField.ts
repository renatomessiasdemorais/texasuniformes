import { defineField } from "sanity";

export function imageField(
  name: string,
  title: string,
  options?: { required?: boolean }
) {
  return defineField({
    name,
    title,
    type: "image",
    options: { hotspot: true },
    fields: [
      {
        name: "alt",
        title: "Texto alternativo (SEO/acessibilidade)",
        type: "string",
        validation: (Rule) =>
          options?.required ? Rule.required() : Rule,
      },
    ],
    validation: (Rule) => (options?.required ? Rule.required() : Rule),
  });
}
