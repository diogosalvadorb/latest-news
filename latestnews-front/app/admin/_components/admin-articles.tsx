"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Article } from "@/lib/articles";
import { Icon } from "@/app/_components/icon";
import { AdminIcon } from "./admin-icon";

export function AdminArticles({ articles }: { articles: Article[] }) {
  const [query, setQuery] = useState("");
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const categories = [
    ...new Set(
      articles
        .map((article) => article.category)
        .filter((value): value is string => Boolean(value)),
    ),
  ];
  const filtered = articles.filter(
    (article) =>
      (!category || article.category === category) &&
      `${article.title} ${article.category}`
        .toLocaleLowerCase()
        .includes(query.trim().toLocaleLowerCase()),
  );
  const pages = Math.max(1, Math.ceil(filtered.length / 10));
  const current = Math.min(page, pages);
  const visible = filtered.slice((current - 1) * 10, current * 10);
  return (
    <>
      <div className="admin-stats">
        <div>
          <span>All articles</span>
          <strong>{String(articles.length).padStart(2, "0")}</strong>
        </div>
        <div>
          <span>Categories</span>
          <strong>{String(categories.length).padStart(2, "0")}</strong>
        </div>
        <div>
          <span>Reading versions</span>
          <strong>
            {String(
              articles.reduce((sum, article) => sum + article.levels.length, 0),
            ).padStart(2, "0")}
          </strong>
        </div>
      </div>
      <section className="admin-list" aria-label="Manage articles">
        <div className="admin-list-toolbar">
          <label className="admin-category-filter">
            Category
            <select
              value={category}
              onChange={(event) => {
                setCategory(event.target.value);
                setPage(1);
              }}
            >
              <option value="">All categories</option>
              {categories.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label className="admin-search-field">
            <span>Search articles</span>
            <div className="admin-search">
              <Icon name="search" />
              <input
                type="search"
                aria-label="Search articles"
                placeholder="Search articles"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setPage(1);
                }}
              />
            </div>
          </label>
        </div>
        {visible.length ? (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Article</th>
                <th>Reading levels</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((article) => (
                <tr key={article.id}>
                  <td>
                    <div className="admin-article-cell">
                      <div className="admin-thumb">
                        {article.imageUrl && !failedImages.has(article.id) ? (
                          <Image
                            src={article.imageUrl}
                            alt=""
                            fill
                            sizes="56px"
                            unoptimized
                            onError={() =>
                              setFailedImages((previous) =>
                                new Set(previous).add(article.id),
                              )
                            }
                          />
                        ) : (
                          <Icon name="book" />
                        )}
                      </div>
                      <div>
                        <Link
                          href={`/articles/${article.id}`}
                          className="admin-article-title"
                        >
                          {article.title || "Untitled article"}
                        </Link>
                        <small>{article.category || "Uncategorized"}</small>
                      </div>
                    </div>
                  </td>
                  <td className="admin-level-cell">
                    {article.levels
                      .map((level) =>
                        level.level === 1
                          ? "Basic"
                          : level.level === 2
                            ? "Advanced"
                            : `Level ${level.level}`,
                      )
                      .join(" · ") || "No text"}
                  </td>
                  <td className="admin-date-cell">
                    <time dateTime={article.createdAt}>
                      {new Intl.DateTimeFormat("en-US", {
                        dateStyle: "medium",
                        timeZone: "UTC",
                      }).format(new Date(article.createdAt))}
                    </time>
                  </td>
                  <td>
                    <div className="admin-row-actions">
                      <Link
                        className="btn"
                        href={`/admin/articles/${article.id}/edit`}
                        aria-label={`Edit ${article.title}`}
                      >
                        <AdminIcon name="edit" />
                        Edit
                      </Link>
                      <Link
                        className="btn admin-delete-link"
                        href={`/admin/articles/${article.id}/delete`}
                        aria-label={`Delete ${article.title}`}
                      >
                        <AdminIcon name="trash" />
                        <span>Delete</span>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="admin-empty">
            <h2>
              {articles.length
                ? "No articles found"
                : "Your first article starts here"}
            </h2>
            <p>
              {articles.length
                ? "Try another title or category."
                : "Create an article to add it to your blog."}
            </p>
            {articles.length ? (
              <button
                className="btn"
                onClick={() => {
                  setQuery("");
                  setCategory("");
                }}
              >
                Clear filters
              </button>
            ) : (
              <Link className="btn primary" href="/admin/articles/new">
                New article
              </Link>
            )}
          </div>
        )}
        <div className="admin-pagination">
          <span role="status">
            {filtered.length
              ? `${(current - 1) * 10 + 1}–${Math.min(current * 10, filtered.length)} of ${filtered.length} articles`
              : "0 articles"}
          </span>
          <div>
            <button
              type="button"
              className="btn"
              disabled={current === 1}
              onClick={() => setPage(current - 1)}
              aria-label="Previous page"
            >
              ←
            </button>
            <span>
              {current} / {pages}
            </span>
            <button
              type="button"
              className="btn"
              disabled={current === pages}
              onClick={() => setPage(current + 1)}
              aria-label="Next page"
            >
              →
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
