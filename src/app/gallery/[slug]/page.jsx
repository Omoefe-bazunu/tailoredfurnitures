"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Plus,
  Minus,
  ShoppingBag,
  ArrowLeft,
  Play,
  ShieldCheck,
  Truck,
  Maximize2,
  X,
  Check,
} from "lucide-react";

import { useCart } from "@/context/CartContext"; // Hooked state architecture
import ArtworkReviews from "@/components/gallery/ArtWorkReviews";
import ArtworkRelated from "@/components/gallery/ArtWorkRelated";
import Link from "next/link";

export default function ArtworkDetail() {
  const { addToCart } = useCart(); // Destructure state dispatcher
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  // 1. Master Portfolio Manifest containing architectural specifications
  const masterCollection = [
    {
      id: "01",
      slug: "aurelio-vento",
      name: "Aurelio Vento",
      category: "Italian",
      price: 9500,
      bio: "A sculptural tribute to invisible wind currents moving through ancient stone corridors along the Amalfi coast.",
      imageUrl: "/image1.jpg",
      videoUrl: "/imagevideo.mp4", // Populate with your actual hosted MP4 file path when ready
      dimensions: '48" x 60" x 3.5"',
      weight: "14 kg",
      reviews: [
        {
          reviewer: "Julian V.",
          role: "Architectural Lead",
          text: "The deep shadow play under twilight gallery illumination completely anchors our living space layout.",
        },
        {
          reviewer: "Sophia K.",
          role: "Fine Art Collector",
          text: "Exceptional ribbon precision. A masterful interpretation of organic movement through premium walnut timber.",
        },
      ],
    },
    {
      id: "02",
      slug: "maison-de-lumiere",
      name: "Maison de Lumière",
      category: "French",
      price: 6450,
      bio: "Inspired by the glow of candlelight reflecting through Parisian cathedral windows during winter evenings.",
      imageUrl: "/image2.jpg",
      videoUrl: "",
      dimensions: '40" x 52" x 2.8"',
      weight: "11 kg",
      reviews: [
        {
          reviewer: "Chantal L.",
          role: "Interior Designer",
          text: "Brings an ethereal Parisian cathedral atmosphere right into the interior foyer. Spectacular layering.",
        },
      ],
    },
    {
      id: "03",
      slug: "celestino-mare",
      name: "Celestino Mare",
      category: "Italian",
      price: 14350,
      bio: "A piece that captures the rhythm of moonlit Mediterranean tides frozen in motion.",
      imageUrl: "/image3.jpg",
      videoUrl: "",
      dimensions: '56" x 72" x 4.2"',
      weight: "19 kg",
      reviews: [
        {
          reviewer: "Matteo S.",
          role: "Private Resident",
          text: "The biomorphic contours look deeply hypnotic. Unmatched craftsmanship.",
        },
      ],
    },
    {
      id: "04",
      slug: "eclipse-royale",
      name: "Éclipse Royale",
      category: "French",
      price: 9480,
      bio: "Born from the idea of an eclipse hovering above a forgotten royal palace.",
      imageUrl: "",
      videoUrl: "",
      dimensions: '48" Diameter x 3.0"',
      weight: "13 kg",
      reviews: [],
    },
  ];

  // 2. Fallback Router Route Matcher Simulation
  const currentSlug = "aurelio-vento";
  const artwork =
    masterCollection.find((item) => item.slug === currentSlug) ||
    masterCollection[0];

  // Filter recommendations to avoid rendering the active selection
  const relatedItems = masterCollection
    .filter((item) => item.id !== artwork.id)
    .slice(0, 3);

  const adjustQuantity = (type) => {
    if (type === "plus") setQuantity((prev) => prev + 1);
    if (type === "minus" && quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleAddToCart = () => {
    addToCart(artwork, quantity); // Dispatch selected item parameters dynamically
    setAddedToCart(true);
  };

  return (
    <main className="min-h-screen bg-background text-foreground py-12 px-6 md:px-12 lg:px-24 transition-colors duration-500 gallery-fade relative">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Dynamic Navigation Context Exit Trigger */}
        <Link
          href="/gallery"
          className="inline-flex items-center gap-2 font-body text-[10px] tracking-widest uppercase text-muted hover:text-foreground transition-colors group w-fit"
        >
          <ArrowLeft className="w-3.5 h-3.5 transform transition-transform group-hover:-translate-x-1" />
          Back to Exhibition Index
        </Link>

        {/* Core Specification Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Visual Showcase Box (Optimized Image / Video Slots) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="w-full aspect-[3/4] premium-frame bg-foreground/[0.02] p-6 relative shadow-xl group">
              <div className="absolute inset-0 border border-foreground/10 pointer-events-none m-3"></div>

              <div className="w-full h-full border border-foreground/5 bg-card overflow-hidden relative flex items-center justify-center">
                {artwork.imageUrl && !isPlayingVideo ? (
                  /* Native blank target anchor to force a raw fullscreen tab expansion */
                  <a
                    href={artwork.imageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-full relative block cursor-zoom-in"
                    title="Open full resolution masterpiece asset in new tab"
                  >
                    <Image
                      src={artwork.imageUrl}
                      alt={`${artwork.name} - Luxury Wood Relief`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      priority
                    />
                    {/* Subtle floating expand indicator */}
                    <div className="absolute top-4 right-4 z-30 bg-background/85 backdrop-blur-sm p-2 border border-foreground/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Maximize2 className="w-3.5 h-3.5 text-foreground/70" />
                    </div>
                  </a>
                ) : isPlayingVideo && artwork.videoUrl ? (
                  <div className="w-full h-full relative bg-black">
                    <video
                      src={artwork.videoUrl}
                      className="w-full h-full object-cover"
                      autoPlay
                      controls
                      loop
                      controlsList="nodownload"
                      onContextMenu={(e) => e.preventDefault()}
                    />
                    <button
                      onClick={() => setIsPlayingVideo(false)}
                      className="absolute top-4 right-4 z-40 bg-background/90 backdrop-blur-md text-foreground border border-foreground/10 px-3 py-1.5 font-body text-[9px] tracking-widest uppercase font-medium shadow-md hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                    >
                      Return to Frame
                    </button>
                  </div>
                ) : (
                  /* Alternate State Handler for Empty Render Frameworks */
                  <div className="w-full h-full relative flex flex-col items-center justify-center bg-foreground/[0.02] p-8">
                    {isPlayingVideo ? (
                      <div className="text-center space-y-4">
                        <div className="text-center opacity-40 space-y-2">
                          <p className="font-heading italic text-xl">
                            {artwork.name} Studio Media Stream
                          </p>
                          <p className="font-body text-[9px] tracking-widest uppercase">
                            [ Streaming Active Video Asset ]
                          </p>
                        </div>
                        <button
                          onClick={() => setIsPlayingVideo(false)}
                          className="mx-auto block bg-foreground text-background px-4 py-2 font-body text-[9px] tracking-widest uppercase font-medium hover:opacity-80 transition-opacity"
                        >
                          Return to Still Frame
                        </button>
                      </div>
                    ) : (
                      <div className="text-center opacity-30 space-y-2">
                        <p className="font-heading italic text-xl">
                          {artwork.name} Studio Asset Representation
                        </p>
                        <p className="font-body text-[9px] tracking-widest uppercase">
                          [ Mapping Active Placeholder ]
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Video Playback Trigger Activation Interface */}
                {artwork.videoUrl && !isPlayingVideo && (
                  <button
                    onClick={() => setIsPlayingVideo(true)}
                    className="absolute bottom-6 left-6 bg-background/90 backdrop-blur-md px-4 py-2.5 border border-foreground/10 flex items-center gap-2 font-body text-[9px] tracking-widest uppercase font-semibold hover:bg-primary hover:text-primary-foreground transition-colors z-30 shadow-lg"
                  >
                    <Play className="w-3 h-3 fill-current stroke-none " /> WATCH
                    VIDEO DEMO
                  </button>
                )}

                {/* Visual test trigger when videoUrl string is empty */}
                {!artwork.videoUrl && !isPlayingVideo && (
                  <button
                    onClick={() => setIsPlayingVideo(true)}
                    className="absolute bottom-6 left-6 bg-background/90 backdrop-blur-md px-4 py-2.5 border border-foreground/10 flex items-center gap-2 font-body text-[9px] tracking-widest uppercase font-semibold hover:bg-primary hover:text-primary-foreground transition-colors z-30 shadow-lg"
                  >
                    <Play className="w-3 h-3 fill-current stroke-none" />{" "}
                    Simulate Video Playback (Test)
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Pricing, Specifications, and Checkout Actions Controls Panel */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
            <div className="space-y-4">
              <div className="text-[10px] font-medium uppercase tracking-[0.35em] text-primary flex items-center gap-4">
                <span className="inline-block w-4 h-[1px] bg-primary/40 shrink-0"></span>
                {artwork.category} School Framework | Item {artwork.id}
              </div>
              <h1 className="font-heading text-display-lg font-light tracking-tight leading-none">
                {artwork.name}
              </h1>
              <p className="font-body text-2xl font-light tracking-wide">
                ${artwork.price.toLocaleString()}
              </p>
            </div>

            <div className="w-full h-[1px] bg-foreground/5"></div>

            {/* Narrative Bio */}
            <div className="space-y-3">
              <p className="font-body text-[10px] tracking-widest uppercase text-muted font-medium">
                Artistic Narrative
              </p>
              <p className="font-body font-light text-sm text-muted leading-relaxed">
                {artwork.bio}
              </p>
            </div>

            {/* Technical Dimensional Framework Specifications */}
            <div className="grid grid-cols-2 gap-4 font-body text-[11px] p-4 bg-foreground/[0.01] border border-foreground/5">
              <div>
                <span className="block text-muted/60 uppercase text-[9px] tracking-wider mb-0.5">
                  Physical Scope
                </span>
                <span className="text-foreground font-light">
                  {artwork.dimensions}
                </span>
              </div>
              <div>
                <span className="block text-muted/60 uppercase text-[9px] tracking-wider mb-0.5">
                  Net Mass
                </span>
                <span className="text-foreground font-light">
                  {artwork.weight}
                </span>
              </div>
            </div>

            {/* Quantity Selector Counter & Add Funnel */}
            <div className="space-y-4 pt-2">
              <p className="font-body text-[10px] tracking-widest uppercase text-muted font-medium">
                Select Allocation Quantity
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4">
                <div className="flex items-center justify-center border border-foreground/20 bg-card h-14">
                  <button
                    onClick={() => adjustQuantity("minus")}
                    className="px-4 h-full text-foreground/60 hover:text-foreground hover:bg-foreground/[0.02] transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-6 font-body text-sm font-light w-16 text-center select-none">
                    {quantity}
                  </span>
                  <button
                    onClick={() => adjustQuantity("plus")}
                    className="px-4 h-full text-foreground/60 hover:text-foreground hover:bg-foreground/[0.02] transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="btn-luxury flex-grow h-14"
                >
                  <ShoppingBag className="w-4 h-4 mr-2 stroke-[1.5]" />
                  Add to Cart
                </button>
              </div>
            </div>

            {/* Warranties Panel */}
            <div className="space-y-2 pt-2 border-t border-foreground/5 font-body text-[10px] tracking-wider uppercase text-muted/80">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-primary" />{" "}
                Museum-Grade Protective Crating Ensured
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-3.5 h-3.5 text-primary" /> Insured Secure
                Air Freight Logistics Available
              </div>
            </div>
          </div>
        </div>

        {/* 3. Injected Reviews Component Node */}
        <ArtworkReviews reviews={artwork.reviews} />

        {/* 4. Injected Recommendations Component Node */}
        <ArtworkRelated items={relatedItems} />
      </div>

      {/* ──────────────────────────────────────────────────────────────────────
         MINIMALIST ADDED TO CART CONFIRMATION PORTAL MODAL
         ────────────────────────────────────────────────────────────────────── */}
      {addedToCart && (
        <div className="fixed inset-0 z-[100] bg-background/90 backdrop-blur-sm flex items-center justify-center p-6 gallery-fade">
          <div className="w-full max-w-sm bg-card border border-foreground/10 p-6 relative shadow-2xl space-y-6">
            <div className="absolute inset-0 border border-foreground/5 pointer-events-none m-2"></div>

            <button
              onClick={() => setAddedToCart(false)}
              className="absolute top-4 right-4 text-muted hover:text-foreground transition-colors"
              aria-label="Dismiss Modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 border border-primary/20 bg-primary/5 rounded-full flex items-center justify-center shrink-0">
                <Check className="w-4 h-4 text-primary stroke-[2.5]" />
              </div>
              <div className="space-y-1 pt-1">
                <h3 className="font-heading text-lg font-light tracking-tight text-foreground">
                  {artwork.name} added to cart
                </h3>
                <p className="font-body text-xs text-muted leading-relaxed">
                  {quantity}x &ldquo;{artwork.name}&rdquo; added to cart
                  successully. You may continue browsing or proceed to checkout
                  to finalize your order.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 font-body text-[10px] tracking-widest uppercase font-semibold">
              <button
                onClick={() => setAddedToCart(false)}
                className="h-11 border border-foreground/20 hover:border-foreground bg-transparent text-foreground transition-colors text-center"
              >
                Add More
              </button>
              <Link
                href="/cart"
                className="btn-luxury h-11 flex items-center justify-center text-center"
              >
                Open Cart
              </Link>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
