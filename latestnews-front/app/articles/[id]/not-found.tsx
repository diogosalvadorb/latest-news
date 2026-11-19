import Link from "next/link";

export default function ArticleNotFound() {
  return <section className="article-state"><h1>Article not found</h1><p>This article is unavailable or the link is incorrect.</p><Link className="btn" href="/">Back to articles</Link></section>;
}
