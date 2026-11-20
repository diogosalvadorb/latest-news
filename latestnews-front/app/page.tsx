import { Suspense } from "react";
import { connection } from "next/server";
import { redirect } from "next/navigation";
import { getPagedArticles } from "@/data/articles";
import { ArticleFeed } from "./_components/article-feed";
import { HomeFooter } from "./_components/home-footer";
import { HomeHeader } from "./_components/home-header";

type HomeSearchParams = Promise<{
  page?: string | string[];
  search?: string | string[];
  category?: string | string[];
}>;

async function Articles({ searchParams }: { searchParams: HomeSearchParams }) {
  await connection();
  const params = await searchParams;
  const value = (item: string | string[] | undefined) =>
    typeof item === "string" ? item : "";
  const rawPage = value(params.page);
  const page =
    /^\d+$/.test(rawPage) &&
    Number(rawPage) > 0 &&
    Number(rawPage) <= 2147483647
      ? Number(rawPage)
      : 1;
  const search = value(params.search).trim().slice(0, 200);
  const category = value(params.category).trim().slice(0, 100);
  const result = await getPagedArticles(page, search, category);
  if (result.status === "success" && result.page !== page) {
    const query = new URLSearchParams({ page: String(result.page) });
    if (search) query.set("search", search);
    if (category) query.set("category", category);
    redirect(`/?${query}`);
  }
  return (
    <ArticleFeed
      key={`${result.page}:${search}:${category}`}
      result={result}
      searchQuery={search}
      category={category}
    />
  );
}

export default function Home({
  searchParams,
}: {
  searchParams: HomeSearchParams;
}) {
  return (
    <>
      <a className="skip" href="#content">
        Skip to content
      </a>
      <HomeHeader />
      <main id="content" className="wrap home-main">
        <h1 className="sr-only">Articles</h1>
        <Suspense
          fallback={
            <div className="loading-feed" role="status">
              Loading articles…
            </div>
          }
        >
          <Articles searchParams={searchParams} />
        </Suspense>
      </main>
      <HomeFooter />
    </>
  );
}
