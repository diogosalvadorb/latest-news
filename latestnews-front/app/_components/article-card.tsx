import Image from "next/image";
import type { Article } from "@/lib/articles";
import { Icon } from "./icon";

export function ArticleCard({
  article,
  priority,
  onRead,
}: {
  article: Article;
  priority: boolean;
  onRead: (article: Article) => void;
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
            <button className="story-title" onClick={() => onRead(article)}>
              {article.title}
            </button>
          </h2>
        </div>
        <p className="story-description">{article.description}</p>
        <div className="story-bottom">
          <button
            className="btn"
            onClick={() => onRead(article)}
            aria-label={`Read article: ${article.title}`}
          >
            Read article <Icon name="arrow" />
          </button>
          <span className="audio-meta">
            {article.hasAudio && <Icon name="headphones" />}
            {article.levels.length}{" "}
            {article.levels.length === 1 ? "level" : "levels"}
            {article.hasAudio && " · Audio"}
          </span>
        </div>
      </div>
    </article>
  );
}
