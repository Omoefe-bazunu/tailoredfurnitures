"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { ArrowLeft, ShieldCheck, Lock, ArrowRight, Check } from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
  const { cart, getSubtotal, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    country: "",
  });

  const totalInvestment = getSubtotal();

  const handlePaymentSimulation = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsProcessing(true);

    // Simulate database write operational delay
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccessModal(true);
    }, 2500);
  };

  const handleModalCloseClose = () => {
    setShowSuccessModal(false);
    clearCart(); // Clear state storage vault
    window.location.href = "/orders"; // Hard route to synchronization tracking screen
  };

  if (cart.length === 0 && !showSuccessModal) {
    return (
      <main className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center space-y-4 gallery-fade">
        <h2 className="font-heading text-2xl font-light">
          No Selections Found
        </h2>
        <p className="font-body text-xs text-muted max-w-xs mx-auto">
          Your selection list is empty. Please select a masterpiece before
          opening the checkout
        </p>
        <Link
          href="/gallery"
          className="btn-luxury inline-block text-xs tracking-widest uppercase"
        >
          Return to Gallery
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground py-12 px-6 md:px-12 lg:px-24 transition-colors duration-500 gallery-fade relative">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Navigation context exit button */}
        <Link
          href="/cart"
          className="inline-flex items-center gap-2 font-body text-[10px] tracking-widest uppercase text-muted hover:text-foreground transition-colors group w-fit"
        >
          <ArrowLeft className="w-3.5 h-3.5 transform transition-transform group-hover:-translate-x-1" />
          Modify Cart Selections
        </Link>

        {/* Master Pipeline Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Block: Secure Intake Information Form */}
          <div className="lg:col-span-7 premium-frame bg-card p-8 md:p-12 relative shadow-xl">
            <div className="absolute inset-0 border border-foreground/10 pointer-events-none m-3"></div>

            <form
              onSubmit={handlePaymentSimulation}
              className="space-y-8 relative z-10 font-body text-xs"
            >
              <div className="space-y-2 border-b border-foreground/5 pb-4">
                <h2 className="font-heading text-2xl font-light tracking-tight">
                  Acquisition Credentials
                </h2>
                <p className="text-[10px] text-muted uppercase tracking-widest">
                  Specify safe destination coordinates
                </p>
              </div>

              {/* Customer Identity Parameters */}
              <div className="space-y-4">
                <p className="font-body text-[10px] tracking-widest uppercase text-primary font-semibold">
                  Client Identity
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-muted/80 uppercase tracking-wider font-medium">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={customerInfo.name}
                      onChange={(e) =>
                        setCustomerInfo({
                          ...customerInfo,
                          name: e.target.value,
                        })
                      }
                      className="w-full h-12 bg-background border border-foreground/20 px-4 focus:outline-none focus:border-primary text-foreground font-light text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-muted/80 uppercase tracking-wider font-medium">
                      Email for Invoices
                    </label>
                    <input
                      type="email"
                      required
                      value={customerInfo.email}
                      onChange={(e) =>
                        setCustomerInfo({
                          ...customerInfo,
                          email: e.target.value,
                        })
                      }
                      className="w-full h-12 bg-background border border-foreground/20 px-4 focus:outline-none focus:border-primary text-foreground font-light text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Freight Logistics Destination Address */}
              <div className="space-y-4 pt-2">
                <p className="font-body text-[10px] tracking-widest uppercase text-primary font-semibold">
                  Delivery Coordinates
                </p>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-muted/80 uppercase tracking-wider font-medium">
                      Street Address
                    </label>
                    <input
                      type="text"
                      required
                      value={customerInfo.address}
                      onChange={(e) =>
                        setCustomerInfo({
                          ...customerInfo,
                          address: e.target.value,
                        })
                      }
                      className="w-full h-12 bg-background border border-foreground/20 px-4 focus:outline-none focus:border-primary text-foreground font-light text-sm"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-muted/80 uppercase tracking-wider font-medium">
                        City
                      </label>
                      <input
                        type="text"
                        required
                        value={customerInfo.city}
                        onChange={(e) =>
                          setCustomerInfo({
                            ...customerInfo,
                            city: e.target.value,
                          })
                        }
                        className="w-full h-12 bg-background border border-foreground/20 px-4 focus:outline-none focus:border-primary text-foreground font-light text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-muted/80 uppercase tracking-wider font-medium">
                        Country
                      </label>
                      <input
                        type="text"
                        required
                        value={customerInfo.country}
                        onChange={(e) =>
                          setCustomerInfo({
                            ...customerInfo,
                            country: e.target.value,
                          })
                        }
                        className="w-full h-12 bg-background border border-foreground/20 px-4 focus:outline-none focus:border-primary text-foreground font-light text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Settlement Execution Trigger button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="btn-luxury w-full h-14 relative flex items-center justify-center group border border-transparent disabled:opacity-50"
              >
                {isProcessing ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="w-3.5 h-3.5 border-2 border-background border-t-transparent rounded-full animate-spin"></span>
                    Authorizing Secure Encrypted Escrow...
                  </span>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5 mr-1.5 opacity-60" /> Authorize
                    Settlement — ${totalInvestment.toLocaleString()}
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Block: Immutable Structural Invoice Overview Ledger */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <div className="p-6 border border-foreground/5 bg-card divide-y divide-foreground/5 space-y-4">
              <span className="block font-body text-[10px] tracking-widest text-muted uppercase font-medium">
                Vault Ledger Preview
              </span>

              {cart.map((item) => (
                <div
                  key={item.id}
                  className="pt-4 flex justify-between items-center text-xs"
                >
                  <div className="space-y-0.5">
                    <h4 className="font-heading font-medium text-foreground text-sm">
                      {item.name}
                    </h4>
                    <p className="font-body text-[9px] text-muted tracking-wider uppercase">
                      Qty: {item.quantity} | {item.category} School
                    </p>
                  </div>
                  <span className="font-body text-foreground font-light tracking-wide">
                    ${(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}

              <div className="pt-4 flex justify-between items-baseline font-body">
                <span className="text-[10px] uppercase tracking-wider text-muted">
                  Total Gross Value
                </span>
                <span className="text-xl font-light tracking-wide text-foreground">
                  ${totalInvestment.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="font-body text-[10px] tracking-wider uppercase text-muted/60 space-y-2 px-1">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-primary" /> Multi-Layer
                End-to-End Cryptographic Protection Active
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────────────────
         4. THE SETTLEMENT SUCCESS MODAL OVERLAY
         ────────────────────────────────────────────────────────────────────── */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-md flex items-center justify-center p-6 gallery-fade">
          <div className="w-full max-w-md bg-card border border-foreground/10 p-8 text-center space-y-6 relative shadow-2xl">
            <div className="absolute inset-0 border border-foreground/5 pointer-events-none m-2"></div>

            {/* Success Animation Badge */}
            <div className="w-12 h-12 rounded-full border border-primary/20 bg-primary/5 flex items-center justify-center mx-auto">
              <Check className="w-5 h-5 text-primary stroke-[2.5]" />
            </div>

            <div className="space-y-2">
              <span className="text-[9px] tracking-[0.3em] font-medium uppercase text-primary">
                Payment Successful
              </span>
              <h3 className="font-heading text-3xl font-light tracking-tight">
                Orders Saved
              </h3>
              <p className="font-body font-light text-xs text-muted leading-relaxed max-w-sm mx-auto">
                Your luxury allocations have been verified and secured inside
                our studio processing queue. A custom HTML crating manifest has
                been dispatched to your email credentials.
              </p>
            </div>

            {/* Custom Redirect UI Action Gate */}
            <button
              onClick={handleModalCloseClose}
              className="btn-luxury w-full h-12 flex items-center justify-center"
            >
              Track Order Manifest <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
