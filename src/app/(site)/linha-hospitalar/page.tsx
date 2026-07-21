import { buildSegmentMetadata, SegmentPage } from "@/lib/segment-page";

export const generateMetadata = () => buildSegmentMetadata("linha-hospitalar");

export default function Page() {
  return <SegmentPage slug="linha-hospitalar" />;
}
