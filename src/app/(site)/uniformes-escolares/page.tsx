import { buildSegmentMetadata, SegmentPage } from "@/lib/segment-page";

export const generateMetadata = () =>
  buildSegmentMetadata("uniformes-escolares");

export default function Page() {
  return <SegmentPage slug="uniformes-escolares" />;
}
