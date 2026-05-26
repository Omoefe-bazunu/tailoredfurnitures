import React from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function HomeCollections() {
  return (
    <section className="w-full py-20 px-6 md:px-12 lg:px-24 bg-background transition-colors duration-500">
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
            View Over 100 Designs
          </Link>
        </div>

        {/* Split Category Panels — Transitioned from a 2-column to a balanced 3-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Gate A: The Italian School */}
          <div className="premium-frame bg-card flex flex-col group overflow-hidden shadow-lg border border-foreground/5">
            <div className="relative w-full aspect-[16/9] overflow-hidden">
              <Image
                src="/italian-carving.jpg"
                alt="Italian Parametric Carving Texture"
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 33vw"
                priority
              />
            </div>

            <div className="p-8 flex flex-col gap-3 flex-grow justify-between">
              <div className="space-y-3">
                <span className="font-body text-[9px] tracking-[0.3em] uppercase text-muted block">
                  Parametric & Biomorphic
                </span>
                <h3 className="font-heading text-3xl font-light text-foreground">
                  The Italian Collection
                </h3>
                <p className="font-body font-light text-xs text-muted leading-relaxed">
                  Sculptural tributes, flowing wood ribbon geometries, and deep
                  topographical stone textures inspired by the Mediterranean
                  coast.
                </p>
              </div>
              <Link
                href="/gallery?filter=Italian"
                className="inline-flex items-center gap-2 font-body text-[10px] tracking-widest uppercase font-semibold pt-4 text-foreground group-hover:text-primary transition-colors w-fit"
              >
                Enter Exhibition{" "}
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Gate B: The French School */}
          <div className="premium-frame bg-card flex flex-col group overflow-hidden shadow-lg border border-foreground/5">
            <div className="relative w-full aspect-[16/9] overflow-hidden">
              <Image
                src="/french-relief.jpg"
                alt="French sacred architectural relief texture"
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 33vw"
                priority
              />
            </div>

            <div className="p-8 flex flex-col gap-3 flex-grow justify-between">
              <div className="space-y-3">
                <span className="font-body text-[9px] tracking-[0.3em] uppercase text-muted block">
                  Sacred & Gothic Architecture
                </span>
                <h3 className="font-heading text-3xl font-light text-foreground">
                  The French Collection
                </h3>
                <p className="font-body font-light text-xs text-muted leading-relaxed">
                  Intricate structural layered reliefs, historical geometric
                  shadows, and dark romantic configurations tracking Parisian
                  motifs.
                </p>
              </div>
              <Link
                href="/gallery?filter=French"
                className="inline-flex items-center gap-2 font-body text-[10px] tracking-widest uppercase font-semibold pt-4 text-foreground group-hover:text-primary transition-colors w-fit"
              >
                Enter Exhibition{" "}
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Gate C: The Spanish School */}
          <div className="premium-frame bg-card flex flex-col group overflow-hidden shadow-lg border border-foreground/5">
            <div className="relative w-full aspect-[16/9] overflow-hidden">
              <Image
                src="/spanish-sculpture.jpg"
                alt="Spanish organic texture wood relief artwork"
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
            </div>

            <div className="p-8 flex flex-col gap-3 flex-grow justify-between">
              <div className="space-y-3">
                <span className="font-body text-[9px] tracking-[0.3em] uppercase text-muted block">
                  Organic & Dramatic Shadows
                </span>
                <h3 className="font-heading text-3xl font-light text-foreground">
                  The Spanish Collection
                </h3>
                <p className="font-body font-light text-xs text-muted leading-relaxed">
                  Bold multi-layered wood relief carvings, fluid abstract
                  dynamics, and sharp accent contrasts capturing raw,
                  sun-drenched Andalusian energy.
                </p>
              </div>
              <Link
                href="/gallery?filter=Spanish"
                className="inline-flex items-center gap-2 font-body text-[10px] tracking-widest uppercase font-semibold pt-4 text-foreground group-hover:text-primary transition-colors w-fit"
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
