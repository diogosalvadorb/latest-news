import Link from "next/link";

export function AdminHeading({
  title,
  description,
  section,
  children,
}: {
  title: string;
  description: string;
  section?: string;
  children?: React.ReactNode;
}) {
  return (
    <>
      <div className="admin-topline">
        <nav aria-label="Breadcrumb">
          <Link href="/admin">Workspace</Link>
          <span>/</span>
          <Link href="/admin">Articles</Link>
          {section && (
            <>
              <span>/</span>
              <span>{section}</span>
            </>
          )}
        </nav>
        <Link href={section ? "/admin" : "/"}>
          {section ? "Back to articles" : "View blog"}
        </Link>
      </div>
      <div className="admin-heading">
        <div>
          <span className="admin-kicker">
            {section ?? "Editorial workspace"}
          </span>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        {children}
      </div>
    </>
  );
}
