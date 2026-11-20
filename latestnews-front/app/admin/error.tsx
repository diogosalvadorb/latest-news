"use client";

import Link from "next/link";

export default function AdminError({ reset }: { reset: () => void }) {
  return (
    <section className="article-state" role="alert">
      <h1>Unable to load this page</h1>
      <p>Check the article service and try again.</p>
      <div className="article-state-actions">
        <button className="btn" onClick={reset}>
          Try again
        </button>
        <Link href="/admin" className="btn text">
          Back to articles
        </Link>
      </div>
    </section>
  );
}
