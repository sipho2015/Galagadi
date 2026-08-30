import { Hero } from "@/components/Hero";
import { ImageGallery } from "@/components/ImageGallery";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("Gallery", "A glimpse of Galagadi safari experiences.");
export default function GalleryPage() { return <><Hero compact eyebrow="In pictures" title="The wild, wonderfully close." description="A glimpse of the land, water and wildlife waiting for you." image="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=2000&q=90" /><section className="section"><div className="container"><ImageGallery /></div></section></>; }
