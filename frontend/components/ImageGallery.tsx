"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { galleryCategories, galleryImages as images, type GalleryImage } from "@/data/gallery";

const choices = ["All", ...galleryCategories.filter(category => images.some(image => image.category === category))] as const;

export function ImageGallery() {
  const [filter, setFilter] = useState<(typeof choices)[number]>("All");
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const visibleImages = images.filter(({ category }) => filter === "All" || filter === category);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedImage(null);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return <>
    <div className="gallery-filters" aria-label="Filter gallery">
      {choices.map(item => <button className={filter === item ? "selected" : ""} key={item} type="button" aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}
    </div>
    <p role="status" aria-live="polite">{visibleImages.length} photos{filter !== "All" ? ` in ${filter.toLowerCase()}` : " across all experiences"}</p>
    <div className="gallery-grid">
      {visibleImages.map(item => <figure key={item.image}>
        <button className="gallery-image-button" type="button" onClick={() => setSelectedImage(item)} aria-label={`View ${item.title} details`}>
          <Image src={item.image} alt={item.title} fill sizes="(max-width: 580px) calc(50vw - 22px), (max-width: 880px) calc(50vw - 30px), 560px" />
          <span className="gallery-view-label">View image</span>
        </button>
        <figcaption><span>{item.category}</span><strong>{item.title}</strong></figcaption>
      </figure>)}
    </div>
    {selectedImage && <div className="gallery-modal-backdrop" role="presentation" onClick={() => setSelectedImage(null)}>
      <section className="gallery-modal" role="dialog" aria-modal="true" aria-labelledby="gallery-modal-title" onClick={event => event.stopPropagation()}>
        <button className="gallery-modal-close" type="button" onClick={() => setSelectedImage(null)} aria-label="Close image viewer">×</button>
        <div className="gallery-modal-image"><Image src={selectedImage.image} alt={selectedImage.title} fill sizes="(max-width: 960px) calc(100vw - 48px), 960px" /></div>
        <div className="gallery-modal-copy">
          <p className="eyebrow">{selectedImage.category}</p>
          <h2 id="gallery-modal-title">{selectedImage.title}</h2>
          <p>{selectedImage.detail}</p>
          {selectedImage.credit && <p>Photo: <a href={selectedImage.credit.url} target="_blank" rel="noreferrer">{selectedImage.credit.name}</a></p>}
        </div>
      </section>
    </div>}
  </>;
}
