export type ArticleCategory = string;

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
  | { status: "success"; articles: Article[] }
  | { status: "error"; articles: Article[] };
