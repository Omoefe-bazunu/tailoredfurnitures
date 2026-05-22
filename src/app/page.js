import React from "react";
import HomeHero from "@/components/home/HomeHero";
import HomeManifesto from "@/components/home/HomeManifesto";
import HomeCollections from "@/components/home/HomeCollections";
import HomeReviews from "@/components/home/HomeReviews";
import SplashLoader from "@/components/home/SplashLoader";

export default function Home() {
  return (
    // <main className="min-h-screen bg-background text-foreground transition-colors duration-500">
    <>
      <SplashLoader />
      <section>
        {/* 1. Immersive Hero Product Frame */}
        <HomeHero />

        {/* 2. Focused Brand Copy and Mission Breakdown */}
        <HomeManifesto />

        {/* 3. Luxury Collector Placements */}
        <HomeReviews />

        {/* 4. Segmented Entry Points (French vs. Italian) */}

        <HomeCollections />
      </section>
    </>
    // </main>
  );
}
