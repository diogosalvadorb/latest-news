import { connection } from "next/server";
import { getArticles } from "@/data/articles";
import { AdminHeading } from "@/app/admin/_components/admin-heading";
import { ArticleForm } from "@/app/admin/_components/article-form";

export const metadata = { title: "New article" };

export default async function NewArticlePage() {
  await connection();
  const result = await getArticles();
  const categories = [
    ...new Set(
      result.articles
        .map((article) => article.category)
        .filter((value): value is string => Boolean(value)),
    ),
  ];
  return (
    <>
      <AdminHeading
        section="New article"
        title="Create from your text."
        description="Add a title, category, and source text for two reading levels."
      />
      <ArticleForm categories={categories} />
    </>
  );
}
