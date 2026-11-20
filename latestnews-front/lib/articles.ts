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
  levels: { id: string; level: number; text: string }[];
  hasAudio: boolean;
}

export type ArticlesResult =
  | { status: "success"; articles: Article[] }
  | { status: "error"; articles: Article[] };

export type PagedArticlesResult = {
  status: "success" | "error";
  articles: Article[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  categories: string[];
};
