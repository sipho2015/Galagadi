"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function ActivityGallery({ images, title }: { images: string[]; title: string }) {
  const [selected, setSelected] = useState<string | null>(null);
  useEffect(() => { const close = (event: KeyboardEvent) => { if (event.key === "Escape") setSelected(null); }; window.addEventListener("keydown", close); return () => window.removeEventListener("keydown", close); }, []);
  return <><div className="activity-gallery-grid">{images.map((image, index) => <button key={image} type="button" onClick={() => setSelected(image)} aria-label={`View ${title} image ${index + 1}`}><Image src={image} alt={`${title} experience`} fill sizes="(max-width: 700px) 100vw, 50vw" /></button>)}</div>{selected && <div className="gallery-modal-backdrop" role="presentation" onClick={() => setSelected(null)}><section className="gallery-modal" role="dialog" aria-modal="true" aria-label={`${title} image viewer`} onClick={event => event.stopPropagation()}><button className="gallery-modal-close" type="button" onClick={() => setSelected(null)} aria-label="Close image viewer">×</button><Image src={selected} alt={`${title} experience`} width={1600} height={1100} sizes="90vw" /></section></div>}</>;
}
