"use client";

import { useEffect, useState } from "react";

type GalleryImage = {
  category: "Wildlife" | "Falls" | "Safari" | "River";
  title: string;
  detail: string;
  image: string;
};

const images: GalleryImage[] = [
  { category: "Wildlife", title: "Elephant country", detail: "A quiet moment with Chobe's gentle giants in their natural habitat.", image: "images/gallery/Elephant_Along_Zambezi.jpg" },
  { category: "Falls", title: "Victoria Falls", detail: "The immense curtain of water that gives this iconic destination its local name, Mosi-oa-Tunya.", image: "images/gallery/Zambezi_Curtain.jpg" },
  { category: "Safari", title: "Into the wild", detail: "A game drive brings you close to the rhythm of the African bush.", image: "images/gallery/Inside_the_safari.jpg" },
  { category: "River", title: "Along the Zambezi", detail: "The Zambezi River invites slower moments and wide-open views.", image: "https://images.unsplash.com/photo-1504432842672-1a79f78e4084?auto=format&fit=crop&w=1600&q=90" },
  { category: "Wildlife", title: "Quiet encounters", detail: "Wildlife sightings are often at their most memorable when the landscape is still.", image: "images/gallery/Rhino_Hwange.jpeg" },
  { category: "Safari", title: "Golden-hour drive", detail: "Evening light turns every drive into a story worth remembering.", image:"images/gallery/Night_Game.jpg" },
  { category: "River", title: "Still water", detail: "A calm river scene reflects the peaceful side of a safari journey.", image: "images/gallery/Zambezi_River.jpg" },
  { category: "Falls", title: "Mist and rainforest", detail: "The rainforest around Victoria Falls is nourished by the spray year-round.", image: "images/gallery/Rain_forest.jpg" }
];

const choices = ["All", "Wildlife", "Falls", "Safari", "River"] as const;

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
      {choices.map(item => <button className={filter === item ? "selected" : ""} key={item} onClick={() => setFilter(item)}>{item}</button>)}
    </div>
    <div className="gallery-grid">
      {visibleImages.map(item => <figure key={`${item.category}-${item.title}`}>
        <button className="gallery-image-button" type="button" onClick={() => setSelectedImage(item)} aria-label={`View ${item.title} details`}>
          <img src={item.image} alt={item.title} />
          <span className="gallery-view-label">View image</span>
        </button>
        <figcaption><span>{item.category}</span><strong>{item.title}</strong></figcaption>
      </figure>)}
    </div>
    {selectedImage && <div className="gallery-modal-backdrop" role="presentation" onClick={() => setSelectedImage(null)}>
      <section className="gallery-modal" role="dialog" aria-modal="true" aria-labelledby="gallery-modal-title" onClick={event => event.stopPropagation()}>
        <button className="gallery-modal-close" type="button" onClick={() => setSelectedImage(null)} aria-label="Close image viewer">×</button>
        <img src={selectedImage.image} alt={selectedImage.title} />
        <div className="gallery-modal-copy">
          <p className="eyebrow">{selectedImage.category}</p>
          <h2 id="gallery-modal-title">{selectedImage.title}</h2>
          <p>{selectedImage.detail}</p>
        </div>
      </section>
    </div>}
  </>;
}
