"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Package,
  Calendar,
  User,
  Mail,
  MapPin,
  DollarSign,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  orderBy,
  where,
  onSnapshot,
} from "firebase/firestore";
import StatusBadge from "@/components/orders/StatusBadge";

export default function StudioOrders() {
  const { user } = useAuth();
  const { clearCart } = useCart();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [orders, setOrders] = useState(null);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);

  // Handle Stripe redirect back from checkout
  useEffect(() => {
    if (searchParams.get("status") !== "success") return;

    const timer = setTimeout(() => {
      clearCart();
      setShowSuccessBanner(true);
      router.replace("/orders");
    }, 0);

    return () => clearTimeout(timer);
  }, [searchParams, clearCart, router]);

  // Separate effect just for auto-hiding the banner
  useEffect(() => {
    if (!showSuccessBanner) return;
    const timer = setTimeout(() => setShowSuccessBanner(false), 6000);
    return () => clearTimeout(timer);
  }, [showSuccessBanner]);


  useEffect(() => {
  if (!user) return;

  const byUid = query(collection(db, "orders"), where("customerUid", "==", user.uid));
  const byEmail = query(collection(db, "orders"), where("customerEmail", "==", user.email));

  let uidOrders = [];
  let emailOrders = [];

  const mapDoc = (d) => ({
    id: d.id,
    ...d.data(),
    createdAtRaw: d.data().createdAt,
    createdAt: d.data().createdAt?.toDate?.()
      ? d.data().createdAt.toDate().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
      : "N/A",
  });

  const mergeAndSet = () => {
    const map = new Map();
    [...uidOrders, ...emailOrders].forEach((o) => map.set(o.id, o));
    setOrders(
      Array.from(map.values()).sort(
        (a, b) => (b.createdAtRaw?.toMillis?.() || 0) - (a.createdAtRaw?.toMillis?.() || 0),
      ),
    );
  };

  const unsub1 = onSnapshot(byUid, (snap) => { uidOrders = snap.docs.map(mapDoc); mergeAndSet(); },
    (error) => console.error("Orders (uid) fetch failed:", error));
  const unsub2 = onSnapshot(byEmail, (snap) => { emailOrders = snap.docs.map(mapDoc); mergeAndSet(); },
    (error) => console.error("Orders (email) fetch failed:", error));

  return () => { unsub1(); unsub2(); };
}, [user]);

  
  // useEffect(() => {
  //   if (!user) return;

  //   const q = query(
  //     collection(db, "orders"),
  //     where("customerEmail", "==", user.email),
  //     orderBy("createdAt", "desc"),
  //   );

  //   const unsub = onSnapshot(
  //     q,
  //     (snap) => {
  //       setOrders(
  //         snap.docs.map((d) => ({
  //           id: d.id,
  //           ...d.data(),
  //           createdAt: d.data().createdAt?.toDate?.()
  //             ? d.data().createdAt.toDate().toLocaleDateString("en-US", {
  //                 year: "numeric",
  //                 month: "long",
  //                 day: "numeric",
  //               })
  //             : "N/A",
  //         })),
  //       );
  //     },
  //     (error) => {
  //       console.error("Orders fetch failed:", error);
  //       setOrders([]);
  //     },
  //   );

  //   return () => unsub();
  // }, [user]);

  const loading = user && orders === null;

  const grossPipelineValue = (orders || []).reduce(
    (acc, o) => acc + (o.totalAmount || 0),
    0,
  );

  const totalUnits = (orders || []).reduce(
    (acc, o) => acc + (o.items || []).reduce((s, i) => s + i.quantity, 0),
    0,
  );

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center text-muted font-body text-xs uppercase tracking-widest">
        <Loader2 className="w-4 h-4 animate-spin mr-2" /> Loading orders...
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 font-body text-xs tracking-widest uppercase text-muted">
        Please sign in to view your order history.
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground pt-12 pb-20 px-6 md:px-12 lg:px-24 transition-colors duration-500 gallery-fade">
      <div className="max-w-7xl mx-auto space-y-12">
        {showSuccessBanner && (
          <div className="flex items-center gap-3 border border-primary/20 bg-primary/5 text-primary px-6 py-4 font-body text-xs tracking-wide">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            Payment received — your order is confirmed and listed below.
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6 border-b border-foreground/5 pb-8">
          <div className="space-y-2">
            <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-primary flex items-center gap-4">
              <span className="inline-block w-4 h-[1px] bg-primary/40 shrink-0"></span>
              Order Management
            </p>
            <h1 className="font-heading text-4xl font-light tracking-tight">
              Order Details
            </h1>
          </div>

          <div className="flex items-center gap-8 font-body border border-foreground/10 p-4 bg-card">
            <div>
              <span className="block text-[8px] text-muted uppercase tracking-wider mb-0.5">
                Total Order Value
              </span>
              <span className="text-lg font-light tracking-wide">
                ${grossPipelineValue.toLocaleString()}
              </span>
            </div>
            <div className="w-[1px] h-8 bg-foreground/10"></div>
            <div>
              <span className="block text-[8px] text-muted uppercase tracking-wider mb-0.5">
                Total Items Ordered
              </span>
              <span className="text-lg font-light tracking-wide">
                {totalUnits} Units
              </span>
            </div>
          </div>
        </div>

        {!orders || orders.length === 0 ? (
          <div className="text-center py-24 font-body text-xs text-muted uppercase tracking-widest">
            No orders yet.
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              <div
                key={order.id}
                className="premium-frame bg-card p-6 md:p-8 relative shadow-lg flex flex-col gap-6"
              >
                <div className="absolute inset-0 border border-foreground/5 pointer-events-none m-3"></div>

                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 border-b border-foreground/5 pb-4 z-10">
                  <div className="flex flex-wrap items-center gap-4 md:gap-6 font-body text-xs text-muted">
                    <span className="font-heading font-semibold text-foreground tracking-wide text-sm flex items-center gap-1.5">
                      <Package className="w-4 h-4 text-primary" />
                      ORD-{order.id.slice(0, 8).toUpperCase()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> {order.createdAt}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 self-start md:self-auto">
                    <StatusBadge status={order.status} />
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start z-10">
                  <div className="lg:col-span-5 space-y-4 font-body text-xs border-r border-foreground/5 pr-4">
                    <span className="block text-[9px] tracking-widest uppercase text-primary font-semibold">
                      | Customer Details
                    </span>
                    <div className="space-y-2 text-muted">
                      <p className="flex items-center gap-2 text-foreground font-light">
                        <User className="w-3.5 h-3.5 text-muted/60" />{" "}
                        {order.customerName}
                      </p>
                      <p className="flex items-center gap-2 font-light">
                        <Mail className="w-3.5 h-3.5 text-muted/60" />{" "}
                        {order.customerEmail}
                      </p>
                      <p className="flex items-start gap-2 font-light leading-relaxed">
                        <MapPin className="w-3.5 h-3.5 text-muted/60 mt-0.5 shrink-0" />
                        <span>
                          {order.shippingAddress}, {order.city}, {order.country}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="lg:col-span-7 space-y-4">
                    <span className="block font-body text-[9px] tracking-widest uppercase text-primary font-semibold">
                      | Items Ordered
                    </span>
                    <div className="divide-y divide-foreground/5 space-y-3">
                      {(order.items || []).map((item, idx) => (
                        <div
                          key={idx}
                          className={`${idx > 0 ? "pt-3" : ""} flex justify-between items-center text-xs font-body`}
                        >
                          <div className="space-y-0.5">
                            <h4 className="font-heading font-medium text-foreground text-sm">
                              {item.name}
                            </h4>
                            <p className="text-[9px] text-muted tracking-wider uppercase">
                              Qty: {item.quantity} · {item.category}
                            </p>
                          </div>
                          <span className="font-light tracking-wide text-foreground">
                            ${(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      ))}

                      <div className="pt-4 flex justify-between items-baseline font-body">
                        <span className="text-[9px] uppercase tracking-wider text-muted">
                          Order Total
                        </span>
                        <span className="text-base font-light tracking-wide text-foreground flex items-center">
                          <DollarSign className="w-3.5 h-3.5 text-muted" />
                          {(order.totalAmount || 0).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
