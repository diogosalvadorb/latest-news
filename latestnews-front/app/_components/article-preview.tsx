"use client";

import { useEffect, useRef, useState } from "react";
import type { Article } from "@/lib/articles";
import { Icon } from "./icon";

export function ArticlePreview({ article, onClose }: { article: Article; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [level, setLevel] = useState(article.levels[0]?.level ?? 1);
  const text = article.levels.find((item) => item.level === level)?.text;

  useEffect(() => {
    const element = dialog.current;
    if (element && !element.open) element.showModal();
  }, []);

  return <dialog className="article-preview" ref={dialog} onClose={onClose} onClick={(event) => { if (event.target === event.currentTarget) onClose(); }} aria-labelledby="preview-title"><div className="preview-head"><span className="eyebrow">{article.category ?? "Article"}</span><button className="icon-button" onClick={onClose} aria-label="Close article"><Icon name="close" /></button></div><h2 id="preview-title">{article.title}</h2><div className="filters preview-levels" aria-label="Reading level">{article.levels.map((item) => <button key={item.level} className={`filter ${level === item.level ? "active" : ""}`} aria-pressed={level === item.level} onClick={() => setLevel(item.level)}>{item.level === 1 ? "Basic" : item.level === 2 ? "Advanced" : `Level ${item.level}`}</button>)}</div><p className="preview-text">{text || article.description}</p>{!text && <p className="preview-note">Design preview. Full articles and narration will be available when connected to the API.</p>}</dialog>;
}
