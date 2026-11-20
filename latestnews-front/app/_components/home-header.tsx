import { Brand } from "./brand";
import { Icon } from "./icon";
import Link from "next/link";

export function HomeHeader() {
  return (
    <header className="header">
      <div className="wrap">
        <Brand />
        <nav className="nav" aria-label="Main navigation">
          <Link href="/#articles" className="current">
            Articles
          </Link>
          <Link href="/#reading-guide">Reading levels</Link>
          <Link href="/admin" className="btn admin-button">
            <span className="admin-full">Admin workspace</span>
            <span className="admin-short">Admin</span>
            <Icon name="external" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
