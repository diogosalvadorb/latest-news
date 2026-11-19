import { Icon } from "./icon";

export function ReadingGuide() {
  return <section className="panel guide" id="reading-guide" aria-labelledby="guide-title"><div className="eyebrow">Two reading levels</div><h2 id="guide-title">The same story.<br />A different depth.</h2><p>Choose the version that works for you inside every article.</p><div className="rule" />{[{ name: "Basic", text: "Short sentences and the essential ideas." }, { name: "Advanced", text: "More context and richer vocabulary." }].map((level, index) => <div className="guide-level" key={level.name}><span className="num">0{index + 1}</span><div><h3>{level.name}</h3><p>{level.text}</p></div></div>)}<div className="callout"><Icon name="headphones" /><span>Text and narration change together when you switch levels.</span></div></section>;
}
