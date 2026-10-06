import Image from "next/image";
import Link from "next/link";
import type { Accommodation } from "@/types";

export function AccommodationCard({ accommodation }: { accommodation: Accommodation }) {
  return <article className="feature-card accommodation-card"><div className="feature-card-image"><Image src={accommodation.image} alt={"Accommodation setting for " + accommodation.name} fill sizes="(max-width: 580px) calc(100vw - 28px), (max-width: 880px) calc(50vw - 30px), 360px" /></div><div><p className="tag">Sample listing · {accommodation.type}</p><h3>{accommodation.name}</h3><p>{accommodation.description}</p><div className="card-meta-row"><span>{accommodation.location}</span><strong>Replace with rates</strong></div><Link className="text-link" href={"/accommodation/" + accommodation.slug}>View sample layout <span aria-hidden="true">→</span></Link></div></article>;
}
