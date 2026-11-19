"use client";

import { useState } from "react";
import type { Article, ArticlesResult } from "@/lib/articles";
import { ArticleCard } from "./article-card";
import { ArticlePreview } from "./article-preview";
import { ReadingGuide } from "./reading-guide";
import { Icon } from "./icon";

export function ArticleFeed({ result }: { result: ArticlesResult }) {
  const [category, setCategory] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Article | null>(null);
  const query = search.trim().toLocaleLowerCase();
  const articles = result.articles.filter((article) =>
    (category === null || category === article.category) &&
    `${article.title} ${article.description} ${article.category ?? ""}`.toLocaleLowerCase().includes(query),
  );
  const availableCategories = Array.from(new Set(
    result.articles.map((article) => article.category).filter((value): value is string => Boolean(value)),
  ));

  function selectCategory(value: string | null) {
    setCategory(value);
  }

  return (
    <section id="articles" aria-label="Article collection">
      <div className="toolbar">
        <div className="filters" aria-label="Article categories">
          <button type="button" className={`filter ${category === null ? "active" : ""}`} aria-pressed={category === null} onClick={() => selectCategory(null)}>All articles</button>
          {availableCategories.map((item) => (
            <button key={item} type="button" className={`filter ${category === item ? "active" : ""}`} aria-pressed={category === item} onClick={() => selectCategory(item)}>{item}</button>
          ))}
        </div>
        <div className="search">
          <Icon name="search" />
          <label htmlFor="article-search">Search articles</label>
          <input id="article-search" type="search" placeholder="Search articles" value={search} onChange={(event) => setSearch(event.target.value)} />
        </div>
      </div>
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
                  ? "Try another search or choose a different topic."
                  : "Check back soon for the latest articles."}
              </p>
              {result.articles.length > 0 && (
                <button
                  className="btn"
                  onClick={() => {
                    setCategory(null);
                    setSearch("");
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
