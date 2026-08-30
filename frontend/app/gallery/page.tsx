import { Hero } from "@/components/Hero";
import { ImageGallery } from "@/components/ImageGallery";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("Gallery", "A glimpse of Galagadi safari experiences.");
export default function GalleryPage() { return <><Hero compact eyebrow="In pictures" title="The wild, wonderfully close." description="A visual story of the landscapes, wildlife and golden moments waiting in Victoria Falls and Chobe." image="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=2000&q=90" /><section className="section gallery-intro"><div className="container"><div className="section-heading centered-heading"><p className="eyebrow">Photo journal</p><h2>Moments that stay with you.</h2><p>Explore the region through a collection of close encounters, expansive horizons and quiet river moments.</p></div><ImageGallery /></div></section></>; }
