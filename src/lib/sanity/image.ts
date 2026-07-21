import createImageUrlBuilder from "@sanity/image-url";
import type { Image } from "sanity";
import { dataset, projectId } from "./client";

const builder =
  projectId != null
    ? createImageUrlBuilder({ projectId, dataset })
    : null;

export function urlForImage(source: Image) {
  if (!builder) {
    throw new Error("Sanity is not configured — cannot build image URL");
  }
  return builder.image(source);
}
