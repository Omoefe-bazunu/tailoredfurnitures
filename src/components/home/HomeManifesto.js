import React from "react";

export default function HomeManifesto() {
  return (
    <section className="w-full py-24 md:py-36 px-6 md:px-12 bg-[#111111] border-t border-b border-white/10 relative transition-colors duration-500">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <p className="text-[10px] font-medium uppercase tracking-[0.4em] text-white/70">
          The Studio Manifesto
        </p>

        <h2 className="font-heading text-display-lg font-light leading-tight tracking-tight max-w-3xl mx-auto text-white">
          &ldquo;Our mission is to craft intricate set pieces that elevate the
          luxury of your home or personal space.&rdquo;
        </h2>

        <div className="w-12 h-[1px] bg-white/30 mx-auto"></div>

        <p className="font-body font-light text-sm text-white/80 max-w-xl mx-auto leading-relaxed">
          Each item is masterfully engineered to precision with strict,
          uncompromising attention to detail. We only produce interior
          decorations and wall hang arts, bringing your architectural space
          fully to life.
        </p>
      </div>
    </section>
  );
}
