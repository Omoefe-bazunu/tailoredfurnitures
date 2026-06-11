"use client";

import React, { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { ArrowLeft, Lock, ArrowRight, Check, Zap } from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import {
  notifyAdminOfOrder,
  notifyClientOfOrder,
} from "@/app/actions/orderNotify";

const FLW_PUBLIC_KEY = process.env.NEXT_PUBLIC_FLW_PUBLIC_KEY || "";

function generateTxRef() {
  return `tailored-shop-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
}

export default function CheckoutPage() {
  const { cart, getSubtotal, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [error, setError] = useState("");

  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    country: "",
  });

  const totalInvestment = getSubtotal();

  // Load Flutterwave script
  useEffect(() => {
    if (document.getElementById("flw-script")) return;
    const script = document.createElement("script");
    script.id = "flw-script";
    script.src = "https://checkout.flutterwave.com/v3.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cart.length === 0 || isProcessing) return;

    const { name, email, address, city, country } = customerInfo;
    if (
      !name.trim() ||
      !email.trim() ||
      !address.trim() ||
      !city.trim() ||
      !country.trim()
    ) {
      setError("Please fill in all fields.");
      return;
    }

    setIsProcessing(true);
    setError("");

    const txRef = generateTxRef();

    window.FlutterwaveCheckout({
      public_key: FLW_PUBLIC_KEY,
      tx_ref: txRef,
      amount: totalInvestment,
      currency: "USD",
      payment_options: "card, banktransfer, ussd",
      customer: { email, phone_number: "", name },
      customizations: {
        title: "Tailored Furnitures",
        description: `Order of ${cart.length} item(s)`,
        logo: "/logo.png",
      },
      configurations: { session_duration: 10, max_retry_attempt: 3 },
      callback: async function (payment) {
        if (payment.status === "successful" || payment.status === "completed") {
          try {
            const orderData = {
              customerName: name.trim(),
              customerEmail: email.trim(),
              shippingAddress: address.trim(),
              city: city.trim(),
              country: country.trim(),
              items: cart.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                category: item.category || "General",
                dimensions: item.dimensions || "",
              })),
              totalAmount: totalInvestment,
              status: "pending",
              flutterwaveRef: payment.flw_ref,
              transactionId: String(payment.transaction_id),
              txRef: payment.tx_ref,
              createdAt: serverTimestamp(),
            };

            const docRef = await addDoc(collection(db, "orders"), orderData);

            await notifyAdminOfOrder({
              orderId: docRef.id,
              customerName: orderData.customerName,
              customerEmail: orderData.customerEmail,
              items: orderData.items,
              totalAmount: orderData.totalAmount,
            });

            await notifyClientOfOrder({
              customerName: orderData.customerName,
              customerEmail: orderData.customerEmail,
              orderId: docRef.id,
              totalAmount: orderData.totalAmount,
            });

            // ──────────────────────────────────────────────────────────────────────
            // TRACK GOOGLE ADS PURCHASE CONVERSION (Option 2 - Page View/Sale Snippet)
            // ──────────────────────────────────────────────────────────────────────
            if (typeof window !== "undefined" && window.gtag) {
              window.gtag("event", "conversion", {
                send_to: "AW-18217121132/zwGiCI_zhr0cEOzqzO5D",
                value: totalInvestment,
                currency: "USD",
                transaction_id: docRef.id,
              });
            }

            setShowSuccessModal(true);
          } catch (err) {
            console.error("Order submission error:", err);
            setError(
              "Payment received but order saving failed. Please contact support.",
            );
          } finally {
            setIsProcessing(false);
          }
        } else {
          setIsProcessing(false);
          setError("Payment was not completed. Please try again.");
        }
      },
      onclose: function () {
        setIsProcessing(false);
      },
    });
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    clearCart();
    window.location.href = "/orders";
  };

  if (cart.length === 0 && !showSuccessModal) {
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
          {/* Left: Form */}
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
                    Processing...
                  </span>
                ) : (
                  <>Pay ${totalInvestment.toLocaleString()}</>
                )}
              </button>

              <p className="text-center text-[10px] text-muted tracking-wider">
                🔒 Secured by Flutterwave · Card · Bank Transfer · USSD
              </p>
            </form>
          </div>

          {/* Right: Order summary */}
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

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-md flex items-center justify-center p-6 gallery-fade">
          <div className="w-full max-w-md bg-card border border-foreground/10 p-8 text-center space-y-6 relative shadow-2xl">
            <div className="absolute inset-0 border border-foreground/5 pointer-events-none m-2"></div>
            <div className="w-12 h-12 rounded-full border border-primary/20 bg-primary/5 flex items-center justify-center mx-auto">
              <Check className="w-5 h-5 text-primary stroke-[2.5]" />
            </div>
            <div className="space-y-2">
              <span className="text-[9px] tracking-[0.3em] font-medium uppercase text-primary">
                Order Confirmed
              </span>
              <h3 className="font-heading text-3xl font-light tracking-tight">
                Order Saved
              </h3>
              <p className="font-body font-light text-xs text-muted leading-relaxed max-w-sm mx-auto">
                Your order has been saved and a confirmation has been sent to
                your email. You can track your order status in the Orders
                section.
              </p>
            </div>
            <button
              onClick={handleModalClose}
              className="btn-luxury w-full h-12 flex items-center justify-center"
            >
              Track Order <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

// callback: async function (payment) {
//   if (payment.status === "successful" || payment.status === "completed") {
//     try {
//       const orderData = {
//         customerName: name.trim(),
//         customerEmail: email.trim(),
//         shippingAddress: address.trim(),
//         city: city.trim(),
//         country: country.trim(),
//         items: cart.map((item) => ({
//           id: item.id,
//           name: item.name,
//           price: item.price,
//           quantity: item.quantity,
//           category: item.category || "General",
//           dimensions: item.dimensions || "",
//         })),
//         totalAmount: totalInvestment,
//         status: "pending",
//         flutterwaveRef: payment.flw_ref,
//         transactionId: String(payment.transaction_id),
//         txRef: payment.tx_ref,
//         createdAt: serverTimestamp(),
//       };

//       const docRef = await addDoc(collection(db, "orders"), orderData);

//       await notifyAdminOfOrder({
//         orderId: docRef.id,
//         customerName: orderData.customerName,
//         customerEmail: orderData.customerEmail,
//         items: orderData.items,
//         totalAmount: orderData.totalAmount,
//       });

//       await notifyClientOfOrder({
//         customerName: orderData.customerName,
//         customerEmail: orderData.customerEmail,
//         orderId: docRef.id,
//         totalAmount: orderData.totalAmount,
//       });

//       setShowSuccessModal(true);
//     } catch (err) {
//       console.error("Order submission error:", err);
//       setError(
//         "Payment received but order saving failed. Please contact support.",
//       );
//     } finally {
//       setIsProcessing(false);
//     }
//   } else {
//     setIsProcessing(false);
//     setError("Payment was not completed. Please try again.");
//   }
