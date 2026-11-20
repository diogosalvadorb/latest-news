"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Brand } from "@/app/_components/brand";
import { Icon } from "@/app/_components/icon";
import { AdminIcon } from "./admin-icon";

export function AdminNavigation() {
  const path = usePathname();
  const creating = path === "/admin/articles/new";
  return (
    <>
      <header className="admin-mobile-header">
        <Brand />
        <Link className="btn" href="/">
          View blog <Icon name="external" />
        </Link>
      </header>
      <aside className="admin-sidebar">
        <div className="admin-sidebar-brand">
          <Brand />
        </div>
        <div className="admin-section-label">Editorial workspace</div>
        <nav className="admin-nav" aria-label="Editorial workspace">
          <Link
            href="/admin"
            className={!creating ? "active" : ""}
            aria-current={!creating ? "page" : undefined}
          >
            <AdminIcon name="grid" />
            Articles
          </Link>
          <Link
            href="/admin/articles/new"
            className={creating ? "active" : ""}
            aria-current={creating ? "page" : undefined}
          >
            <AdminIcon name="plus" />
            New article
          </Link>
        </nav>
        <div className="admin-sidebar-bottom">
          <Link href="/" className="admin-blog-link">
            <Icon name="external" />
            View blog
          </Link>
          <p className="admin-workspace-note">Article workspace</p>
        </div>
      </aside>
    </>
  );
}
