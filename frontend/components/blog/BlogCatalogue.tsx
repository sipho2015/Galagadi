"use client";

import { useState } from "react";
import { BlogCard, type BlogCardData } from "./BlogCard";
import { blogCategories, type BlogCategory } from "@/types/blog";

export function BlogCatalogue({ posts }: { posts: (BlogCardData & { tags: BlogCategory[] })[] }) {
  const [selected, setSelected] = useState<(typeof blogCategories)[number]>("All");
  const filtered = selected === "All" ? posts : posts.filter(post => post.tags.includes(selected));
  return <section className="journal-catalogue section" id="travel-guides" aria-labelledby="journal-stories-title">
    <div className="container">
      <div className="journal-catalogue-heading"><div><p className="journal-label">The field notes</p><h2 id="journal-stories-title">Find your next inspiration</h2></div><p>Thoughtful guides for the journey ahead.</p></div>
      <div className="journal-filters" role="group" aria-label="Filter stories by category">
        {blogCategories.map(category => <button key={category} type="button" aria-pressed={selected === category} aria-controls="journal-results" onClick={() => setSelected(category)}>{category}</button>)}
      </div>
      <p className="journal-result-count" role="status" aria-live="polite" aria-atomic="true">{filtered.length} {filtered.length === 1 ? "story" : "stories"} · {selected === "All" ? "All journeys" : selected}</p>
      <div className="journal-grid" id="journal-results">{filtered.map(post => <BlogCard key={post.slug} post={post} />)}</div>
      {filtered.length === 0 && <p>No stories in this category yet. Explore another part of the journal.</p>}
    </div>
  </section>;
}
