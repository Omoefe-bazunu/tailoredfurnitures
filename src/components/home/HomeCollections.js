import React from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link"; // Next.js semantic routing link injection

export default function HomeCollections() {
  return (
    <section className="w-full py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Category Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 border-b border-foreground/5 pb-6">
          <div className="space-y-2">
            <p className="text-[9px] tracking-[0.3em] uppercase text-muted font-medium">
              Curated Masterpieces
            </p>
            <h2 className="font-heading text-4xl font-light">
              Explore Architectural Expressions
            </h2>
          </div>
          <Link
            href="/gallery"
            className="font-body text-[10px] tracking-widest uppercase border-b border-foreground pb-1 hover:text-muted hover:border-muted transition-colors shrink-0 w-fit"
          >
            View Complete 100 Design Index
          </Link>
        </div>

        {/* Split Category Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Gate A: The Italian School */}
          <div className="premium-frame bg-card aspect-[16/10] p-8 relative group flex flex-col justify-between overflow-hidden">
            <div className="absolute inset-0 border border-foreground/5 pointer-events-none m-2"></div>
            <div className="absolute inset-0 bg-foreground/[0.01] group-hover:bg-foreground/[0.03] transition-colors duration-500 -z-10"></div>

            <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none">
              <span className="font-heading italic text-sm">
                [ Map Test Asset 2 : Italian Carving ]
              </span>
            </div>

            <span className="font-body text-[9px] tracking-[0.3em] uppercase text-muted">
              Parametric & Biomorphic
            </span>

            <div className="space-y-3 max-w-sm z-10">
              <h3 className="font-heading text-3xl font-light">
                The Italian Collection
              </h3>
              <p className="font-body font-light text-xs text-muted leading-relaxed">
                Sculptural tributes, flowing wood ribbon geometries, and deep
                topographical stone textures inspired by the Mediterranean
                coast.
              </p>
              <Link
                href="/gallery?filter=Italian"
                className="inline-flex items-center gap-2 font-body text-[10px] tracking-widest uppercase font-semibold pt-2 group-hover:text-primary transition-colors"
              >
                Enter Exhibition{" "}
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Gate B: The French School */}
          <div className="premium-frame bg-card aspect-[16/10] p-8 relative group flex flex-col justify-between overflow-hidden">
            <div className="absolute inset-0 border border-foreground/5 pointer-events-none m-2"></div>
            <div className="absolute inset-0 bg-foreground/[0.01] group-hover:bg-foreground/[0.03] transition-colors duration-500 -z-10"></div>

            <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none">
              <span className="font-heading italic text-sm">
                [ Map Test Asset 3 : French Relief ]
              </span>
            </div>

            <span className="font-body text-[9px] tracking-[0.3em] uppercase text-muted">
              Sacred & Gothic Architecture
            </span>

            <div className="space-y-3 max-w-sm z-10">
              <h3 className="font-heading text-3xl font-light">
                The French Collection
              </h3>
              <p className="font-body font-light text-xs text-muted leading-relaxed">
                Intricate structural layered reliefs, historical geometric
                shadows, and dark romantic configurations tracking Parisian
                motifs.
              </p>
              <Link
                href="/gallery?filter=French"
                className="inline-flex items-center gap-2 font-body text-[10px] tracking-widest uppercase font-semibold pt-2 group-hover:text-primary transition-colors"
              >
                Enter Exhibition{" "}
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
