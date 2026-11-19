import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { getArticleById } from "@/data/articles";
import { ArticleReader } from "./_components/article-reader";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const article = await getArticleById(id);
  return { title: article ? `${article.title} — news.` : "Article not found — news." };
}

export default async function ArticlePage({ params }: Props) {
  await connection();
  const { id } = await params;
  const article = await getArticleById(id);
  if (!article) notFound();
  return <ArticleReader key={article.id} article={article} />;
}
