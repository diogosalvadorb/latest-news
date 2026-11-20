"use client";

import { useEffect, useState } from "react";

export function SuccessNotice({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 8000);
    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) return null;
  return (
    <div className="admin-created-notice" role="status" aria-live="polite">
      <span aria-hidden="true">✓</span>
      <div>
        <strong>{title}</strong>
        <p>{description}</p>
      </div>
      <button
        type="button"
        onClick={() => setVisible(false)}
        aria-label="Dismiss success notification"
      >
        ×
      </button>
    </div>
  );
}
