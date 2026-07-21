import { buildSegmentMetadata, SegmentPage } from "@/lib/segment-page";

export const generateMetadata = () =>
  buildSegmentMetadata("uniformes-profissionais");

export default function Page() {
  return <SegmentPage slug="uniformes-profissionais" />;
}
