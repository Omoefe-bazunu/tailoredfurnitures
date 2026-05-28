"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  limit,
} from "firebase/firestore";

export default function HomeHero() {
  const [featuredItem, setFeaturedItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Queries the artworks collection for the item flagged as true for featured status
    const q = query(
      collection(db, "artworks"),
      where("featured", "==", true),
      limit(1),
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const docData = snapshot.docs[0];
        setFeaturedItem({ id: docData.id, ...docData.data() });
      } else {
        setFeaturedItem(null); // Fallback layout tracking trigger
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <section className="w-full min-h-[calc(100vh-80px)] flex items-center justify-center bg-background">
        <p className="font-body text-xs tracking-widest uppercase text-muted animate-pulse">
          Loading highlight piece...
        </p>
      </section>
    );
  }

  // 100% Fail-Safe Fallback Block: Ensures the page handles empty collections gracefully
  const activeItem = featuredItem || {
    name: "Aurelio Vento",
    slug: "aurelio-vento",
    bio: "A sculptural tribute to invisible wind currents moving through ancient stone corridors along the Amalfi coast. Crafted to absolute structural precision and strict attention to structural micro-details.",
    price: 9500,
    imageUrl: "/image1.jpg",
  };

  return (
    <section className="relative w-full min-h-[calc(100vh-80px)] flex items-center px-6 md:px-12 lg:px-24 py-12 overflow-hidden bg-background transition-colors duration-500">
      {/* Organic Faded Zebra Stripe Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015] dark:opacity-[0.025] mix-blend-normal select-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25'%3E%3Cdefs%3E%3Cpattern id='zebra' width='120' height='120' patternUnits='userSpaceOnUse'%3E%3Cpath d='M0,20 Q30,15 60,35 T120,20 L120,35 Q90,50 60,30 T0,45 Z M0,70 Q40,85 80,60 T120,75 L120,90 Q80,75 40,95 T0,85 Z' fill='%23888888'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23zebra)'/%3E%3C/svg%3E")`,
          backgroundSize: "240px 240px",
        }}
      />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Hero Context Details */}
        <div className="lg:col-span-6 space-y-6 z-10">
          <div className="text-[10px] font-medium uppercase tracking-[0.35em] text-muted flex items-center gap-4">
            <span className="inline-block w-6 h-[1px] bg-muted/40 shrink-0"></span>
            Signature Exhibition
          </div>

          <h1 className="font-heading text-display-xl font-light leading-none">
            {activeItem.name}
          </h1>

          <p className="font-body font-light whitespace-pre-wrap text-body-premium text-muted max-w-xl leading-relaxed">
            {activeItem.bio}
          </p>

          <div className="pt-0 sm:pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="flex flex-col">
              <span className="text-[9px] tracking-widest uppercase text-muted/60 mb-1">
                Amount
              </span>
              <span className="font-body text-2xl font-light tracking-wide">
                ${Number(activeItem.price).toLocaleString()}
              </span>
            </div>

            <div className="flex flex-row items-center gap-3">
              <Link href="/gallery" className="btn-luxury">
                <ArrowRight className="w-3.5 h-3.5 mr-1" /> GALLERY
              </Link>
              <Link
                href={`/gallery/${activeItem.slug}`}
                className="btn-luxury-outline"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>

        {/* Hero Framed Masterpiece Container */}
        <div className="lg:col-span-6 w-full flex justify-center lg:justify-end z-10">
          <div className="w-full max-w-[440px] aspect-[3/4] premium-frame bg-card p-6 relative group shadow-2xl">
            <div className="absolute inset-0 border border-foreground/10 pointer-events-none m-3"></div>

            <div className="w-full h-full border border-foreground/5 bg-card overflow-hidden relative flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-foreground/[0.03] pointer-events-none z-10"></div>

              {activeItem.imageUrl && (
                <Image
                  src={activeItem.imageUrl}
                  alt={activeItem.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 440px"
                  className="object-cover transform transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Atmospheric Shading Spot Accent */}
      <div className="absolute right-0 top-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>
    </section>
  );
}
