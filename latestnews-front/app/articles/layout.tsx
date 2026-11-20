import { HomeFooter } from "@/app/_components/home-footer";
import { HomeHeader } from "@/app/_components/home-header";

export default function ArticlesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <a className="skip" href="#content">
        Skip to content
      </a>
      <HomeHeader />
      <main id="content" className="wrap article-wrap">
        {children}
      </main>
      <HomeFooter />
    </>
  );
}
