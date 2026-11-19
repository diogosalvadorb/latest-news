"use client";

import Link from "next/link";

export default function ArticleError({ reset }: { reset: () => void }) {
  return <section className="article-state" role="alert"><h1>Unable to load this article</h1><p>Please try again in a moment.</p><div className="article-state-actions"><button className="btn" onClick={reset}>Try again</button><Link className="btn text" href="/">Back to articles</Link></div></section>;
}
