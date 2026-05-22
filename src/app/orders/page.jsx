"use client";

import React, { useState } from "react";
import {
  Package,
  Calendar,
  User,
  Mail,
  MapPin,
  DollarSign,
  RefreshCw,
  CheckCircle2,
} from "lucide-react";
import StatusBadge from "@/components/orders/StatusBadge";

export default function StudioOrders() {
  // 1. Curated Mock Orders Database representing successful checkouts
  const [orders, setOrders] = useState([
    {
      id: "ORD-2026-8841",
      customerName: "Elena Rostov",
      customerEmail: "elena@maisonstudio.fr",
      shippingAddress: "42 Rue du Faubourg Saint-Honoré",
      city: "Paris",
      country: "France",
      createdAt: "May 22, 2026",
      status: "processing",
      items: [
        {
          id: "01",
          name: "Aurelio Vento",
          price: 9500,
          quantity: 1,
          category: "Italian",
        },
      ],
      totalAmount: 9500,
    },
    {
      id: "ORD-2026-1903",
      customerName: "Marcus Adebayo",
      customerEmail: "marcus.ade@ikoyiresidence.com",
      shippingAddress: "12 Kingsway Road, Ikoyi",
      city: "Lagos",
      country: "Nigeria",
      createdAt: "May 20, 2026",
      status: "pending",
      items: [
        {
          id: "02",
          name: "Maison de Lumière",
          price: 6450,
          quantity: 2,
          category: "French",
        },
        {
          id: "03",
          name: "Celestino Mare",
          price: 14350,
          quantity: 1,
          category: "Italian",
        },
      ],
      totalAmount: 27250,
    },
  ]);

  // Handle local state mutation to simulate order status toggles
  const handleToggleStatus = (orderId, currentStatus) => {
    const statusMap = {
      pending: "processing",
      processing: "completed",
      completed: "pending",
    };

    const updatedOrders = orders.map((order) =>
      order.id === orderId
        ? { ...order, status: statusMap[currentStatus] }
        : order,
    );
    setOrders(updatedOrders);
  };

  // Calculate high-tier gross metrics dynamically from active state ledger
  const grossPipelineValue = orders.reduce(
    (acc, order) => acc + order.totalAmount,
    0,
  );
  const activeAllocationsCount = orders.reduce(
    (acc, order) => acc + order.items.reduce((sum, i) => sum + i.quantity, 0),
    0,
  );

  return (
    <main className="min-h-screen bg-background text-foreground py-12 px-6 md:px-12 lg:px-24 transition-colors duration-500 gallery-fade">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Dashboard Branding Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6 border-b border-foreground/5 pb-8">
          <div className="space-y-2">
            <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-primary flex items-center gap-4">
              <span className="inline-block w-4 h-[1px] bg-primary/40 shrink-0"></span>
              Order Management Page
            </p>
            <h1 className="font-heading text-4xl font-light tracking-tight">
              Order Details
            </h1>
          </div>

          {/* Strategic High-Ticket Financial Overview Indicators */}
          <div className="flex items-center gap-8 font-body border border-foreground/10 p-4 bg-card">
            <div>
              <span className="block text-[8px] text-muted uppercase tracking-wider mb-0.5">
                Gross Vault Capital
              </span>
              <span className="text-lg font-light tracking-wide">
                ${grossPipelineValue.toLocaleString()}
              </span>
            </div>
            <div className="w-[1px] h-8 bg-foreground/10"></div>
            <div>
              <span className="block text-[8px] text-muted uppercase tracking-wider mb-0.5">
                Allocations
              </span>
              <span className="text-lg font-light tracking-wide">
                {activeAllocationsCount} Units
              </span>
            </div>
          </div>
        </div>

        {/* Master List Stream */}
        <div className="space-y-8">
          {orders.map((order) => (
            <div
              key={order.id}
              className="premium-frame bg-card p-6 md:p-8 relative shadow-lg flex flex-col gap-6"
            >
              <div className="absolute inset-0 border border-foreground/5 pointer-events-none m-3"></div>

              {/* Top Meta Row */}
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 border-b border-foreground/5 pb-4 z-10">
                <div className="flex flex-wrap items-center gap-4 md:gap-6 font-body text-xs text-muted">
                  <span className="font-heading font-semibold text-foreground tracking-wide text-sm flex items-center gap-1.5">
                    <Package className="w-4 h-4 text-primary" /> {order.id}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> {order.createdAt}
                  </span>
                </div>

                {/* Interactive Status Controls Component Group */}
                <div className="flex items-center gap-3 self-start md:self-auto">
                  <StatusBadge status={order.status} />
                  <button
                    onClick={() => handleToggleStatus(order.id, order.status)}
                    className="p-2 border border-foreground/10 hover:border-foreground/30 text-muted hover:text-foreground bg-background transition-colors flex items-center gap-1.5 font-body text-[9px] tracking-widest uppercase font-medium"
                    title="Simulate workflow status modification cycle"
                  >
                    <RefreshCw className="w-3 h-3" /> Advance Cycle
                  </button>
                </div>
              </div>

              {/* Central Information Split Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start z-10">
                {/* Column A: Shipping Credentials Details */}
                <div className="lg:col-span-5 space-y-4 font-body text-xs border-r border-foreground/5 pr-4">
                  <span className="block text-[9px] tracking-widest uppercase text-primary font-semibold">
                    | Customer Credentials
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

                {/* Column B: Itemized Allocated Artworks Breakdown */}
                <div className="lg:col-span-7 space-y-4">
                  <span className="block font-body text-[9px] tracking-widest uppercase text-primary font-semibold">
                    | Allocation Components
                  </span>

                  <div className="divide-y divide-foreground/5 space-y-3">
                    {order.items.map((item, idx) => (
                      <div
                        key={idx}
                        className={`${idx > 0 ? "pt-3" : ""} flex justify-between items-center text-xs font-body`}
                      >
                        <div className="space-y-0.5">
                          <h4 className="font-heading font-medium text-foreground text-sm">
                            {item.name}
                          </h4>
                          <p className="text-[9px] text-muted tracking-wider uppercase">
                            Qty: {item.quantity} {item.category} School
                            Framework
                          </p>
                        </div>
                        <span className="font-light tracking-wide text-foreground">
                          ${(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}

                    {/* Item Total Block */}
                    <div className="pt-4 flex justify-between items-baseline font-body">
                      <span className="text-[9px] uppercase tracking-wider text-muted">
                        Gross Order Valuation
                      </span>
                      <span className="text-base font-light tracking-wide text-foreground flex items-center">
                        <DollarSign className="w-3.5 h-3.5 text-muted" />{" "}
                        {order.totalAmount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Operational Action Notice */}
              {order.status === "completed" && (
                <div className="bg-emerald-500/[0.02] border border-emerald-500/10 p-3 flex items-center gap-2 font-body text-[10px] tracking-wider uppercase text-emerald-600/90 z-10">
                  <CheckCircle2 className="w-3.5 h-3.5 stroke-[2]" />{" "}
                  Fulfillment Cycle Finalized // Resend Delivery Notice
                  Dispatched
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
