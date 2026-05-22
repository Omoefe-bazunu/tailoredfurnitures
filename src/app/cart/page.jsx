"use client";

import React from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import {
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  ShieldCheck,
  ArrowLeft,
  ShoppingBag,
} from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, getSubtotal } = useCart();
  const totalInvestment = getSubtotal();

  if (cart.length === 0) {
    return (
      <main className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center space-y-6 gallery-fade">
        <div className="w-8 h-8 border border-foreground/20 rounded-full flex items-center justify-center opacity-40">
          <ShoppingBag className="w-4 h-4 text-muted" />
        </div>
        <div className="space-y-1">
          <h2 className="font-heading text-2xl font-light">
            Your Cart is Empty
          </h2>
          <p className="font-body text-xs text-muted max-w-sm mx-auto leading-relaxed">
            You have not selected and added any piece to your cart yet. Explore
            our gallery and add your favorite masterpieces to the cart for a
            seamless checkout experience.
          </p>
        </div>
        <Link
          href="/gallery"
          className="btn-luxury inline-block pt-4 px-8 text-xs tracking-widest uppercase"
        >
          Return to Exhibition Catalog
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground pt-12 pb-20 px-6 md:px-12 lg:px-24 transition-colors duration-500 gallery-fade">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header Block */}
        <div className="border-b border-foreground/5 pb-6 space-y-2">
          <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-primary">
            Cart Summary
          </p>
          <h1 className="font-heading text-4xl font-light tracking-tight">
            Your Selections
          </h1>
        </div>

        {/* Workspace Matrix Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Block: Item List Stream */}
          <div className="lg:col-span-8 divide-y divide-foreground/5 border-b border-foreground/5">
            {cart.map((item) => (
              <div
                key={item.id}
                className="py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 group"
              >
                {/* Product Metadata Info Wrap */}
                <div className="flex items-center gap-6">
                  <div className="w-20 aspect-[3/4] relative bg-foreground/[0.02] border border-foreground/5 shrink-0">
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    ) : (
                      <div className="w-full h-full bg-card flex items-center justify-center text-[8px] tracking-tighter text-muted font-heading uppercase">
                        [ Relief ]
                      </div>
                    )}
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] tracking-widest font-medium uppercase text-primary">
                      {item.category} School Framework
                    </span>
                    <h3 className="font-heading text-xl font-light text-foreground">
                      {item.name}
                    </h3>
                    <p className="font-body text-[10px] text-muted font-light">
                      Spec: {item.dimensions || 'Standard 48"x60"'}
                    </p>
                  </div>
                </div>

                {/* Quantitative Context Adjustment Controls Row */}
                <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-8">
                  {/* Fine Incrementor Controls */}
                  <div className="flex items-center border border-foreground/20 bg-card h-10">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 h-full text-foreground/60 hover:text-foreground hover:bg-foreground/[0.02] transition-colors"
                      aria-label="Reduce unit capacity"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-4 font-body text-xs font-light w-10 text-center select-none">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 h-full text-foreground/60 hover:text-foreground hover:bg-foreground/[0.02] transition-colors"
                      aria-label="Increase unit capacity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Calculations & Destruction Triggers Column */}
                  <div className="text-right space-y-1 min-w-[80px]">
                    <span className="block font-body text-sm text-foreground font-light tracking-wide">
                      ${(item.price * item.quantity).toLocaleString()}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-[9px] tracking-widest uppercase text-muted hover:text-red-500 inline-flex items-center gap-1 transition-colors"
                      aria-label="Remove item allocation"
                    >
                      <Trash2 className="w-3 h-3 stroke-[1.5]" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Block: Settlement Checkout Panel Overview */}
          <div className="lg:col-span-4 premium-frame bg-card p-6 md:p-8 relative shadow-lg space-y-6 lg:sticky lg:top-28">
            <div className="absolute inset-0 border border-foreground/10 pointer-events-none m-3"></div>

            <div className="space-y-2 relative z-10 border-b border-foreground/5 pb-4">
              <h2 className="font-heading text-xl font-light tracking-tight">
                Cart Summary
              </h2>
              <p className="text-[9px] text-muted uppercase tracking-widest font-light">
                Below is a summary of your selections.
              </p>
            </div>

            <div className="space-y-3 relative z-10 font-body text-xs">
              <div className="flex justify-between text-muted/80">
                <span>Total Masterpiece Allocation</span>
                <span className="font-medium text-foreground">
                  {cart.reduce((acc, i) => acc + i.quantity, 0)} Units
                </span>
              </div>
              <div className="flex justify-between text-muted/80">
                <span>Packaging</span>
                <span className="text-primary tracking-widest font-semibold uppercase text-[10px]">
                  Complimentary
                </span>
              </div>

              <div className="w-full h-[1px] bg-foreground/5 my-4"></div>

              <div className="flex justify-between items-baseline pt-2">
                <span className="font-medium uppercase tracking-wider text-[10px] text-foreground">
                  Total Investment
                </span>
                <span className="text-xl font-light tracking-wide text-foreground">
                  ${totalInvestment.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="space-y-4 pt-4 relative z-10">
              <Link
                href="/checkout"
                className="btn-luxury w-full h-14 flex items-center justify-center"
              >
                Proceed to Checkout <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>

              <Link
                href="/gallery"
                className="inline-flex items-center justify-center gap-2 font-body text-[10px] tracking-widest uppercase text-muted hover:text-foreground transition-colors w-full text-center"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Continue Selection
              </Link>
            </div>

            <div className="pt-2 border-t border-foreground/5 font-body text-[9px] tracking-wider uppercase text-muted/60 flex items-center gap-2 relative z-10">
              <ShieldCheck className="w-3.5 h-3.5 text-primary" /> Insured
              Delivery & Crating Guarantees Applied
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
