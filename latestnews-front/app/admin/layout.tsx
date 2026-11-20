import type { Metadata } from "next";
import { Suspense } from "react";
import { AdminNavigation } from "./_components/admin-navigation";

export const metadata: Metadata = {
  title: { default: "Articles — news. admin", template: "%s — news. admin" },
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-shell">
      <a href="#admin-content" className="skip">
        Skip to content
      </a>
      <Suspense
        fallback={<aside className="admin-sidebar" aria-hidden="true" />}
      >
        <AdminNavigation />
      </Suspense>
      <main id="admin-content" className="admin-main">
        {children}
      </main>
    </div>
  );
}
