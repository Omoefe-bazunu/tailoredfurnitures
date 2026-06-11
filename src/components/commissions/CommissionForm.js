"use client";

import React, { useState, useEffect } from "react";
import { Send, CheckCircle2, XCircle, X } from "lucide-react";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import {
  notifyAdminOfCommission,
  notifyClientOfCommission,
} from "@/app/actions/commissionNotify";

export default function CommissionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalState, setModalState] = useState({
    open: false,
    type: "success",
  });

  const [scopes, setScopes] = useState([]);
  const [materials, setMaterials] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectScope: "",
    woodType: "",
    dimensions: "",
    brief: "",
  });

  useEffect(() => {
    const qScopes = query(
      collection(db, "projectScopes"),
      orderBy("createdAt", "asc"),
    );
    const unsubScopes = onSnapshot(qScopes, (snap) => {
      const items = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setScopes(items);
      if (items.length > 0) {
        setFormData((prev) => ({ ...prev, projectScope: items[0].name }));
      }
    });

    const qMaterials = query(
      collection(db, "materials"),
      orderBy("createdAt", "asc"),
    );
    const unsubMaterials = onSnapshot(qMaterials, (snap) => {
      const items = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMaterials(items);
      if (items.length > 0) {
        setFormData((prev) => ({ ...prev, woodType: items[0].name }));
      }
    });

    return () => {
      unsubScopes();
      unsubMaterials();
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        projectScope: formData.projectScope,
        woodType: formData.woodType,
        dimensions: formData.dimensions.trim(),
        brief: formData.brief.trim(),
      };

      await addDoc(collection(db, "commissions"), {
        ...payload,
        createdAt: new Date().toISOString(),
      });

      await notifyAdminOfCommission(payload);
      await notifyClientOfCommission(payload);

      // Track the explicit Google Ads Submit Lead Form conversion event safely
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "conversion", {
          send_to: "AW-18217121132/rqqjCIzzhr0cEOzqzO5D",
        });
      }

      setModalState({ open: true, type: "success" });
      setFormData({
        name: "",
        email: "",
        projectScope: scopes[0]?.name || "",
        woodType: materials[0]?.name || "",
        dimensions: "",
        brief: "",
      });
    } catch (err) {
      console.error("Commission submission failed:", err);
      setModalState({ open: true, type: "failure" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto premium-frame bg-card p-8 md:p-12 relative shadow-xl">
      <div className="absolute inset-0 border border-foreground/10 pointer-events-none m-3"></div>

      <form
        onSubmit={handleSubmit}
        className="space-y-8 relative z-10 font-body text-xs"
      >
        <div className="space-y-2 border-b border-foreground/5 pb-4">
          <h2 className="font-heading text-2xl font-light tracking-tight">
            Project Specifications
          </h2>
          <p className="text-[10px] text-muted uppercase tracking-widest">
            Provide details about your custom request
          </p>
        </div>

        {/* Identity Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-muted/80 uppercase tracking-wider font-medium">
              Full Name
            </label>
            <input
              type="text"
              required
              disabled={isSubmitting}
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full h-12 bg-background border border-foreground/20 px-4 focus:outline-none focus:border-primary text-foreground font-light text-sm disabled:opacity-50"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-muted/80 uppercase tracking-wider font-medium">
              Email Address
            </label>
            <input
              type="email"
              required
              disabled={isSubmitting}
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full h-12 bg-background border border-foreground/20 px-4 focus:outline-none focus:border-primary text-foreground font-light text-sm disabled:opacity-50"
            />
          </div>
        </div>

        {/* Parameters Select Options Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-muted/80 uppercase tracking-wider font-medium">
              Project Scope
            </label>
            <select
              disabled={isSubmitting}
              value={formData.projectScope}
              onChange={(e) =>
                setFormData({ ...formData, projectScope: e.target.value })
              }
              className="w-full h-12 bg-background border border-foreground/20 px-4 focus:outline-none focus:border-primary text-foreground font-light text-sm cursor-pointer disabled:opacity-50"
            >
              {scopes.map((s) => (
                <option key={s.id} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-muted/80 uppercase tracking-wider font-medium">
              Primary Material
            </label>
            <select
              disabled={isSubmitting}
              value={formData.woodType}
              onChange={(e) =>
                setFormData({ ...formData, woodType: e.target.value })
              }
              className="w-full h-12 bg-background border border-foreground/20 px-4 focus:outline-none focus:border-primary text-foreground font-light text-sm cursor-pointer disabled:opacity-50"
            >
              {materials.map((m) => (
                <option key={m.id} value={m.name}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Dimensions */}
        <div className="space-y-2">
          <label className="block text-muted/80 uppercase tracking-wider font-medium">
            Target Space Dimensions (e.g., 60&ldquo; x 80&ldquo; or Wall
            Details)
          </label>
          <input
            type="text"
            required
            disabled={isSubmitting}
            placeholder="Width x Height x Desired Depth"
            value={formData.dimensions}
            onChange={(e) =>
              setFormData({ ...formData, dimensions: e.target.value })
            }
            className="w-full h-12 bg-background border border-foreground/20 px-4 focus:outline-none focus:border-primary text-foreground font-light text-sm disabled:opacity-50"
          />
        </div>

        {/* Brief */}
        <div className="space-y-2">
          <label className="block text-muted/80 uppercase tracking-wider font-medium">
            Project Description & Details
          </label>
          <textarea
            rows="5"
            required
            disabled={isSubmitting}
            placeholder="Describe your design goals, ideas, and style preferences..."
            value={formData.brief}
            onChange={(e) =>
              setFormData({ ...formData, brief: e.target.value })
            }
            className="w-full bg-background border border-foreground/20 p-4 focus:outline-none focus:border-primary text-foreground font-light text-sm resize-none leading-relaxed disabled:opacity-50"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-luxury w-full h-14 flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {isSubmitting ? (
            <span className="w-5 h-5 border-2 border-background border-t-transparent rounded-full animate-spin"></span>
          ) : (
            <>
              Submit Request <Send className="w-3.5 h-3.5 ml-1" />
            </>
          )}
        </button>
      </form>

      {/* Confirmation Modal */}
      {modalState.open && (
        <div className="fixed inset-0 z-[100] bg-background/90 backdrop-blur-sm flex items-center justify-center p-6 gallery-fade">
          <div className="w-full max-w-md bg-card border border-foreground/10 p-8 relative shadow-2xl text-center space-y-6">
            <button
              onClick={() => setModalState({ open: false, type: "success" })}
              className="absolute top-4 right-4 text-muted hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>

            {modalState.type === "success" ? (
              <>
                <CheckCircle2 className="w-12 h-12 text-primary mx-auto stroke-[1.5]" />
                <div className="space-y-2">
                  <h3 className="font-heading text-2xl font-light text-foreground">
                    Request Received
                  </h3>
                  <p className="font-body text-xs text-muted max-w-xs mx-auto leading-relaxed">
                    Our team will review your specifications and contact you at
                    your email address within 48 business hours.
                  </p>
                </div>
              </>
            ) : (
              <>
                <XCircle className="w-12 h-12 text-red-500/80 mx-auto stroke-[1.5]" />
                <div className="space-y-2">
                  <h3 className="font-heading text-2xl font-light text-foreground">
                    Submission Failed
                  </h3>
                  <p className="font-body text-xs text-muted max-w-xs mx-auto leading-relaxed">
                    We could not process your submission. Please check your
                    connection and try again.
                  </p>
                </div>
              </>
            )}
            <button
              onClick={() => setModalState({ open: false, type: "success" })}
              className="btn-luxury w-full h-12 font-body text-[10px] tracking-widest uppercase font-semibold mt-2"
            >
              Return to Page
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
