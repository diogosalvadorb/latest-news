export type ArticleCategory = "Society" | "Technology" | "Planet" | "Culture" | "Well-being";

export interface Article {
  id: string;
  title: string;
  description: string;
  category: ArticleCategory | null;
  createdAt: string;
  imageUrl: string | null;
  imageAlt: string;
  illustration?: "chip" | "moon";
  levels: { level: number; text: string }[];
  hasAudio: boolean;
}

export type ArticlesResult =
  | { status: "success" | "demo"; articles: Article[] }
  | { status: "error"; articles: Article[] };

export const categories: ArticleCategory[] = ["Society", "Technology", "Planet", "Culture", "Well-being"];
