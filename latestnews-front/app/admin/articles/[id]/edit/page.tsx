import { connection } from "next/server";
import { notFound } from "next/navigation";
import { getArticleById, getArticles } from "@/data/articles";
import { AdminHeading } from "@/app/admin/_components/admin-heading";
import { ArticleForm } from "@/app/admin/_components/article-form";

export const metadata = { title: "Edit article" };

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await connection();
  const { id } = await params;
  const [article, result] = await Promise.all([
    getArticleById(id),
    getArticles(),
  ]);
  if (!article) notFound();
  const categories = [
    ...new Set(
      result.articles
        .map((item) => item.category)
        .filter((value): value is string => Boolean(value)),
    ),
  ];
  return (
    <>
      <AdminHeading
        section="Edit article"
        title="Edit your article."
        description="Update the title, category, and both reading versions."
      />
      <ArticleForm key={article.id} article={article} categories={categories} />
    </>
  );
}
