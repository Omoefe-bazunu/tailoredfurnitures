"use client";

import React, { useState } from "react";
import { Shield, Truck, RotateCcw, HelpCircle } from "lucide-react";

export default function PoliciesPage() {
  const [activeTab, setActiveTab] = useState("privacy");

  const tabs = [
    {
      id: "privacy",
      label: "Privacy Policy",
      icon: <Shield className="w-3.5 h-3.5" />,
    },
    {
      id: "delivery",
      label: "Delivery Policy",
      icon: <Truck className="w-3.5 h-3.5" />,
    },
    {
      id: "refunds",
      label: "Refund Policy",
      icon: <RotateCcw className="w-3.5 h-3.5" />,
    },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground py-16 px-6 md:px-12 lg:px-24 transition-colors duration-500 gallery-fade">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Core Page Context Branding Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 border-b border-foreground/5 pb-8">
          <div className="space-y-3">
            <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-primary flex items-center gap-4">
              <span className="inline-block w-4 h-[1px] bg-primary/40 shrink-0"></span>
              Legal Framework
            </p>
            <h1 className="font-heading text-display-md font-light leading-none">
              Studio Policies
            </h1>
          </div>

          {/* Luxury Tab Selection Navigation Pipeline Controls */}
          <div className="flex items-center gap-2 border border-foreground/10 p-1 bg-card self-start md:self-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-[10px] font-body tracking-widest uppercase font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground/60 hover:text-foreground hover:bg-foreground/[0.02]"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Context Container Wrapper Layout */}
        <div className="premium-frame bg-card p-8 md:p-12 relative shadow-lg font-body text-sm font-light text-muted leading-relaxed">
          <div className="absolute inset-0 border border-foreground/10 pointer-events-none m-3"></div>

          <div className="relative z-10 space-y-8 max-w-none">
            {/* ──────────────────────────────────────────────────────────────────
                PRIVACY POLICY SUB-SECTION DISPLAY LAYER
                ────────────────────────────────────────────────────────────────── */}
            {activeTab === "privacy" && (
              <div className="space-y-6 animate-fade-in">
                <div className="space-y-2">
                  <h2 className="font-heading text-2xl text-foreground font-light">
                    Privacy Policy
                  </h2>
                  <p className="text-xs tracking-wider uppercase text-muted/60">
                    Introduction
                  </p>
                </div>
                <p>
                  Tailored Furnitures values your privacy and is committed to
                  protecting your personal information. This Privacy Policy
                  explains how we collect, use, store, and protect your
                  information when you visit our website or purchase our
                  products.
                </p>

                <div className="w-full h-[1px] bg-foreground/5"></div>
                <h3 className="font-heading text-lg text-foreground font-light">
                  Information We Collect
                </h3>
                <p>
                  We may collect elements including your full name, email
                  address, telephone number, billing address, shipping address,
                  payment details, order information, and baseline website usage
                  statistics.
                </p>

                <div className="w-full h-[1px] bg-foreground/5"></div>
                <h3 className="font-heading text-lg text-foreground font-light">
                  How We Use Your Information
                </h3>
                <p>
                  Your information may be leveraged dynamically to process
                  orders and payments, deliver handcrafted products, respond to
                  inquiries, improve our website, dispatch shipping updates, and
                  comply with standard legal obligations.
                </p>

                <div className="w-full h-[1px] bg-foreground/5"></div>
                <h3 className="font-heading text-lg text-foreground font-light">
                  Data Protection & Security
                </h3>
                <p>
                  We implement reasonable technical, administrative, and
                  organizational safeguards to protect your records from
                  unauthorized access. Notably, Tailored Furnitures does not
                  store customer payment card credentials directly on its
                  servers—all parameters are securely handled by trusted
                  third-party payment providers. Our systems also utilize
                  cookies to optimize operational functionality.
                </p>

                <div className="w-full h-[1px] bg-foreground/5"></div>
                <h3 className="font-heading text-lg text-foreground font-light">
                  Your Legal Rights
                </h3>
                <p>
                  You reserve rights to request complete access to your personal
                  records data, demand corrections to inaccurate entries
                  information, verify consent statuses, or completely delete
                  eligible data packages. For all privacy inquiries, please
                  contact our support team directly via the contact options
                  provided.
                </p>
              </div>
            )}

            {/* ──────────────────────────────────────────────────────────────────
                DELIVERY POLICY SUB-SECTION DISPLAY LAYER
                ────────────────────────────────────────────────────────────────── */}
            {activeTab === "delivery" && (
              <div className="space-y-6 animate-fade-in">
                <div className="space-y-2">
                  <h2 className="font-heading text-2xl text-foreground font-light">
                    Delivery Policy
                  </h2>
                  <p className="text-xs tracking-wider uppercase text-muted/60">
                    Global Shipping
                  </p>
                </div>
                <p>
                  Tailored Furnitures proudly delivers worldwide. We work
                  directly alongside trusted international logistics partners to
                  ensure safe, museum-grade transportation of every premium
                  piece.
                </p>

                <div className="w-full h-[1px] bg-foreground/5"></div>
                <h3 className="font-heading text-lg text-foreground font-light">
                  Production Timelines
                </h3>
                <p>
                  Every piece is uniquely made to order. Production sequences
                  begin only after payment confirmation has been cleared,
                  requiring an estimated standard timeline of approximately
                  eight (8) weeks from the authorization date. Once production
                  concludes, you will receive full shipping confirmations and
                  active tracking data links.
                </p>

                <div className="w-full h-[1px] bg-foreground/5"></div>
                <h3 className="font-heading text-lg text-foreground font-light">
                  International Delivery Timeframes
                </h3>
                <p>
                  International delivery typically ranges from 5 to 21 business
                  days following active shipment. Final variables depend heavily
                  on destination countries, customs check requirements, local
                  schedules, and specific dimensional complexities of the
                  artwork frame.
                </p>

                <div className="w-full h-[1px] bg-foreground/5"></div>
                <h3 className="font-heading text-lg text-foreground font-light">
                  Duties and Client Responsibilities
                </h3>
                <p>
                  International customers are responsible for all customs
                  duties, import taxes, or local charges imposed by destination
                  border authorities. Clients are also responsible for ensuring
                  strict delivery address accuracy; delays due to invalid info
                  cannot be held against the studio. We encourage buyers to
                  fully inspect packaging within 48 hours of receipt to report
                  transit damage claims with photographic logs.
                </p>
              </div>
            )}

            {/* ──────────────────────────────────────────────────────────────────
                REFUND POLICY SUB-SECTION DISPLAY LAYER
                ────────────────────────────────────────────────────────────────── */}
            {activeTab === "refunds" && (
              <div className="space-y-6 animate-fade-in">
                <div className="space-y-2">
                  <h2 className="font-heading text-2xl text-foreground font-light">
                    Refund Policy
                  </h2>
                  <p className="text-xs tracking-wider uppercase text-muted/60">
                    Our Handcrafted Commitment
                  </p>
                </div>
                <p>
                  Because every design is individually handcrafted and produced
                  specifically for each client profile, our cancellation
                  protocols differ significantly from standard commodity retail
                  outlets.
                </p>

                <div className="w-full h-[1px] bg-foreground/5"></div>
                <h3 className="font-heading text-lg text-foreground font-light">
                  Standard vs Custom Cancellations
                </h3>
                <p>
                  Standard orders can be cancelled within 48 hours of original
                  payment before production begins, subject to applicable
                  processing fees deduction. However, custom-designed and
                  bespoke commissioned configurations are strictly
                  non-refundable once conceptual designs are approved and
                  production lines open. This is due to material, labor,
                  resource, and production slots allocation parameters.
                </p>

                <div className="w-full h-[1px] bg-foreground/5"></div>
                <h3 className="font-heading text-lg text-foreground font-light">
                  Damages and Verification
                </h3>
                <p>
                  If items encounter transit-related damage or manufacturing
                  defects, notify the studio within 48 hours of delivery with
                  photographic documentation. Upon verification, the studio will
                  repair the product, replace the frame, or issue full/partial
                  adjustments at our discretion.
                </p>

                <div className="w-full h-[1px] bg-foreground/5"></div>
                <h3 className="font-heading text-lg text-foreground font-light">
                  Non-Refundable Parameters
                </h3>
                <p>
                  Refund requests will not be acknowledged or processed for
                  natural wood grain variances, minor layout color shade
                  differences, client preference changes over time, customs
                  delays, or incorrect shipment address inputs. For claims
                  processing assistance, connect with our concierge support
                  network directly.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Index Meta Disclaimer Footer */}
        <div className="border-t border-foreground/5 pt-6 text-[9px] tracking-widest uppercase text-muted/60 text-center">
          Tailored Furnitures Guild Operations System Core Document Index
        </div>
      </div>
    </main>
  );
}
