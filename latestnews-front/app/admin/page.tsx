import { connection } from "next/server";
import Link from "next/link";
import { getArticles } from "@/data/articles";
import { AdminHeading } from "./_components/admin-heading";
import { AdminArticles } from "./_components/admin-articles";
import { ArticleCreatedNotice } from "./_components/article-created-notice";
import { AdminIcon } from "./_components/admin-icon";

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ created?: string; deleted?: string }>;
}) {
  await connection();
  const [result, query] = await Promise.all([getArticles(), searchParams]);
  if (result.status === "error") throw new Error("Unable to load articles");
  return (
    <>
      <ArticleCreatedNotice
        created={query.created === "1"}
        deleted={query.deleted === "1"}
      />
      <AdminHeading
        title="Your articles."
        description="Manage your stories, categories, and reading levels."
      >
        <Link className="btn primary" href="/admin/articles/new">
          <AdminIcon name="plus" />
          New article
        </Link>
      </AdminHeading>
      <AdminArticles articles={result.articles} />
    </>
  );
}
