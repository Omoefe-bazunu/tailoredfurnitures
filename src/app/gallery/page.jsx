"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import ArtworkCard from "@/components/gallery/ArtWorkCard";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

const PAGE_SIZE = 20;

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const sentinelRef = useRef(null);

  useEffect(() => {
    const q = query(collection(db, "artworks"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setArtworks(items);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const filteredArtworks =
    activeFilter === "All"
      ? artworks
      : artworks.filter((item) => item.category === activeFilter);

  const visibleArtworks = filteredArtworks.slice(0, visibleCount);
  const hasMore = visibleCount < filteredArtworks.length;

  // Load next page when sentinel scrolls into view
  const handleObserver = useCallback(
    (entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setVisibleCount((prev) => prev + PAGE_SIZE);
      }
    },
    [hasMore],
  );

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0.1,
    });
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [handleObserver]);

  return (
    <main className="min-h-screen bg-background text-foreground py-16 px-6 md:px-12 lg:px-24 transition-colors duration-500 gallery-fade">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Page Context Branding Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-8 border-b border-foreground/5 pb-10">
          <div className="space-y-3">
            <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-primary flex items-center gap-4">
              <span className="inline-block w-4 h-[1px] bg-primary/40 shrink-0"></span>
              Exhibition Index
            </p>
            <h1 className="font-heading text-display-lg font-light leading-none">
              The Collection
            </h1>
          </div>

          {/* Dynamic Filter Controls */}
          <div className="flex flex-wrap items-center gap-2 border border-foreground/10 p-1 bg-card self-start md:self-auto">
            {["All", "Italian", "French"].map((filter) => (
              <button
                key={filter}
                onClick={() => {
                  setActiveFilter(filter);
                  setVisibleCount(PAGE_SIZE); // reset scroll window on filter change
                }}
                className={`px-5 py-2 text-[10px] font-body tracking-widest uppercase font-medium transition-all duration-300 ${
                  activeFilter === filter
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground/60 hover:text-foreground hover:bg-foreground/[0.02]"
                }`}
              >
                {filter} {filter === "All" ? "" : "School"}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="w-full text-center py-24 font-body text-xs tracking-widest uppercase text-muted animate-pulse">
            Loading collection data...
          </div>
        ) : visibleArtworks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {visibleArtworks.map((artwork) => (
              <ArtworkCard key={artwork.id} artwork={artwork} />
            ))}
          </div>
        ) : (
          <div className="w-full text-center py-24 border border-dashed border-foreground/10 text-muted font-body text-xs tracking-widest uppercase">
            No Data Found
          </div>
        )}

        {/* Infinite scroll sentinel */}
        <div ref={sentinelRef} className="w-full flex justify-center py-8">
          {hasMore && (
            <span className="text-[9px] tracking-widest uppercase text-muted/40 font-body animate-pulse">
              Loading more...
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-foreground/5 pt-8 text-[9px] tracking-widest uppercase text-muted/60">
          <p>
            Showing {visibleArtworks.length} of {filteredArtworks.length}{" "}
            Masterpieces
          </p>
        </div>
      </div>
    </main>
  );
}
