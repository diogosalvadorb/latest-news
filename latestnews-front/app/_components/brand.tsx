import Link from "next/link";

export function Brand() {
  return <Link className="logo" href="/" aria-label="news home"><svg className="logo-symbol" viewBox="0 0 30 30" aria-hidden="true"><path d="M3 8h17M3 15h24M3 22h17" /></svg>news<span className="dot">.</span></Link>;
}
