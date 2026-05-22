"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Play } from "lucide-react";

export default function ArtworkCard({ artwork }) {
  const { name, bio, price, imageUrl, category, hasVideo } = artwork;

  return (
    <div className="group premium-frame bg-card p-6 flex flex-col justify-between transition-all duration-500 hover:shadow-xl hover:shadow-primary/[0.02] relative">
      {/* Structural inner frame borders for a high-end physical art finish */}
      <div className="absolute inset-0 border border-foreground/5 pointer-events-none m-3"></div>

      <div className="space-y-6">
        {/* Aspect ratio container tailored perfectly for framed reliefs (3:4 Proportion) */}
        <div className="w-full aspect-[3/4] border border-foreground/5 bg-foreground/[0.02] overflow-hidden relative flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-foreground/[0.02] pointer-events-none z-10"></div>

          {imageUrl ? (
            <>
              <Image
                src={imageUrl}
                alt={`${name} - Custom Wood Sculpture`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transform transition-transform duration-700 ease-out group-hover:scale-105"
                priority={false}
              />

              {/* Minimalist Cinema/Video Availability Hint Overlay */}
              {hasVideo && (
                <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm px-2 py-1.5 flex items-center gap-1.5 border border-foreground/5 z-20 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                  <Play className="w-2.5 h-2.5 fill-foreground stroke-none animate-pulse" />
                  <span className="font-body text-[8px] tracking-[0.2em] uppercase font-medium">
                    Motion Capture Available
                  </span>
                </div>
              )}
            </>
          ) : (
            /* Asset Placeholder Grid for pieces waiting for your AI renders */
            <div className="text-center p-6 space-y-1 opacity-30 group-hover:opacity-50 transition-opacity duration-500">
              <p className="font-heading italic text-base">{name}</p>
              <p className="font-body text-[8px] tracking-[0.2em] uppercase">
                Asset Impending
              </p>
            </div>
          )}

          {/* Collection Metadata Tag */}
          <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm px-2.5 py-1 text-[8px] tracking-[0.25em] uppercase text-muted font-medium border border-foreground/5 z-20">
            {category} School
          </div>
        </div>

        {/* Content Breakdown Block */}
        <div className="space-y-2 px-1">
          <div className="flex justify-between items-baseline gap-4">
            <h3 className="font-heading text-2xl font-light tracking-tight text-foreground group-hover:text-primary transition-colors duration-300">
              {name}
            </h3>
            <span className="font-body text-sm font-light tracking-wide text-foreground/90 shrink-0">
              ${price.toLocaleString()}
            </span>
          </div>

          <p className="font-body font-light text-xs text-muted leading-relaxed line-clamp-2">
            {bio}
          </p>
        </div>
      </div>

      {/* Action Gateway Interface */}
      <div className="pt-6 px-1 border-t border-foreground/5 mt-6 flex justify-between items-center">
        <span className="font-body text-[8px] tracking-[0.2em] uppercase text-muted/50">
          Available for Order
        </span>
        <a
          href={`/gallery/${name.toLowerCase().replace(/\s+/g, "-")}`}
          className="inline-flex items-center gap-1.5 font-body text-[10px] tracking-widest uppercase font-semibold text-foreground hover:text-primary transition-colors"
        >
          Examine Frame{" "}
          <ArrowRight className="w-3 h-3 transform transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </div>
  );
}
