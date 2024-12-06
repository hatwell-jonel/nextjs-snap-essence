import { Suspense } from 'react';
import { BackToTopButton, Gallery } from "./_client";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";


type PageProps = {
  searchParams: {
    [key: string]: undefined | string | string[];
  };
};

export default function Home({searchParams} : PageProps) {

  const query = searchParams.q || '';
  return (
    <>
      <Header />
      <Hero />
      <Suspense  fallback={<div>Loading...</div>}>
        <Gallery query={query} />
      </Suspense>
      <BackToTopButton />
      <Footer/>
    </>
  );
}
