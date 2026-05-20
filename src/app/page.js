import { ArrowRight, ShoppingBag } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-between p-6 md:p-16 transition-colors duration-500">
      {/* Top Gallery Navigation bar */}
      <header className="flex justify-between items-center w-full max-w-7xl mx-auto border-b border-foreground/5 pb-6">
        <div className="flex items-center gap-3">
          {/* Brand Geometry Token */}
          <div className="w-5 h-7 bg-primary relative flex flex-col justify-between p-[2px]">
            <div className="w-full h-[6px] bg-background"></div>
            <div className="w-full h-[2px] bg-background opacity-30"></div>
          </div>
          <span className="font-body text-xs tracking-[0.3em] uppercase font-semibold">
            Tailored Furnitures
          </span>
        </div>

        <button className="relative p-2 text-foreground hover:opacity-70 transition-opacity">
          <ShoppingBag className="w-4 h-4 stroke-[1.5]" />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-primary rounded-full"></span>
        </button>
      </header>

      {/* Main Luxury Exhibition Panel */}
      <section className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto py-12">
        <div className="lg:col-span-7 space-y-6">
          <p className="eyebrow-gallery">
            Exhibition Item 01 // Italian Motion
          </p>
          <h1 className="font-heading text-display-xl font-light">
            Aurelio Vento
          </h1>
          <p className="font-body font-light text-body-premium text-muted max-w-xl">
            A sculptural tribute to invisible wind currents moving through
            ancient stone corridors along the Amalfi coast. Each layer is
            crafted to precision and strict attention to detail.
          </p>
          <div className="pt-4 flex flex-wrap gap-4">
            <button className="btn-luxury">Acquire Piece — $9,500</button>
            <button className="btn-luxury-outline">
              Explore Collection <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </button>
          </div>
        </div>

        {/* Mock Framed Artwork Container showing theme boundary matching */}
        <div className="lg:col-span-5 w-full aspect-[4/5] premium-frame bg-foreground/5 flex items-center justify-center p-8 relative">
          <div className="absolute top-4 left-4 font-body text-[9px] tracking-widest text-muted/60 uppercase">
            [ Framed Relief Pattern Contour ]
          </div>
          <div className="w-full h-full border border-foreground/10 flex flex-col justify-between p-6 bg-card shadow-inner">
            <div className="w-12 h-[1px] bg-foreground/40"></div>
            <p className="font-heading italic text-xl text-center text-foreground/40">
              Artwork Asset Placeholder
            </p>
            <div className="w-full flex justify-end">
              <div className="w-6 h-[1px] bg-foreground/40"></div>
            </div>
          </div>
        </div>
      </section>

      {/* System Framework Indicator Footer */}
      <footer className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center text-[9px] tracking-[0.25em] uppercase text-muted/70 gap-4 border-t border-foreground/5 pt-6">
        <p>© 2026 Tailored Furnitures LLC.</p>
        <p className="text-foreground/60">
          Dynamic Opacity Variable Subsystem Engaged
        </p>
      </footer>
    </main>
  );
}
