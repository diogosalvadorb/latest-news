import "server-only";
import { cache } from "react";
import type { Article, ArticlesResult } from "@/lib/articles";

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
      return (
        typeof entry.id === "string" &&
        typeof entry.level === "number" &&
        typeof entry.text === "string"
      );
    })
  );
}

function toArticle(article: ApiArticle, endpoint: URL): Article {
  const levels = [...article.levels].sort((a, b) => a.level - b.level);
  return {
    id: article.id,
    title: article.title,
    description:
      levels.find((level) => level.level === 1)?.text ?? levels[0]?.text ?? "",
    createdAt: article.createdAt,
    imageUrl: article.imageUrl
      ? new URL(article.imageUrl, endpoint).href
      : null,
    imageAlt: article.title,
    category: article.category.trim() || null,
    hasAudio: false,
    levels,
  };
}

export const getArticleById = cache(
  async (id: string): Promise<Article | null> => {
    const baseUrl = process.env.API_BASE_URL;
    if (!baseUrl) throw new Error("API_BASE_URL is not configured");
    if (
      !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
        id,
      )
    )
      return null;

    const endpoint = new URL(
      `${baseUrl.replace(/\/$/, "")}/api/Articles/${encodeURIComponent(id)}`,
    );
    const response = await fetch(endpoint, {
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
    if (response.status === 404) return null;
    if (!response.ok) throw new Error("Unable to load article");
    const payload: unknown = await response.json();
    if (!isApiArticle(payload) || payload.id.toLowerCase() !== id.toLowerCase())
      throw new Error("Invalid article response");
    return toArticle(payload, endpoint);
  },
);

export async function getArticles(): Promise<ArticlesResult> {
  const baseUrl = process.env.API_BASE_URL;
  if (!baseUrl) return { status: "error", articles: [] };

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
    const articles = payload.map((article) => toArticle(article, endpoint));
    return { status: "success", articles };
  } catch {
    return { status: "error", articles: [] };
  }
}
