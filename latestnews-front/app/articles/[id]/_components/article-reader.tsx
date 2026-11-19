"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Article } from "@/lib/articles";
import { Icon } from "@/app/_components/icon";
import { AudioPlayer } from "./audio-player";

function levelName(level: number) {
  return level === 1 ? "Basic" : level === 2 ? "Advanced" : `Level ${level}`;
}

export function ArticleReader({ article }: { article: Article }) {
  const [level, setLevel] = useState(article.levels[0]?.level ?? 1);
  const [largeText, setLargeText] = useState(false);
  const text = article.levels.find((item) => item.level === level)?.text ?? "";
  const paragraphs = text.split(/\r?\n\s*\r?\n|\r?\n/).filter((paragraph) => paragraph.trim());
  const summary = article.description.match(/^.*?[.!?](?:\s|$)/)?.[0]?.trim() ?? article.description.slice(0, 180);


  return <>
    <nav className="crumb" aria-label="Breadcrumb"><Link href="/"><span className="back-arrow"><Icon name="arrow" /></span>All articles</Link>{article.category && <><span aria-hidden="true">/</span><span>{article.category}</span></>}</nav>
    <div className="article-layout">
      <article className="article-main">
        <header className="article-top"><h1>{article.title}</h1>{summary && <p className="lead">{summary}</p>}<div className="byline"><time dateTime={article.createdAt}>{new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeZone: "UTC" }).format(new Date(article.createdAt))}</time></div></header>
        {article.imageUrl && <div className="cover article-cover"><Image src={article.imageUrl} alt={article.imageAlt} fill sizes="(max-width: 960px) 100vw, 760px" priority unoptimized={!article.imageUrl.startsWith("/")} /></div>}
        <div className="reading-toolbar"><div className="tabs" role="group" aria-label="Reading level">{article.levels.map((item) => <button key={item.level} type="button" className={item.level === level ? "active" : ""} aria-pressed={item.level === level} aria-controls="article-text" onClick={() => setLevel(item.level)}><span className="tab-prefix">{String(item.level).padStart(2, "0")}</span>{levelName(item.level)}</button>)}</div><div className="reader-actions"><button type="button" aria-label="Increase text size" aria-pressed={largeText} onClick={() => setLargeText((value) => !value)}>Aa</button></div></div>
        <AudioPlayer level={levelName(level)} />
        <div id="article-text" className={`article-body ${largeText ? "article-body-large" : ""}`} lang="pt-BR">{paragraphs.length ? paragraphs.map((paragraph, index) => <p key={`${level}-${index}`}>{paragraph}</p>) : <p>No text is available for this reading level.</p>}</div>
        <div className="article-next"><Link className="btn text" href="/"><span className="back-arrow"><Icon name="arrow" /></span>Back to articles</Link></div>
      </article>
      <aside className="article-aside" id="reading-guide"><div className="panel"><div className="eyebrow article-level-label">Your reading level</div><h2>{level === 1 ? "The essentials, made clear" : "A little deeper, a broader view"}</h2><p>{level === 1 ? "Short sentences and accessible language to understand the key ideas." : "More context and richer vocabulary to explore the story."}</p><div className="rule" /><div className="list"><span><b>01</b>Read the article</span><span><b>02</b>Explore the ideas</span><span><b>03</b>Try the other level</span></div></div><p className="article-aside-note">One article, two perspectives. Switch levels anytime to change the text.</p></aside>
    </div>
  </>;
}
