import { buildSegmentMetadata, SegmentPage } from "@/lib/segment-page";

export const generateMetadata = () => buildSegmentMetadata("texteis-hotelaria");

export default function Page() {
  return <SegmentPage slug="texteis-hotelaria" />;
}
