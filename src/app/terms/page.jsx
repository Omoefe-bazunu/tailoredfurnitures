"use client";

import React from "react";
import Link from "next/link";
import { Scale } from "lucide-react";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground py-16 px-6 md:px-12 lg:px-24 transition-colors duration-500 gallery-fade">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Core Header Layout */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6 border-b border-foreground/5 pb-8">
          <div className="space-y-3">
            <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-primary flex items-center gap-4">
              <span className="inline-block w-4 h-[1px] bg-primary/40 shrink-0"></span>
              Client Agreement
            </p>
            <h1 className="font-heading text-display-md font-light leading-none">
              Terms & Conditions
            </h1>
          </div>
          <p className="font-body text-[9px] tracking-widest uppercase text-muted/60">
            Effective Version 1.02
          </p>
        </div>

        {/* Layout Framework Block */}
        <div className="premium-frame bg-card p-8 md:p-12 relative shadow-lg font-body text-sm font-light text-muted leading-relaxed space-y-8">
          <div className="absolute inset-0 border border-foreground/10 pointer-events-none m-3"></div>

          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-2 text-foreground font-heading text-xl font-light">
              <Scale className="w-4 h-4 text-primary" />
              Welcome to Tailored Furnitures
            </div>
            <p>
              These Terms and Conditions govern your use of the Tailored
              Furnitures website and your purchase of products and services
              offered through our platform. By accessing our website or placing
              an order, you agree to be bound by these Terms and Conditions.
            </p>
          </div>

          <div className="w-full h-[1px] bg-foreground/5 relative z-10"></div>

          <div className="relative z-10 space-y-4">
            <h3 className="font-heading text-lg text-foreground font-light">
              Artisan Manifest Specifications
            </h3>
            <p>
              Tailored Furnitures specializes in the design, production, and
              sale of premium luxury wall sculptures, museum-grade decorative
              art pieces, and bespoke furniture commissions. Each piece is
              individually crafted to order and produced according to the
              specifications agreed upon at the time of purchase.
            </p>
            <p className="bg-foreground/[0.01] border-l border-primary/30 p-4 font-heading italic text-xs">
              Due to the handcrafted nature of our products, slight variations
              in color, texture, grain pattern, and finish may occur. These
              variations are natural characteristics of artisan craftsmanship
              and are not considered defects.
            </p>
          </div>

          <div className="w-full h-[1px] bg-foreground/5 relative z-10"></div>

          <div className="relative z-10 space-y-4">
            <h3 className="font-heading text-lg text-foreground font-light">
              Custom Commissions and Bespoke Orders
            </h3>
            <p>
              Clients may submit custom dimensions, concepts, sketches, or
              design requirements for consideration. Once a bespoke design has
              been approved and production has commenced, modifications may be
              subject to additional charges and revised production timelines.
            </p>
          </div>

          <div className="w-full h-[1px] bg-foreground/5 relative z-10"></div>

          <div className="relative z-10 space-y-4">
            <h3 className="font-heading text-lg text-foreground font-light">
              Pricing, Financial Clearance, & Production Timelines
            </h3>
            <p>
              All prices displayed are quoted in the applicable currency stated
              on the product page. Full payment or agreed deposit arrangements
              must be completed before production begins. Standard production
              lines require approximately eight (8) weeks from the date of
              payment confirmation, though large-scale installations may vary.
            </p>
          </div>

          <div className="w-full h-[1px] bg-foreground/5 relative z-10"></div>

          <div className="relative z-10 space-y-4">
            <h3 className="font-heading text-lg text-foreground font-light">
              Intellectual Property Restrictions
            </h3>
            <p>
              All designs, images, content, branding, artwork concepts, product
              descriptions, and website materials remain the exclusive
              intellectual property of Tailored Furnitures. No content may be
              reproduced, distributed, or used without prior written consent.
            </p>
          </div>

          <div className="w-full h-[1px] bg-foreground/5 relative z-10"></div>

          <div className="relative z-10 space-y-4">
            <h3 className="font-heading text-lg text-foreground font-light">
              Limitation of Liability & Governing Law
            </h3>
            <p>
              Tailored Furnitures shall not be liable for indirect, incidental,
              or consequential damages arising from the use of our products or
              services. Our total liability shall not exceed the amount paid for
              the specific order giving rise to the claim. These terms are
              strictly governed by the applicable regulations of the
              jurisdiction in which the studio operates.
            </p>
          </div>
        </div>

        {/* Support Link Redirection Control Footer */}
        <div className="border-t border-foreground/5 pt-6 text-[10px] tracking-widest uppercase text-muted text-center space-y-2">
          <p>Have further inquiries regarding our transaction parameters?</p>
          <Link
            href="/faq"
            className="inline-block text-primary underline hover:text-foreground transition-colors font-semibold"
          >
            Open FAQ System Board
          </Link>
        </div>
      </div>
    </main>
  );
}
