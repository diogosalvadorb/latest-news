import Link from "next/link";

export default function AdminNotFound() {
  return (
    <section className="article-state">
      <h1>Article not found</h1>
      <p>The article may have been deleted.</p>
      <Link className="btn" href="/admin">
        Back to articles
      </Link>
    </section>
  );
}
