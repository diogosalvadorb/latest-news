import { Suspense } from "react";
import { connection } from "next/server";
import { getArticles } from "@/data/articles";
import { ArticleFeed } from "./_components/article-feed";
import { HomeFooter } from "./_components/home-footer";
import { HomeHeader } from "./_components/home-header";

async function Articles() {
  await connection();
  const result = await getArticles();
  return <ArticleFeed result={result} />;
}

export default function Home() {
  return <><a className="skip" href="#content">Skip to content</a><HomeHeader /><main id="content" className="wrap home-main"><h1 className="sr-only">Articles</h1><Suspense fallback={<div className="loading-feed" role="status">Loading articles…</div>}><Articles /></Suspense></main><HomeFooter /></>;
}
