export function findBySlug<T extends { slug: string }>(items: T[], slug: string) { return items.find(item => item.slug === slug); }
