"use client";

import React, { useState } from "react";
import ArtworkCard from "@/components/gallery/ArtWorkCard";

export default function Gallery() {
  // Current filtering selection context state
  const [activeFilter, setActiveFilter] = useState("All");

  // 8 Initialized Curated Mock Records mapped precisely from your portfolio manifest
  const exhibitionData = [
    {
      id: "01",
      slug: "aurelio-vento",
      name: "Aurelio Vento",
      category: "Italian",
      price: 9500,
      bio: "A sculptural tribute to invisible wind currents moving through ancient stone corridors along the Amalfi coast.",
      imageUrl: "/image1.jpg", // Put your Italian Fluidity asset path here (e.g., "/test1.png")
      hasVideo: true, // This piece has an associated motion capture video showcasing its dynamic qualities
    },
    {
      id: "02",
      slug: "maison-de-lumiere",
      name: "Maison de Lumière",
      category: "French",
      price: 6450,
      bio: "Inspired by the glow of candlelight reflecting through Parisian cathedral windows during winter evenings.",
      imageUrl: "/image2.jpg", // Put your French Sacred Geometry asset path here (e.g., "/test2.png")
      hasVideo: true, // This piece does not have a video component
    },
    {
      id: "03",
      slug: "celestino-mare",
      name: "Celestino Mare",
      category: "Italian",
      price: 14350,
      bio: "A piece that captures the rhythm of moonlit Mediterranean tides frozen in motion.",
      imageUrl: "/image3.jpeg", // Put your Biomorphic Coastal Luxury asset path here (e.g., "/test3.png")
      hasVideo: true, // This piece has an associated motion capture video showcasing its dynamic qualities
    },
    {
      id: "04",
      slug: "eclipse-royale",
      name: "Éclipse Royale",
      category: "French",
      price: 9480,
      bio: "Born from the idea of an eclipse hovering above a forgotten royal palace.",
      imageUrl: "",
      hasVideo: true, // This piece has an associated motion capture video showcasing its dynamic qualities
    },
    {
      id: "05",
      slug: "vittorio-nebbia",
      name: "Vittorio Nebbia",
      category: "Italian",
      price: 12350,
      bio: "Represents mist moving silently across ancient Italian mountains before sunrise.",
      imageUrl: "",
      hasVideo: true, // This piece has an associated motion capture video showcasing its dynamic qualities
    },
    {
      id: "06",
      slug: "fleur-nocturne",
      name: "Fleur Nocturne",
      category: "French",
      price: 18300,
      bio: "A midnight bloom imagined in a futuristic Paris garden untouched by time.",
      imageUrl: "",
      hasVideo: true, // This piece has an associated motion capture video showcasing its dynamic qualities
    },
    {
      id: "07",
      slug: "lucien-d-or",
      name: "Lucien d'Or",
      category: "French",
      price: 5450,
      bio: "A golden-memory sculpture inspired by forgotten aristocratic halls.",
      imageUrl: "",
      hasVideo: true, // This piece has an associated motion capture video showcasing its dynamic qualities
    },
    {
      id: "08",
      slug: "siena-profonda",
      name: "Siena Profonda",
      category: "Italian",
      price: 7800,
      bio: "Inspired by hidden tunnels beneath ancient Tuscan cities.",
      imageUrl: "",
      hasVideo: true, // This piece has an associated motion capture video showcasing its dynamic qualities
    },
  ];

  // Logic filter processing computed dynamically on state variation
  const filteredArtworks =
    activeFilter === "All"
      ? exhibitionData
      : exhibitionData.filter((item) => item.category === activeFilter);

  return (
    <main className="min-h-screen bg-background text-foreground py-16 px-6 md:px-12 lg:px-24 transition-colors duration-500 gallery-fade">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Page Context Branding Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-8 border-b border-foreground/5 pb-10">
          <div className="space-y-3">
            <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-primary flex items-center gap-4">
              <span className="inline-block w-4 h-[1px] bg-primary/40 shrink-0"></span>
              Studio Exhibition Index
            </p>
            <h1 className="font-heading text-display-lg font-light leading-none">
              The Collection
            </h1>
          </div>

          {/* Premium Filter Pipeline Navigation Controls */}
          <div className="flex items-center gap-2 border border-foreground/10 p-1 bg-card self-start md:self-auto">
            {["All", "Italian", "French"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
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

        {/* The Clean Gallery Grid Workspace Layout */}
        {filteredArtworks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-8 md:gap-10">
            {filteredArtworks.map((artwork) => (
              <ArtworkCard key={artwork.id} artwork={artwork} />
            ))}
          </div>
        ) : (
          <div className="w-full text-center py-24 border border-dashed border-foreground/10 text-muted font-body text-xs tracking-widest uppercase">
            No dynamic components found matching this structural partition.
          </div>
        )}

        {/* Index Page Meta Counter Footer */}
        <div className="border-t border-foreground/5 pt-8 grid grid-cols-1 lg:grid-cols-2 gap-4 justify-between items-center text-[9px] tracking-widest uppercase text-muted/60">
          <p>
            Showing {filteredArtworks.length} of {exhibitionData.length}{" "}
            Masterpieces
          </p>
          <p>Framed Wall Art | 100 System Manifest</p>
        </div>
      </div>
    </main>
  );
}
