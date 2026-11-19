const bars = Array.from({ length: 90 }, (_, index) => 7 + ((index * 17 + 11) % 26));

export function AudioPlayer({ level }: { level: string }) {
  return <section className="player" aria-label="Article narration preview"><button className="play" type="button" disabled aria-label="Play narration — coming soon" title="Audio playback coming soon"><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="m8 5 11 7-11 7Z" /></svg></button><div className="track"><div className="track-head"><span>Listen to this article · {level}</span><button type="button" disabled aria-label="Narration speed — coming soon">1×</button></div><div className="wave" aria-hidden="true">{bars.map((height, index) => <i key={index} style={{ height: `${height / 16}rem` }} />)}</div><div className="track-times"><span>0:00</span><span>Audio coming soon</span></div></div></section>;
}
