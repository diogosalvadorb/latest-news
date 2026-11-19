"use client";

import { useState } from "react";
import type { Article, ArticlesResult } from "@/lib/articles";
import { categories } from "@/lib/articles";
import { ArticleCard } from "./article-card";
import { ArticlePreview } from "./article-preview";
import { ReadingGuide } from "./reading-guide";
import { Icon } from "./icon";

export function ArticleFeed({ result }: { result: ArticlesResult }) {
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState<Article | null>(null);
  const articles = result.articles.filter(
    (article) => category === "All" || category === article.category,
  );
  const availableCategories = categories.filter((item) =>
    result.articles.some((article) => article.category === item),
  );

  function selectCategory(value: string) {
    setCategory((current) => current === value ? "All" : value);
  }

  return (
    <section id="articles" aria-label="Article collection">
      <div className="layout">
        <section className="feed" aria-label="Articles">
          <span className="sr-only" role="status">
            {articles.length} articles found
          </span>
          {result.status === "error" ? (
            <div className="empty" role="alert">
              <h2>Unable to load articles</h2>
              <p>Please try again in a moment.</p>
              <button className="btn" onClick={() => window.location.reload()}>
                Try again
              </button>
            </div>
          ) : articles.length ? (
            articles.map((article, index) => (
              <ArticleCard
                key={article.id}
                article={article}
                priority={index === 0}
                onRead={setSelected}
              />
            ))
          ) : (
            <div className="empty">
              <h2>
                {result.articles.length
                  ? "No articles found"
                  : "New stories are on their way"}
              </h2>
              <p>
                {result.articles.length
                  ? "Choose a different topic."
                  : "Check back soon for the latest articles."}
              </p>
              {result.articles.length > 0 && (
                <button
                  className="btn"
                  onClick={() => {
                    setCategory("All");
                  }}
                >
                  Clear filters
                </button>
              )}
            </div>
          )}
        </section>
        <aside className="home-aside">
          <ReadingGuide />
          {availableCategories.length > 0 && (
            <div className="topiclinks">
              <div className="mono">Read by topic</div>
              {availableCategories.map((item) => (
                <button
                  key={item}
                  className="topic"
                  onClick={() => {
                    selectCategory(item);
                    document
                      .getElementById("articles")
                      ?.scrollIntoView({ behavior: "instant" });
                  }}
                  aria-pressed={category === item}
                >
                  {item}
                  <Icon name="arrow" />
                </button>
              ))}
            </div>
          )}
        </aside>
      </div>
      {selected && (
        <ArticlePreview
          key={selected.id}
          article={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
}
