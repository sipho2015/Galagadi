import Link from "next/link";
import Image from "next/image";
import type { ContentItem } from "@/types";

export function DestinationCard({ destination }: { destination: ContentItem }) {
  return <Link href={`/destinations/${destination.slug}`} className="image-tile"><Image src={destination.image} alt={`${destination.title} destination`} fill sizes="(max-width: 580px) calc(100vw - 28px), (max-width: 880px) calc(50vw - 30px), 360px" /><span>{destination.title}</span></Link>;
}
