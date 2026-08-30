import Link from "next/link";
import type { ContentItem } from "@/types";

export function DestinationCard({ destination }: { destination: ContentItem }) {
  return <Link href={`/destinations/${destination.slug}`} className="image-tile"><img src={destination.image} alt="" /><span>{destination.title}</span></Link>;
}
