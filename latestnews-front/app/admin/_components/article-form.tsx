"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import type { Article } from "@/lib/articles";
import { SuccessNotice } from "./success-notice";
import { AdminIcon } from "./admin-icon";

type Errors = Record<string, string>;
type Result = {
  id?: string;
  message?: string;
  errors?: Record<string, string[]>;
};

export function ArticleForm({
  article,
  categories,
}: {
  article?: Article;
  categories: string[];
}) {
  const router = useRouter();
  const [title, setTitle] = useState(article?.title ?? "");
  const [category, setCategory] = useState(article?.category ?? "");
  const [source, setSource] = useState("");
  const [basic, setBasic] = useState(
    article?.levels.find((level) => level.level === 1)?.text ?? "",
  );
  const [advanced, setAdvanced] = useState(
    article?.levels.find((level) => level.level === 2)?.text ?? "",
  );
  const [errors, setErrors] = useState<Errors>({});
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");
  const [pending, setPending] = useState(false);
  const words = source.trim() ? source.trim().split(/\s+/).length : 0;
  const editing = Boolean(article);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const validation: Errors = {};
    if (!title.trim()) validation.Title = "Enter an article title.";
    if (!category.trim()) validation.Category = "Enter an article category.";
    if (!editing && !source.trim()) validation.Theme = "Enter the source text.";
    if (!editing && words > 10000) validation.Theme = "Use up to 10,000 words.";
    if (editing && !basic.trim())
      validation.BasicText = "Enter the Basic text.";
    if (editing && !advanced.trim())
      validation.AdvancedText = "Enter the Advanced text.";
    setErrors(validation);
    setMessage("");
    setSuccess("");
    if (Object.keys(validation).length) {
      setMessage("Check the highlighted fields.");
      return;
    }
    setPending(true);
    try {
      const form = new FormData();
      form.set("Title", title.trim());
      form.set("Category", category.trim());
      if (editing) {
        form.set("BasicText", basic);
        form.set("AdvancedText", advanced);
      } else {
        form.set("Theme", source);
        form.set("GenerateAudio", "false");
      }
      const response = await fetch(
        editing ? `/api/admin/articles/${article!.id}` : "/api/admin/articles",
        { method: editing ? "PUT" : "POST", body: form },
      );
      const result = (await response.json()) as Result;
      if (!response.ok) {
        const fields: Errors = {};
        for (const [key, value] of Object.entries(result.errors ?? {}))
          fields[key.split(".").pop()!] = value.join(" ");
        setErrors(fields);
        setMessage(result.message ?? "Unable to save this article.");
        return;
      }
      if (!result.id) throw new Error("Missing article ID");
      if (!editing) {
        setTitle("");
        setCategory("");
        setSource("");
        setBasic("");
        setAdvanced("");
        setErrors({});
        setMessage("");
        router.replace("/admin?created=1");
      } else setSuccess("Article updated successfully.");
      router.refresh();
    } catch {
      setMessage("Unable to save this article. Please try again.");
    } finally {
      setPending(false);
    }
  }

  const error = (name: string) =>
    errors[name] ? (
      <p className="admin-field-error" id={`${name}-error`}>
        {errors[name]}
      </p>
    ) : null;
  return (
    <div className="admin-form-layout">
      <form
        className="admin-form-card"
        onSubmit={submit}
        noValidate
        aria-busy={pending}
      >
        <div className="admin-form-section-head">
          <h2>Article details</h2>
          <span>* Required fields</span>
        </div>
        {success && (
          <SuccessNotice
            title={success}
            description="Your changes have been saved."
          />
        )}
        <fieldset disabled={pending} className="admin-fieldset">
          <div className="admin-field">
            <label htmlFor="article-title">Title *</label>
            <input
              id="article-title"
              name="Title"
              value={title}
              maxLength={200}
              required
              onChange={(event) => setTitle(event.target.value)}
              aria-invalid={Boolean(errors.Title)}
              aria-describedby={errors.Title ? "Title-error" : undefined}
              placeholder="Give your story a title"
            />
            {error("Title")}
          </div>
          <div className="admin-field">
            <label htmlFor="article-category">Category *</label>
            <input
              id="article-category"
              name="Category"
              value={category}
              maxLength={100}
              required
              list="article-categories"
              onChange={(event) => setCategory(event.target.value)}
              aria-invalid={Boolean(errors.Category)}
              aria-describedby={errors.Category ? "Category-error" : undefined}
              placeholder="Choose or enter a category"
            />
            <datalist id="article-categories">
              {categories.map((item) => (
                <option key={item} value={item} />
              ))}
            </datalist>
            {error("Category")}
          </div>
          <div className="admin-field">
            <label htmlFor="article-image">
              Cover image <span>· Coming soon</span>
            </label>
            {article?.imageUrl && (
              <div className="admin-cover-preview">
                <Image
                  src={article.imageUrl}
                  alt={article.title}
                  fill
                  sizes="(max-width: 960px) 100vw, 760px"
                  unoptimized
                />
              </div>
            )}
            <div className="admin-upload" aria-disabled="true">
              <AdminIcon name="upload" />
              <p>
                {article?.imageUrl
                  ? "Choose a new image"
                  : "Choose an image or drag it here"}
              </p>
              <small>
                JPG, PNG, or GIF · Up to 5 MB
                <br />
                Image upload coming soon
              </small>
              <input
                id="article-image"
                type="file"
                disabled
                accept="image/jpeg,image/png,image/gif"
                aria-label="Cover image upload — coming soon"
              />
            </div>
          </div>
          {editing ? (
            <>
              <div className="rule" />
              <div className="admin-form-section-head">
                <h2>Content by level</h2>
                <span>Edit both versions</span>
              </div>
              <div className="admin-field">
                <label htmlFor="basic-text">Basic text *</label>
                <textarea
                  id="basic-text"
                  name="BasicText"
                  value={basic}
                  maxLength={250000}
                  required
                  rows={10}
                  onChange={(event) => setBasic(event.target.value)}
                  aria-invalid={Boolean(errors.BasicText)}
                  aria-describedby={
                    errors.BasicText ? "BasicText-error" : undefined
                  }
                />
                {error("BasicText")}
              </div>
              <div className="admin-field">
                <label htmlFor="advanced-text">Advanced text *</label>
                <textarea
                  id="advanced-text"
                  name="AdvancedText"
                  value={advanced}
                  maxLength={250000}
                  required
                  rows={10}
                  onChange={(event) => setAdvanced(event.target.value)}
                  aria-invalid={Boolean(errors.AdvancedText)}
                  aria-describedby={
                    errors.AdvancedText ? "AdvancedText-error" : undefined
                  }
                />
                {error("AdvancedText")}
              </div>
            </>
          ) : (
            <div className="admin-field">
              <label htmlFor="source-text">Source text *</label>
              <p className="admin-input-hint" id="source-help">
                Paste the complete text for the Basic and Advanced versions.
              </p>
              <textarea
                id="source-text"
                name="Theme"
                value={source}
                maxLength={250000}
                required
                rows={14}
                onChange={(event) => setSource(event.target.value)}
                placeholder="Paste the full article or reference text here…"
                aria-invalid={Boolean(errors.Theme)}
                aria-describedby={`source-help source-word-count${errors.Theme ? " Theme-error" : ""}`}
              />
              <div className="admin-field-help">
                <span>Up to 10,000 words</span>
                <span id="source-word-count">
                  {words.toLocaleString("en-US")} / 10,000 words
                </span>
              </div>
              {error("Theme")}
            </div>
          )}
          <div className="admin-audio-option">
            <input id="admin-audio" type="checkbox" disabled />
            <div>
              <label htmlFor="admin-audio">
                {editing
                  ? "Update audio narration"
                  : "Include audio for both levels"}
              </label>
              <p>Audio generation coming soon.</p>
            </div>
          </div>
          <div className="admin-form-actions">
            <Link className="btn" href="/admin">
              Cancel
            </Link>
            <button className="btn primary" type="submit" disabled={pending}>
              {pending
                ? "Saving…"
                : editing
                  ? "Save changes"
                  : "Create article"}
            </button>
          </div>
        </fieldset>
        <p className="admin-form-note">
          Review both versions before sharing the article.
        </p>
        {message && (
          <p className="admin-form-error" role="alert">
            {message}
          </p>
        )}
      </form>
      <aside className="admin-form-aside">
        <section className="panel">
          <span className="admin-kicker">
            {editing ? "Writing guide" : "From source to story"}
          </span>
          <h2>One story, two levels.</h2>
          <div className="admin-guide-level">
            <span className="mono">01</span>
            <div>
              <h3>Basic</h3>
              <p>
                Keep the main ideas. Use short sentences and familiar words.
              </p>
            </div>
          </div>
          <div className="admin-guide-level">
            <span className="mono">02</span>
            <div>
              <h3>Advanced</h3>
              <p>Add context and introduce richer vocabulary.</p>
            </div>
          </div>
          <div className="rule" />
          <p>
            {editing
              ? "Changes to both texts are saved together."
              : "Review the versions returned by the article service after creation."}
          </p>
        </section>
        {article && (
          <>
            <section className="panel">
              <h2>Reader preview</h2>
              <p>Check the saved article in its reading view.</p>
              <Link className="btn text" href={`/articles/${article.id}`}>
                Preview article →
              </Link>
            </section>
            <section className="panel admin-danger-panel">
              <h2>Delete article</h2>
              <p>Remove this article and its reading versions.</p>
              <Link
                className="btn admin-delete-link"
                href={`/admin/articles/${article.id}/delete`}
              >
                Delete article
              </Link>
            </section>
          </>
        )}
      </aside>
    </div>
  );
}
