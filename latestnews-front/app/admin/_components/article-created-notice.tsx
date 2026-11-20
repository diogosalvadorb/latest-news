"use client";

import { useEffect } from "react";
import { SuccessNotice } from "./success-notice";

export function ArticleCreatedNotice({
  created,
  deleted,
}: {
  created: boolean;
  deleted: boolean;
}) {
  useEffect(() => {
    if (!created && !deleted) return;
    const url = new URL(window.location.href);
    url.searchParams.delete("created");
    url.searchParams.delete("deleted");
    window.history.replaceState(
      null,
      "",
      `${url.pathname}${url.search}${url.hash}`,
    );
  }, [created, deleted]);

  if (deleted)
    return (
      <SuccessNotice
        key="deleted"
        title="Article deleted successfully."
        description="The article has been removed from the list."
      />
    );
  if (created)
    return (
      <SuccessNotice
        key="created"
        title="Article created successfully."
        description="Your article is now in the list."
      />
    );
  return null;
}
