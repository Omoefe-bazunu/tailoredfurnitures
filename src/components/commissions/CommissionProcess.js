import React from "react";

export default function CommissionProcess() {
  const proceduralSteps = [
    {
      num: "01",
      title: "Spatial Review",
      desc: "Our structural engineering team evaluates your target wall coordinates, spacing depths, and local lighting angles.",
    },
    {
      num: "02",
      title: "3D Lookbook Design",
      desc: "We formulate highly detailed geometric wireframes and layout previews before touching the organic timber.",
    },
    {
      num: "03",
      title: "Precision Carving",
      desc: "Artisans hand-sculpt the custom parametric curves under rigid structural tolerance metrics.",
    },
    {
      num: "04",
      title: "Insured Transit",
      desc: "The finished relief panel is sealed in heavy-duty museum protective crates and air-freighted safely to you.",
    },
  ];

  return (
    <div className="space-y-12 border-t border-foreground/5 pt-20">
      <div className="text-center md:text-left space-y-2 max-w-sm">
        <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-muted flex items-center gap-4 justify-center md:justify-start">
          <span className="inline-block w-4 h-[1px] bg-muted/40 shrink-0"></span>
          Studio Operational Pipeline
        </p>
        <h2 className="font-heading text-3xl font-light">The Creation Cycle</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {proceduralSteps.map((step, idx) => (
          <div
            key={idx}
            className="space-y-4 border-l border-foreground/10 pl-6 relative"
          >
            <span className="block font-sans text-xs tracking-widest text-primary font-bold">
              {step.num}
            </span>
            <h3 className="font-heading text-xl font-light text-foreground">
              {step.title}
            </h3>
            <p className="font-body font-light text-xs text-muted leading-relaxed">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
