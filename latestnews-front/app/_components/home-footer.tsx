import { Brand } from "./brand";

export function HomeFooter() {
  return <footer className="footer"><div className="wrap"><div><Brand /><span>Read at your level.</span></div><div className="right">© 2026 news<details><summary>Image credits</summary><p><a href="https://commons.wikimedia.org/wiki/File:Coffee-desk-laptop-notebook_(24244320481).jpg" target="_blank" rel="noreferrer">Desk</a> · <a href="https://commons.wikimedia.org/wiki/File:Tree_in_a_Quebec_City_park.jpg" target="_blank" rel="noreferrer">Park tree</a> · <a href="https://commons.wikimedia.org/wiki/File:Stack_of_multicolored_books_on_a_table.jpg" target="_blank" rel="noreferrer">Books</a> — Wikimedia Commons, CC0.</p></details></div></div></footer>;
}
