import { Brand } from "./brand";
import { Icon } from "./icon";

export function HomeHeader() {
  return <header className="header"><div className="wrap"><Brand /><nav className="nav" aria-label="Main navigation"><a href="#articles" className="current" aria-current="page">Articles</a><a href="#reading-guide">Reading levels</a><button className="btn admin-button" type="button" disabled title="Admin workspace will be available in a future release"><span className="admin-full">Admin workspace</span><span className="admin-short">Admin</span><Icon name="external" /></button></nav></div></header>;
}
