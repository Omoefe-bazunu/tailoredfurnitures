import React from "react";
import Image from "next/image";

export default function ArtworkRelated({ items }) {
  return (
    <div className="border-t border-foreground/5 pt-16 space-y-10">
      <div className="flex justify-between items-end border-b border-foreground/5 pb-4">
        <div className="space-y-1">
          <p className="font-body text-[10px] tracking-widest uppercase text-muted font-medium">
            Structural Complements
          </p>
          <h2 className="font-heading text-3xl font-light">
            Related Masterpieces
          </h2>
        </div>
        <a
          href="/gallery"
          className="font-body text-[10px] tracking-widest uppercase text-foreground border-b border-foreground pb-0.5 hover:text-muted hover:border-muted transition-colors"
        >
          Explore All 100 Designs
        </a>
      </div>

      {/* Structured Minimal Horizontal Recommendation Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item) => (
          <div key={item.id} className="group flex flex-col space-y-4">
            <div className="w-full aspect-[3/4] premium-frame bg-foreground/[0.01] overflow-hidden relative p-4 border border-foreground/5">
              <div className="w-full h-full bg-card border border-foreground/5 overflow-hidden relative flex items-center justify-center">
                {item.imageUrl ? (
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transform transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <span className="font-heading italic text-sm text-foreground/30">
                    {item.name}
                  </span>
                )}
              </div>
            </div>
            <div className="flex justify-between items-baseline px-1">
              <a
                href={`/gallery/${item.slug}`}
                className="font-heading text-xl font-light text-foreground hover:text-primary transition-colors"
              >
                {item.name}
              </a>
              <span className="font-body text-xs font-light text-muted">
                ${item.price.toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
