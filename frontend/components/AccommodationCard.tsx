import Image from "next/image";
import Link from "next/link";
import type { Accommodation } from "@/types";

export function AccommodationCard({ accommodation }: { accommodation: Accommodation }) {
  return <article className="feature-card accommodation-card"><div className="feature-card-image"><Image src={accommodation.image} alt="Victoria Falls destination photograph; property photography pending" fill sizes="(max-width: 580px) calc(100vw - 28px), (max-width: 880px) calc(50vw - 30px), 360px" /></div><div><p className="tag">{accommodation.type}</p><h3>{accommodation.name}</h3><p>{accommodation.description}</p><p className="form-help">Destination photograph, not the property.</p><div className="card-meta-row"><span>{accommodation.location}</span><strong>Dated room options</strong></div><Link className="text-link" href={"/accommodation/" + accommodation.slug}>View rooms and rates <span aria-hidden="true">&rarr;</span></Link></div></article>;
}
