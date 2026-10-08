import Image from "next/image";
import Link from "next/link";
import type { BlogPhoto } from "@/types/blog";

export type BlogCardData = { slug: string; title: string; description: string; category: string; image: BlogPhoto; minutes: number };

export function BlogCard({ post }: { post: BlogCardData }) {
  return <article className="journal-card">
    <Link className="journal-card-link" href={`/blog/${post.slug}`}>
      <div className="journal-card-image"><Image src={post.image.src} alt={post.image.alt} fill sizes="(max-width: 640px) calc(100vw - 40px), (max-width: 960px) 45vw, 350px" /></div>
      <div className="journal-card-copy">
        <p className="journal-label">{post.category}</p>
        <h3>{post.title}</h3>
        <p>{post.description}</p>
        <div className="journal-card-footer"><span>{post.minutes} min read</span><span className="journal-read">Read Story <span aria-hidden="true">→</span></span></div>
      </div>
    </Link>
  </article>;
}
