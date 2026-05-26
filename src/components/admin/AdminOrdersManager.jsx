"use client";

import React, { useState, useEffect } from "react";
import {
  Package,
  Calendar,
  User,
  Mail,
  MapPin,
  DollarSign,
  Trash2,
  ChevronDown,
  ChevronUp,
  Save,
  X,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import StatusBadge from "@/components/orders/StatusBadge";

export default function AdminOrdersManager() {
  const [orders, setOrders] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [activeOrder, setActiveOrder] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("pending");
  const [modalResponse, setModalResponse] = useState({
    open: false,
    type: "success",
  });

  useEffect(() => {
    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setOrders(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          formattedDate: doc.data().createdAt?.toDate
            ? doc.data().createdAt.toDate().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : "N/A",
        })),
      );
    });
    return () => unsubscribe();
  }, []);

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    if (!activeOrder) return;

    try {
      await updateDoc(doc(db, "orders", activeOrder.id), {
        status: selectedStatus,
      });
      setIsStatusModalOpen(false);
      setModalResponse({ open: true, type: "success" });
    } catch (err) {
      console.error("Failed to update status record parameters:", err);
      setModalResponse({ open: true, type: "failure" });
    }
  };

  const handleDeleteOrder = async (id) => {
    if (
      confirm(
        "Admin Override Warning: Are you sure you want to permanently delete this order record from the database?",
      )
    ) {
      try {
        await deleteDoc(doc(db, "orders", id));
      } catch (err) {
        console.error("Deletion rejected:", err);
      }
    }
  };

  const grossPipelineValue = orders.reduce(
    (acc, o) => acc + (o.totalAmount || 0),
    0,
  );
  const totalUnits = orders.reduce(
    (acc, o) => acc + (o.items || []).reduce((s, i) => s + i.quantity, 0),
    0,
  );

  return (
    <div className="w-full bg-card border border-foreground/10 p-6 md:p-8 space-y-8 relative font-body text-xs text-foreground">
      <div className="absolute inset-0 border border-foreground/5 pointer-events-none m-2"></div>

      {/* Metrics Row summary block banner layout */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-b border-foreground/5 pb-4 relative z-10">
        <h2 className="font-heading text-2xl font-light tracking-tight">
          Orders Master Control
        </h2>
        <div className="flex items-center gap-6 border border-foreground/10 p-3 bg-background">
          <p>
            <span className="text-muted block text-[8px] uppercase tracking-wider">
              Gross Pipeline
            </span>{" "}
            <strong>${grossPipelineValue.toLocaleString()}</strong>
          </p>
          <div className="w-[1px] h-6 bg-foreground/10" />
          <p>
            <span className="text-muted block text-[8px] uppercase tracking-wider">
              Total Units Sold
            </span>{" "}
            <strong>{totalUnits} Units</strong>
          </p>
        </div>
      </div>

      {/* Collapsible item loops listings row containers wrapper */}
      <div className="space-y-4 relative z-10">
        {orders.length === 0 ? (
          <p className="text-center py-12 text-muted uppercase tracking-widest">
            No transaction logs loaded inside collection node.
          </p>
        ) : (
          orders.map((order) => {
            const isExpanded = expandedId === order.id;
            return (
              <div
                key={order.id}
                className="border border-foreground/15 bg-background/50 overflow-hidden"
              >
                {/* Collapsible header view snippet layout summary line bar */}
                <div
                  onClick={() => setExpandedId(isExpanded ? null : order.id)}
                  className="p-4 flex flex-wrap items-center justify-between cursor-pointer hover:bg-foreground/[0.01] select-none gap-4"
                >
                  <div className="space-y-0.5">
                    <span className="font-heading font-semibold text-sm block">
                      ORD-{order.id.slice(0, 8).toUpperCase()}
                    </span>
                    <span className="text-[10px] text-muted block">
                      {order.customerName} — {order.formattedDate}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <StatusBadge status={order.status} />
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-muted" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-muted" />
                    )}
                  </div>
                </div>

                {/* Collapsible Inner Body Drawer Segment Context Panel */}
                {isExpanded && (
                  <div className="px-4 pb-4 pt-4 border-t border-foreground/5 bg-background/10 space-y-6 animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Customer Details Data Matrix Segment Column block */}
                      <div className="space-y-2 border-r border-foreground/5 pr-4">
                        <span className="block text-[9px] uppercase font-semibold text-primary">
                          Customer Address Profile
                        </span>
                        <div className="space-y-1 text-muted text-xs font-light">
                          <p className="flex items-center gap-2 text-foreground font-normal">
                            <User className="w-3.5 h-3.5 text-muted/50" />{" "}
                            {order.customerName}
                          </p>
                          <p className="flex items-center gap-2">
                            <Mail className="w-3.5 h-3.5 text-muted/50" />{" "}
                            {order.customerEmail}
                          </p>
                          <p className="flex items-start gap-2 leading-relaxed">
                            <MapPin className="w-3.5 h-3.5 text-muted/50 mt-0.5 shrink-0" />{" "}
                            <span>
                              {order.shippingAddress}, {order.city},{" "}
                              {order.country}
                            </span>
                          </p>
                        </div>
                      </div>

                      {/* Purchased Item Set list details block array */}
                      <div className="space-y-3">
                        <span className="block text-[9px] uppercase font-semibold text-primary">
                          Manifest Specifications Breakdown
                        </span>
                        <div className="divide-y divide-foreground/5 space-y-2.5">
                          {(order.items || []).map((item, idx) => (
                            <div
                              key={idx}
                              className={`${idx > 0 ? "pt-2" : ""} flex justify-between items-center text-xs`}
                            >
                              <div>
                                <h4 className="font-heading text-sm font-medium text-foreground">
                                  {item.name}
                                </h4>
                                <p className="text-[9px] text-muted uppercase tracking-wide">
                                  Qty: {item.quantity} · School: {item.category}
                                </p>
                              </div>
                              <span className="font-light tracking-wide text-foreground">
                                ${(item.price * item.quantity).toLocaleString()}
                              </span>
                            </div>
                          ))}
                          <div className="pt-3 flex justify-between items-baseline font-medium border-t border-foreground/5">
                            <span className="text-[9px] uppercase tracking-wider text-muted">
                              Settlement Total
                            </span>
                            <span className="text-base font-light text-foreground">
                              ${(order.totalAmount || 0).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Operational Action Block Layer overrides controls */}
                    <div className="flex items-center justify-end gap-3 pt-3 border-t border-foreground/5">
                      <button
                        onClick={() => {
                          setActiveOrder(order);
                          setSelectedStatus(order.status);
                          setIsStatusModalOpen(true);
                        }}
                        className="h-9 px-4 border border-foreground/10 bg-card hover:border-foreground/30 text-foreground transition-colors font-medium"
                      >
                        Change Order Status
                      </button>
                      <button
                        onClick={() => handleDeleteOrder(order.id)}
                        className="h-9 px-3 border border-red-500/10 bg-card hover:border-red-500/30 text-red-500 transition-colors flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Discard Order Log
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* CORE ADMINISTRATIVE ORDER STATUS UPDATE INTERACTION DRAWER MODAL OVERLAY */}
      {isStatusModalOpen && (
        <div className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-md flex items-center justify-center p-6 gallery-fade">
          <div className="w-full max-w-sm bg-card border border-foreground/10 p-6 relative shadow-2xl space-y-6">
            <button
              onClick={() => setIsStatusModalOpen(false)}
              className="absolute top-4 right-4 text-muted hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="font-heading text-xl font-light">
              Update Order Status
            </h3>
            <form onSubmit={handleUpdateStatus} className="space-y-4">
              <div className="space-y-2">
                <label className="uppercase tracking-wider text-muted text-[10px]">
                  Select Status Route Value
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full h-12 bg-background border border-foreground/20 px-4 focus:outline-none text-foreground text-sm cursor-pointer"
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="declined">Declined</option>
                </select>
              </div>
              <button
                type="submit"
                className="btn-luxury w-full h-12 flex items-center justify-center gap-1.5 font-semibold tracking-wider"
              >
                <Save className="w-3.5 h-3.5" /> Save Changes
              </button>
            </form>
          </div>
        </div>
      )}

      {/* REACTION SYSTEM ALIGNMENT FEEDBACK MODALS STATUS DIALOGS OVERLAYS */}
      {modalResponse.open && (
        <div className="fixed inset-0 z-[120] bg-background/90 backdrop-blur-sm flex items-center justify-center p-6 animate-fade-in">
          <div className="w-full max-w-sm bg-card border border-foreground/10 p-8 text-center space-y-6 relative shadow-2xl">
            <button
              onClick={() => setModalResponse({ open: false, type: "success" })}
              className="absolute top-4 right-4 text-muted hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
            {modalResponse.type === "success" ? (
              <>
                <CheckCircle2 className="w-12 h-12 text-primary mx-auto stroke-[1.5]" />
                <h3 className="font-heading text-xl font-light">
                  Fulfillment Registry Updated
                </h3>
                <p className="text-xs text-muted max-w-xs mx-auto leading-relaxed">
                  The tracking status sequence mapping has been modified
                  successfully inside the database logs documentation
                  repository.
                </p>
              </>
            ) : (
              <>
                <XCircle className="w-12 h-12 text-red-500/80 mx-auto stroke-[1.5]" />
                <h3 className="font-heading text-xl font-light">
                  Update Request Failed
                </h3>
                <p className="text-xs text-muted max-w-xs mx-auto leading-relaxed">
                  The server script environment could not commit your changes
                  securely. Verify your cloud network configuration permissions
                  parameters.
                </p>
              </>
            )}
            <button
              onClick={() => setModalResponse({ open: false, type: "success" })}
              className="btn-luxury w-full h-11 font-semibold tracking-widest text-[9px] uppercase"
            >
              Acknowledge
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
