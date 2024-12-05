import { Gallery } from "./_client";
import Header from "./components/Header";
import Hero from "./components/Hero";


type PageProps = {
  searchParams: {
    [key: string]: undefined | string | string[];
  };
};

export default async function Home({searchParams} : PageProps) {
  const query = searchParams.q || '';
  return (
    <>
      <Header />
      <Hero />
      <Gallery query={query} />
    </>
  );
}
