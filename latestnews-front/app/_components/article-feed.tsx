"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition, type FormEvent } from "react";
import type { PagedArticlesResult } from "@/lib/articles";
import { ArticleCard } from "./article-card";
import { ReadingGuide } from "./reading-guide";
import { Icon } from "./icon";

export function ArticleFeed({
  result,
  searchQuery,
  category,
}: {
  result: PagedArticlesResult;
  searchQuery: string;
  category: string;
}) {
  const router = useRouter();
  const [search, setSearch] = useState(searchQuery);
  const [pending, startTransition] = useTransition();
  const filtered = Boolean(searchQuery || category);
  const availableCategories = result.categories;

  function href(page: number, query = searchQuery, topic = category) {
    const params = new URLSearchParams();
    if (page > 1) params.set("page", String(page));
    if (query.trim()) params.set("search", query.trim());
    if (topic) params.set("category", topic);
    return params.size ? `/?${params}#articles` : "/#articles";
  }
  function navigate(query: string, topic: string) {
    startTransition(() =>
      router.push(href(1, query, topic), { scroll: false }),
    );
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    navigate(search, category);
  }
  const pageNumbers = Array.from(
    new Set([
      1,
      result.totalPages,
      ...Array.from({ length: 3 }, (_, index) => result.page + index - 1),
    ]),
  )
    .filter((page) => page > 0 && page <= result.totalPages)
    .sort((a, b) => a - b);

  return (
    <section id="articles" aria-label="Article collection" aria-busy={pending}>
      <div className="toolbar">
        <div className="filters" aria-label="Article categories">
          <button
            type="button"
            className={`filter ${!category ? "active" : ""}`}
            aria-pressed={!category}
            onClick={() => navigate(search, "")}
            disabled={pending}
          >
            All articles
          </button>
          {availableCategories.map((item) => (
            <button
              key={item}
              type="button"
              className={`filter ${category === item ? "active" : ""}`}
              aria-pressed={category === item}
              onClick={() => navigate(search, item)}
              disabled={pending}
            >
              {item}
            </button>
          ))}
        </div>
        <form className="search home-search" role="search" onSubmit={submit}>
          <Icon name="search" />
          <input
            id="article-search"
            type="search"
            aria-label="Search articles"
            placeholder="Search articles"
            value={search}
            maxLength={200}
            onChange={(event) => setSearch(event.target.value)}
          />
          <button
            type="submit"
            aria-label="Submit article search"
            disabled={pending}
          >
            <Icon name="arrow" />
          </button>
        </form>
      </div>
      {pending && (
        <p className="home-page-status" role="status">
          Loading articles…
        </p>
      )}
      <div className="layout">
        <section className="feed" aria-label="Articles">
          <span className="sr-only" role="status">
            {result.totalCount} articles found
          </span>
          {result.status === "error" ? (
            <div className="empty" role="alert">
              <h2>Unable to load articles</h2>
              <p>Please try again in a moment.</p>
              <button className="btn" onClick={() => router.refresh()}>
                Try again
              </button>
            </div>
          ) : result.articles.length ? (
            result.articles.map((article, index) => (
              <ArticleCard
                key={article.id}
                article={article}
                priority={index === 0}
              />
            ))
          ) : (
            <div className="empty">
              <h2>
                {filtered
                  ? "No articles found"
                  : "New stories are on their way"}
              </h2>
              <p>
                {filtered
                  ? "Try another search or choose a different topic."
                  : "Check back soon for the latest articles."}
              </p>
              {filtered && (
                <button
                  className="btn"
                  onClick={() => {
                    setSearch("");
                    navigate("", "");
                  }}
                >
                  Clear filters
                </button>
              )}
            </div>
          )}
          {result.status === "success" && result.totalCount > 0 && (
            <nav className="home-pagination" aria-label="Article pagination">
              <p className="home-page-summary">
                {(result.page - 1) * result.pageSize + 1}–
                {Math.min(result.page * result.pageSize, result.totalCount)} of{" "}
                {result.totalCount} articles
              </p>
              <div className="home-page-controls">
                {result.page > 1 ? (
                  <Link
                    className="btn home-page-direction"
                    href={href(result.page - 1)}
                    aria-label="Previous page"
                    prefetch={false}
                  >
                    ←<span>Previous</span>
                  </Link>
                ) : (
                  <span
                    className="btn home-page-direction"
                    aria-disabled="true"
                  >
                    ←<span>Previous</span>
                  </span>
                )}
                <span className="home-page-mobile">
                  Page {result.page} of {result.totalPages}
                </span>
                <div className="home-page-numbers">
                  {pageNumbers.map((page, index) => (
                    <span key={page} className="home-page-slot">
                      {index > 0 && page - pageNumbers[index - 1] > 1 && (
                        <span className="home-page-gap" aria-hidden="true">
                          …
                        </span>
                      )}
                      <Link
                        className={`btn home-page-number ${page === result.page ? "active" : ""}`}
                        href={href(page)}
                        aria-label={`Page ${page}`}
                        aria-current={page === result.page ? "page" : undefined}
                        prefetch={false}
                      >
                        {page}
                      </Link>
                    </span>
                  ))}
                </div>
                {result.page < result.totalPages ? (
                  <Link
                    className="btn home-page-direction"
                    href={href(result.page + 1)}
                    aria-label="Next page"
                    prefetch={false}
                  >
                    <span>Next</span>→
                  </Link>
                ) : (
                  <span
                    className="btn home-page-direction"
                    aria-disabled="true"
                  >
                    <span>Next</span>→
                  </span>
                )}
              </div>
            </nav>
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
                  onClick={() => navigate(search, item)}
                  aria-pressed={category === item}
                  disabled={pending}
                >
                  {item}
                  <Icon name="arrow" />
                </button>
              ))}
            </div>
          )}
        </aside>
      </div>
    </section>
  );
}
