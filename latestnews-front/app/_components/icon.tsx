import type { ReactNode } from "react";

const paths: Record<string, ReactNode> = {
  arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
  external: <path d="M14 4h6v6m0-6-9 9M10 4H4v16h16v-6" />,
  headphones: <path d="M4 14v-3a8 8 0 0 1 16 0v3M4 13h3v7H4a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1Zm16 0h-3v7h3a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1Z" />,
  search: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 4 4" /></>,
  close: <path d="m6 6 12 12M6 18 18 6" />,
  book: <path d="M12 5v16M12 5C8 2 3 3 3 3v16s5-1 9 2c4-3 9-2 9-2V3s-5-1-9 2Z" />,
};

export function Icon({ name }: { name: keyof typeof paths }) {
  return <svg className="ico" viewBox="0 0 24 24" aria-hidden="true">{paths[name]}</svg>;
}
