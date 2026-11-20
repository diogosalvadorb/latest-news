export function AdminIcon({
  name,
}: {
  name: "grid" | "plus" | "edit" | "trash" | "upload" | "arrow";
}) {
  return (
    <svg className="ico" viewBox="0 0 24 24" aria-hidden="true">
      {name === "grid" ? (
        <>
          <rect x="4" y="4" width="6" height="6" rx="1" />
          <rect x="14" y="4" width="6" height="6" rx="1" />
          <rect x="4" y="14" width="6" height="6" rx="1" />
          <rect x="14" y="14" width="6" height="6" rx="1" />
        </>
      ) : (
        <path
          d={
            name === "plus"
              ? "M12 5v14M5 12h14"
              : name === "edit"
                ? "m15 5 4 4M4 20l4-1L20 7a2.8 2.8 0 0 0-4-4L4 15v5Z"
                : name === "trash"
                  ? "M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7m4-7v7"
                  : name === "upload"
                    ? "M12 16V3m-5 5 5-5 5 5M4 16v5h16v-5"
                    : "M19 12H5m5-5-5 5 5 5"
          }
        />
      )}
    </svg>
  );
}
