import type { Article } from "@/lib/articles";

// Content from the Doop V2 reference. Used only when API_BASE_URL is not configured.
const previews: Omit<Article, "createdAt" | "levels" | "hasAudio">[] = [
  { id: "gen-z", title: "Gen Z is redefining success", description: "A fresh perspective on work, money, and what really matters.", category: "Society", imageUrl: "/images/desk.jpg", imageAlt: "A laptop and notebook on a desk" },
  { id: "green-cities", title: "Why do we need greener cities?", description: "More trees, less heat, and a better life for everyone.", category: "Planet", imageUrl: "/images/tree.jpg", imageAlt: "A mature tree providing shade in a park" },
  { id: "everyday-ai", title: "Artificial intelligence in everyday life", description: "How technology shapes the small choices in our daily lives.", category: "Technology", imageUrl: null, imageAlt: "Illustration of an AI processor", illustration: "chip" },
  { id: "sleep", title: "The power of a good night’s sleep", description: "Rest as an essential part of a more balanced life.", category: "Well-being", imageUrl: null, imageAlt: "Illustration of a crescent moon", illustration: "moon" },
  { id: "learning", title: "How we learn new things", description: "Small habits that turn curiosity into knowledge.", category: "Culture", imageUrl: "/images/books.jpg", imageAlt: "A stack of books on a table" },
];

export const demoArticles: Article[] = previews.map((article) => ({ ...article, createdAt: "2026-11-12T12:00:00Z", levels: [{ level: 1, text: "" }, { level: 2, text: "" }], hasAudio: true }));
