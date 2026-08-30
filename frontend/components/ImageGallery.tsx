"use client";

import { useState } from "react";

const images = [
  ["Wildlife", "https://images.unsplash.com/photo-1547970810-dc1eac37d174?auto=format&fit=crop&w=1000&q=85"],
  ["Falls", "https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=1000&q=85"],
  ["Safari", "https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=1000&q=85"],
  ["River", "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=85"],
  ["Wildlife", "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1000&q=85"],
  ["Safari", "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1000&q=85"]
];

export function ImageGallery() {
  const [filter, setFilter] = useState("All"); const choices = ["All", "Wildlife", "Falls", "Safari", "River"];
  return <><div className="gallery-filters">{choices.map(item => <button className={filter === item ? "selected" : ""} key={item} onClick={() => setFilter(item)}>{item}</button>)}</div><div className="gallery-grid">{images.filter(([category]) => filter === "All" || filter === category).map(([category, image], index) => <figure key={image}><img src={image} alt={`${category} safari experience`} /><figcaption>{category}</figcaption></figure>)}</div></>;
}
