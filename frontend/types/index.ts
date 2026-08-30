export type ContentItem = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  image: string;
  location?: string;
  duration?: string;
  price?: string;
  highlights: string[];
};

export type FAQItem = {
  question: string;
  answer: string;
};
