"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
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
import { useCart } from "@/context/CartContext";
import ArtworkReviews from "@/components/gallery/ArtWorkReviews";
import ArtworkRelated from "@/components/gallery/ArtWorkRelated";
import Link from "next/link";

// Helper to safely call TikTok Pixel
const trackTikTok = (event: string, data: any) => {
  if (typeof window !== "undefined" && (window as any).ttq) {
    (window as any).ttq.track(event, data);
  }
};

export default function ArtworkDetail() {
  const params = useParams();
  const { addToCart } = useCart();
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  useEffect(() => {
    if (!params?.slug) return;
    const q = query(
      collection(db, "artworks"),
      where("slug", "==", params.slug),
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        setArtwork({ id: snapshot.docs[0].id, ...snapshot.docs[0].data() });
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [params?.slug]);

  // ========== TIKTOK: ViewContent ==========
  useEffect(() => {
    if (!artwork) return;

    trackTikTok("ViewContent", {
      contents: [
        {
          content_id: artwork.id,
          content_type: "product",
          content_name: artwork.name,
        },
      ],
      value: Number(artwork.price),
      currency: "USD",
    });
  }, [artwork]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-body text-xs tracking-widest uppercase text-muted animate-pulse">
        Loading specifications profile...
      </div>
    );
  }

  if (!artwork) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4 font-body text-xs uppercase tracking-widest text-muted">
        <p>Masterpiece document record not found</p>
        <Link
          href="/gallery"
          className="underline hover:text-foreground transition-colors"
        >
          Return to index
        </Link>
      </div>
    );
  }

  // ========== TIKTOK: AddToCart ==========
  const handleAddToCart = () => {
    addToCart(artwork, quantity);
    setAddedToCart(true);

    trackTikTok("AddToCart", {
      contents: [
        {
          content_id: artwork.id,
          content_type: "product",
          content_name: artwork.name,
        },
      ],
      value: Number(artwork.price) * quantity,
      currency: "USD",
    });
  };

  return (
    <main className="min-h-screen bg-background text-foreground py-12 px-6 md:px-12 lg:px-24 transition-colors duration-500 gallery-fade relative">
      <div className="max-w-7xl mx-auto space-y-8">
        <Link
          href="/gallery"
          className="inline-flex items-center gap-2 font-body text-[10px] tracking-widest uppercase text-muted hover:text-foreground transition-colors group w-fit"
        >
          <ArrowLeft className="w-3.5 h-3.5 transform transition-transform group-hover:-translate-x-1" />
          Back to Exhibition Index
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Visual Showcase Block */}
          <div className="lg:col-span-7 space-y-6">
            <div className="w-full aspect-[3/4] premium-frame bg-foreground/[0.02] p-6 relative shadow-xl group">
              <div className="absolute inset-0 border border-foreground/10 pointer-events-none m-3"></div>
              <div className="w-full h-full border border-foreground/5 bg-card overflow-hidden relative flex items-center justify-center">
                {artwork.imageUrl && !isPlayingVideo ? (
                  <a
                    href={artwork.imageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-full relative block cursor-zoom-in"
                  >
                    <Image
                      src={artwork.imageUrl}
                      alt={artwork.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      priority
                    />
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
                      className="absolute top-4 right-4 z-40 bg-background/90 backdrop-blur-md text-foreground border border-foreground/10 px-3 py-1.5 font-body text-[9px] tracking-widest uppercase font-medium shadow-md transition-colors duration-300"
                    >
                      Return to Frame
                    </button>
                  </div>
                ) : (
                  <div className="w-full h-full relative flex flex-col items-center justify-center bg-foreground/[0.02] p-8">
                    <p className="font-heading italic text-xl opacity-30">
                      {artwork.name}
                    </p>
                  </div>
                )}

                {artwork.videoUrl && !isPlayingVideo && (
                  <button
                    onClick={() => setIsPlayingVideo(true)}
                    className="absolute bottom-6 left-6 bg-background/90 backdrop-blur-md px-4 py-2.5 border border-foreground/10 flex items-center gap-2 font-body text-[9px] tracking-widest uppercase font-semibold hover:bg-primary hover:text-primary-foreground transition-colors z-30 shadow-lg"
                  >
                    <Play className="w-3 h-3 fill-current stroke-none" /> WATCH
                    VIDEO DEMO
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Details Content Box */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
            <div className="space-y-4">
              <div className="text-[10px] font-medium uppercase tracking-[0.35em] text-primary flex items-center gap-4">
                <span className="inline-block w-4 h-[1px] bg-primary/40 shrink-0"></span>
                {artwork.category} School Framework
              </div>
              <h1 className="font-heading text-display-lg font-light tracking-tight leading-none">
                {artwork.name}
              </h1>
              <p className="font-body text-2xl font-light tracking-wide">
                ${Number(artwork.price).toLocaleString()}
              </p>
            </div>

            <div className="w-full h-[1px] bg-foreground/5"></div>
            <div className="space-y-3">
              <p className="font-body text-[10px] tracking-widest uppercase text-muted font-medium">
                Artistic Narrative
              </p>
              <p className="font-body whitespace-pre-wrap font-light text-sm text-muted leading-relaxed">
                {artwork.bio}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 font-body text-[11px] p-4 bg-foreground/[0.01] border border-foreground/5">
              <div>
                <span className="block text-muted/60 uppercase text-[9px] tracking-wider mb-0.5">
                  Physical Scope
                </span>
                <span className="text-foreground font-light">
                  {artwork.dimensions || "Custom Matrix"}
                </span>
              </div>
              <div>
                <span className="block text-muted/60 uppercase text-[9px] tracking-wider mb-0.5">
                  Net Mass
                </span>
                <span className="text-foreground font-light">
                  {artwork.weight || "Assessed Variable"}
                </span>
              </div>
            </div>

            {/* Cart Controller Integration Hook */}
            <div className="space-y-4 pt-2">
              <p className="font-body text-[10px] tracking-widest uppercase text-muted font-medium">
                Select Quantity
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4">
                <div className="flex items-center justify-center border border-foreground/20 bg-card h-14">
                  <button
                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                    className="px-4 h-full text-foreground/60 hover:text-foreground transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-6 font-body text-sm font-light w-16 text-center select-none">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 h-full text-foreground/60 hover:text-foreground transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="btn-luxury flex-grow h-14"
                >
                  <ShoppingBag className="w-4 h-4 mr-2 stroke-[1.5]" /> Add to
                  Cart
                </button>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-foreground/5 font-body text-[10px] tracking-wider uppercase text-muted/80">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-primary" /> Protective
                Crating Ensured
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-3.5 h-3.5 text-primary" /> Insured Secure
                Logistics Available
              </div>
            </div>
          </div>
        </div>

        <ArtworkReviews reviews={artwork.reviews || []} />
        <ArtworkRelated items={[]} />
      </div>

      {/* Success Modal */}
      {addedToCart && (
        <div className="fixed inset-0 z-[100] bg-background/90 backdrop-blur-sm flex items-center justify-center p-6 gallery-fade">
          <div className="w-full max-w-sm bg-card border border-foreground/10 p-6 relative shadow-2xl space-y-6">
            <button
              onClick={() => setAddedToCart(false)}
              className="absolute top-4 right-4 text-muted hover:text-foreground"
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
                  {quantity}x items added successfully.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-2 font-body text-[10px] tracking-widest uppercase font-semibold">
              <button
                onClick={() => setAddedToCart(false)}
                className="h-11 border border-foreground/20 text-foreground transition-colors text-center"
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
