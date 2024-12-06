'use client'

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';  // Import the hook to get query params
import { BackToTopButton, Gallery } from "./_client";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";

export default function Home() {
  const searchParams = useSearchParams();  // Get the query parameters
  const [query, setQuery] = useState('');

  useEffect(() => {
    const q = searchParams.get('q');  // Get the value of "q" from URL
    setQuery(q || '');  // If "q" is present, set it, otherwise default to empty string
  }, [searchParams]);

  return (
    <>
      <Header />
      <Hero />
      <Suspense fallback={<div>Loading...</div>}>
        <Gallery query={query} />
      </Suspense>
      <BackToTopButton />
      <Footer />
    </>
  );
}
