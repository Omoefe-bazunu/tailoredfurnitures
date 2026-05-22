"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

export default function CommissionFAQs() {
  const [openIndex, setOpenIndex] = useState(null);

  const entries = [
    {
      q: "What types of products do you customize?",
      a: "We focus completely on structural interior decorations and framed wall hang arts. We do not craft standard standalone household furniture pieces for this collection tier.",
    },
    {
      q: "What is the typical production lead time?",
      a: "Because each custom design demands strict attention to precision detail and multi-layered woodwork relief curing, standard custom commissions span 6 to 10 weeks from 3D architectural sign-off.",
    },
    {
      q: "How are the art panels structurally mounted?",
      a: "All pieces are pre-engineered inside structurally rigid frame patterns built to securely anchor directly onto a heavy interior partition wall like standard premium fine art gallery displays.",
    },
    {
      q: "Do you ship globally?",
      a: "Yes. All finished installations are heavily protected inside dedicated wood framing crates and delivered via fully insured high-tier global freight networks directly from our studio hubs.",
    },
  ];

  return (
    <div className="space-y-12 border-t border-foreground/5 pt-20 max-w-4xl mx-auto w-full">
      <div className="text-center space-y-2">
        <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-primary">
          Exhibition Inquiries
        </p>
        <h2 className="font-heading text-3xl font-light">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="border-t border-foreground/10 divide-y divide-foreground/10 font-body text-xs">
        {entries.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className="py-4">
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full flex justify-between items-center py-2 text-left hover:text-primary transition-colors font-medium text-sm text-foreground uppercase tracking-wider"
              >
                <span>{item.q}</span>
                {isOpen ? (
                  <Minus className="w-3.5 h-3.5 text-muted" />
                ) : (
                  <Plus className="w-3.5 h-3.5 text-muted" />
                )}
              </button>

              <div
                className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100 pt-2" : "grid-rows-[0fr] opacity-0"}`}
              >
                <div className="overflow-hidden">
                  <p className="text-muted font-light leading-relaxed text-sm max-w-3xl pb-2">
                    {item.a}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
