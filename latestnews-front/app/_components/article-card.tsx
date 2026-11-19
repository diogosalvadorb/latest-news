import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/articles";
import { Icon } from "./icon";

export function ArticleCard({
  article,
  priority,
}: {
  article: Article;
  priority: boolean;
}) {
  return (
    <article className="story">
      <div className="cover">
        {article.imageUrl ? (
          <Image
            src={article.imageUrl}
            alt={article.imageAlt}
            fill
            sizes="(max-width: 639px) 88px, (max-width: 1190px) 155px, 196px"
            priority={priority}
            unoptimized={!article.imageUrl.startsWith("/")}
          />
        ) : (
          <div
            className={
              article.illustration === "moon" ? "moon-art" : "chip-art"
            }
            role="img"
            aria-label={article.imageAlt}
          >
            {article.illustration !== "moon" && (
              <div className="chip">
                {article.illustration === "chip" ? "AI" : <Icon name="book" />}
              </div>
            )}
          </div>
        )}
        <span className="shade" />
      </div>
      <div className="story-content">
        <div className="story-top">
          <div className="story-meta">
            {article.category && (
              <span className="category">{article.category}</span>
            )}
            <time className="date" dateTime={article.createdAt}>
              {new Intl.DateTimeFormat("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                timeZone: "UTC",
              }).format(new Date(article.createdAt))}
            </time>
          </div>
          <h2>
            <Link className="story-title" href={`/articles/${encodeURIComponent(article.id)}`}>
              {article.title}
            </Link>
          </h2>
        </div>
        <p className="story-description">{article.description}</p>
        <div className="story-bottom">
          <Link
            className="btn"
            href={`/articles/${encodeURIComponent(article.id)}`}
            aria-label={`Read article: ${article.title}`}
          >
            Read article <Icon name="arrow" />
          </Link>
        </div>
      </div>
    </article>
  );
}
