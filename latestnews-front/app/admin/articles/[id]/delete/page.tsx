import { connection } from "next/server";
import { notFound } from "next/navigation";
import { getArticleById } from "@/data/articles";
import { AdminHeading } from "@/app/admin/_components/admin-heading";
import { DeleteArticle } from "./_components/delete-article";

export const metadata = { title: "Delete article" };

export default async function DeleteArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await connection();
  const { id } = await params;
  const article = await getArticleById(id);
  if (!article) notFound();
  return (
    <>
      <AdminHeading
        section="Delete article"
        title="Delete this article?"
        description="Review the article before confirming its removal."
      />
      <DeleteArticle id={article.id} title={article.title} />
    </>
  );
}
