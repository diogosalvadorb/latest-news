"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { AdminIcon } from "@/app/admin/_components/admin-icon";

export function DeleteArticle({ id, title }: { id: string; title: string }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  async function remove(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    setPending(true);
    setError("");
    try {
      const response = await fetch(`/api/admin/articles/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const result = await response.json();
        setError(result.message ?? "Unable to delete this article.");
        return;
      }
      router.replace("/admin?deleted=1");
      router.refresh();
    } catch {
      setError("Unable to delete this article. Please try again.");
    } finally {
      setPending(false);
    }
  }
  return (
    <form
      className="admin-delete-confirmation"
      onSubmit={remove}
      aria-busy={pending}
    >
      <div className="admin-danger-icon">
        <AdminIcon name="trash" />
      </div>
      <h2>{title}</h2>
      <p>
        This permanently deletes the article and both reading versions. This
        action cannot be undone.
      </p>
      {error && (
        <p className="admin-form-error" role="alert">
          {error}
        </p>
      )}
      <div className="admin-form-actions">
        <Link className="btn" href="/admin">
          Keep article
        </Link>
        <button
          className="btn admin-danger-button"
          type="submit"
          disabled={pending}
        >
          {pending ? "Deleting…" : "Delete article"}
        </button>
      </div>
    </form>
  );
}
