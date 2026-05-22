import React from "react";

export default function CommissionHero() {
  return (
    <section className="w-full text-center pt-6 pb-4 md:pt-8 max-w-4xl mx-auto space-y-6">
      <div className="text-[10px] font-medium uppercase tracking-[0.35em] text-primary flex items-center gap-4 justify-center">
        <span className="inline-block w-6 h-[1px] bg-primary/40 shrink-0"></span>
        Private Showroom Services
      </div>

      <h1 className="font-heading text-display-lg font-light leading-tight tracking-tight">
        Bespoke Commissions
      </h1>

      <p className="font-body font-light text-body-premium text-muted max-w-xl mx-auto leading-relaxed">
        Collaborate directly with our studio artisans to craft intricate wood
        relief art and specialized interior installations explicitly tailored to
        the dimensions of your private space.
      </p>
    </section>
  );
}
