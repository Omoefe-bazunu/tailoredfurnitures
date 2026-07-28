"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { auth } from "@/lib/firebase";

export default function CheckoutPage() {
  const { cart, getSubtotal } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const { user } = useAuth();

  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    country: "",
  });

  const totalInvestment = getSubtotal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cart.length === 0 || isProcessing) return;

    const { name, email, address, city, country } = customerInfo;
    if (!name.trim() || !email.trim() || !address.trim() || !city.trim() || !country.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    setIsProcessing(true);
    setError("");

    try {
      const idToken = auth.currentUser ? await auth.currentUser.getIdToken() : null;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/create-checkout-session`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            cart: cart.map((item) => ({ id: item.id, quantity: item.quantity })),
            customerInfo: {
              name: name.trim(),
              email: email.trim(),
              address: address.trim(),
              city: city.trim(),
              country: country.trim(),
            },
            idToken,
          }),
        },
      );

      const data = await res.json();

      if (!res.ok || !data.url) {
        throw new Error(data.error || "Could not start checkout");
      }

      window.location.assign(data.url);
    } catch (err) {
      console.error("Checkout error:", err);
      setError("Something went wrong starting checkout. Please try again.");
      setIsProcessing(false);
    }
  };


  if (cart.length === 0) {
    return (
      <main className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center space-y-4 gallery-fade">
        <h2 className="font-heading text-2xl font-light">
          No Selections Found
        </h2>
        <p className="font-body text-xs text-muted max-w-xs mx-auto">
          Your selection list is empty. Please select a masterpiece before
          opening the checkout.
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
    <main className="min-h-screen bg-background text-foreground pt-12 pb-20 px-6 md:px-12 lg:px-24 transition-colors duration-500 gallery-fade relative">
      <div className="max-w-7xl mx-auto space-y-12">
        <Link
          href="/cart"
          className="inline-flex items-center gap-2 font-body text-[10px] tracking-widest uppercase text-muted hover:text-foreground transition-colors group w-fit"
        >
          <ArrowLeft className="w-3.5 h-3.5 transform transition-transform group-hover:-translate-x-1" />
          Back to Cart
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 premium-frame bg-card p-8 md:p-12 relative shadow-xl">
            <div className="absolute inset-0 border border-foreground/10 pointer-events-none m-3"></div>

            <form
              onSubmit={handleSubmit}
              className="space-y-8 relative z-10 font-body text-xs"
            >
              <div className="space-y-2 border-b border-foreground/5 pb-4">
                <h2 className="font-heading text-2xl font-light tracking-tight">
                  Checkout Information
                </h2>
                <p className="text-[10px] text-muted uppercase tracking-widest">
                  Specify delivery address
                </p>
              </div>

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

              {error && (
                <p className="text-red-500 font-body text-xs">{error}</p>
              )}

              <button
                type="submit"
                disabled={isProcessing}
                className="btn-luxury w-full h-14 relative flex items-center justify-center gap-2 group border border-transparent disabled:opacity-50"
              >
                {isProcessing ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="w-3.5 h-3.5 border-2 border-background border-t-transparent rounded-full animate-spin"></span>
                    Redirecting to secure checkout...
                  </span>
                ) : (
                  <>Pay ${totalInvestment.toLocaleString()}</>
                )}
              </button>

              <p className="text-center text-[10px] text-muted tracking-wider">
                🔒 Secured by Stripe · Card payments
              </p>
            </form>
          </div>

          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <div className="p-6 border border-foreground/5 bg-card divide-y divide-foreground/5 space-y-4">
              <span className="block font-body text-[10px] tracking-widest text-muted uppercase font-medium">
                Order Preview
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
                      Qty: {item.quantity} | {item.category}
                    </p>
                  </div>
                  <span className="font-body text-foreground font-light tracking-wide">
                    ${(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
              <div className="pt-4 flex justify-between items-baseline font-body">
                <span className="text-[10px] uppercase tracking-wider text-muted">
                  Total
                </span>
                <span className="text-xl font-light tracking-wide text-foreground">
                  ${totalInvestment.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
