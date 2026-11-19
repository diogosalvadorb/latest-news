import "server-only";
import type { Article, ArticlesResult } from "@/lib/articles";
import { demoArticles } from "./demo-articles";

interface ApiArticle {
  id: string;
  title: string;
  category: string;
  imageUrl: string | null;
  createdAt: string;
  levels: { id: string; level: number; text: string }[];
}

function isApiArticle(value: unknown): value is ApiArticle {
  if (!value || typeof value !== "object") return false;
  const item = value as Record<string, unknown>;
  return (
    typeof item.id === "string" &&
    typeof item.title === "string" &&
    typeof item.category === "string" &&
    typeof item.createdAt === "string" &&
    !Number.isNaN(Date.parse(item.createdAt)) &&
    (item.imageUrl == null || typeof item.imageUrl === "string") &&
    Array.isArray(item.levels) &&
    item.levels.every((level: unknown) => {
      if (!level || typeof level !== "object") return false;
      const entry = level as Record<string, unknown>;
      return typeof entry.level === "number" && typeof entry.text === "string";
    })
  );
}

export async function getArticles(): Promise<ArticlesResult> {
  const baseUrl = process.env.API_BASE_URL;
  if (!baseUrl) return { status: "demo", articles: demoArticles };

  try {
    const endpoint = new URL(`${baseUrl.replace(/\/$/, "")}/api/Articles`);
    const response = await fetch(endpoint, {
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error("Articles request failed");
    const payload: unknown = await response.json();
    if (!Array.isArray(payload) || !payload.every(isApiArticle))
      throw new Error("Invalid articles response");
    const articles: Article[] = payload.map((article) => ({
      id: article.id,
      title: article.title,
      description:
        article.levels.find((level) => level.level === 1)?.text ??
        article.levels[0]?.text ??
        "",
      createdAt: article.createdAt,
      imageUrl: article.imageUrl
        ? new URL(article.imageUrl, endpoint).href
        : null,
      imageAlt: article.title,
      category: article.category.trim() || null,
      hasAudio: false,
      levels: article.levels,
    }));
    return { status: "success", articles };
  } catch {
    return { status: "error", articles: [] };
  }
}
