import React from "react";

export default function HomeReviews() {
  const sentiments = [
    {
      quote:
        "The geometric precision of the frame contours entirely transformed our high-ceiling salon. It acts as an architectural focal point rather than simple hanging decoration.",
      author: "Elena Rostov",
      role: "Principal Architect, Maison Interior Studio",
      location: "Paris",
    },
    {
      quote:
        "Uncompromising attention to structural wood relief detail. The depth and shifting shadow play under night museum-lighting completely redefines the space.",
      author: "Marcus Adebayo",
      role: "Private Art Collector",
      location: "Lagos",
    },
  ];

  return (
    <section className="w-full py-24 px-6 md:px-12 lg:px-24 bg-background border-b border-foreground/5 transition-colors duration-500">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center md:text-left space-y-2 max-w-md">
          <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-muted flex items-center gap-4 justify-center md:justify-start">
            <span className="inline-block w-4 h-[1px] bg-muted/40 shrink-0"></span>
            Collector Sentiment
          </p>
          <h2 className="font-heading text-3xl font-light">
            Spatial Transformations
          </h2>
        </div>

        {/* Minimal Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {sentiments.map((item, index) => (
            <div
              key={index}
              className="flex flex-col justify-between p-8 border border-foreground/5 bg-card relative"
            >
              {/* Subtle structural fine alignment lines */}
              <div className="absolute inset-0 border border-foreground/[0.02] pointer-events-none m-1.5"></div>

              <p className="font-heading italic text-lg md:text-xl text-foreground/80 leading-relaxed tracking-wide mb-8">
                &ldquo;{item.quote}&rdquo;
              </p>

              <div className="border-t border-foreground/5 pt-4 flex justify-between items-end">
                <div>
                  <h4 className="font-body text-xs font-semibold uppercase tracking-widest text-foreground">
                    {item.author}
                  </h4>
                  <p className="font-body text-[10px] text-muted mt-0.5 font-light">
                    {item.role}
                  </p>
                </div>
                <span className="font-body text-[9px] tracking-[0.2em] uppercase text-muted/60">
                  {item.location}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
