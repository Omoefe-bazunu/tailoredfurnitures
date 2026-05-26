"use client";

import React, { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import { Star, ShieldCheck, X, CheckCircle2, XCircle } from "lucide-react";

export default function AdminHeroManager() {
  const [artworks, setArtworks] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalResponse, setModalResponse] = useState({
    open: false,
    type: "success",
  });

  useEffect(() => {
    const q = query(collection(db, "artworks"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setArtworks(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const handleSetFeatured = async (targetId) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const batch = writeBatch(db);

      // 1. Reset all existing featured tags back to false to avoid double assignments
      artworks.forEach((art) => {
        if (art.featured === true) {
          batch.update(doc(db, "artworks", art.id), { featured: false });
        }
      });

      // 2. Set the selected target item's featured token to true
      batch.update(doc(db, "artworks", targetId), { featured: true });

      await batch.commit();
      setModalResponse({ open: true, type: "success" });
    } catch (err) {
      console.error(
        "Failed to commit featured item configuration changes:",
        err,
      );
      setModalResponse({ open: true, type: "failure" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-card border border-foreground/10 p-6 md:p-8 space-y-6 relative font-body text-xs text-foreground">
      <div className="absolute inset-0 border border-foreground/5 pointer-events-none m-2"></div>

      <div className="border-b border-foreground/5 pb-4 relative z-10">
        <span className="text-[8px] font-semibold tracking-[0.35em] text-primary uppercase flex items-center gap-1.5 mb-1">
          <ShieldCheck className="w-3.5 h-3.5" /> Core Layout Manager
        </span>
        <h2 className="font-heading text-2xl font-light tracking-tight">
          Featured Display Controls
        </h2>
        <p className="text-muted text-[10px] mt-1 uppercase tracking-wider">
          Select which item appears on the main page display
        </p>
      </div>

      <div className="space-y-3 relative z-10">
        {artworks.length === 0 ? (
          <p className="text-center py-6 text-muted uppercase tracking-widest">
            No artwork profiles found inside collection storage.
          </p>
        ) : (
          artworks.map((art) => (
            <div
              key={art.id}
              className={`p-4 border transition-all duration-300 flex items-center justify-between gap-4 ${
                art.featured === true
                  ? "border-primary bg-primary/[0.01]"
                  : "border-foreground/10 bg-background/40"
              }`}
            >
              <div className="space-y-1">
                <span className="font-medium text-sm text-foreground block">
                  {art.name}
                </span>
                <span className="text-[10px] text-muted block">
                  {art.category} School — ${Number(art.price).toLocaleString()}
                </span>
              </div>

              <button
                disabled={isSubmitting || art.featured === true}
                onClick={() => handleSetFeatured(art.id)}
                className={`h-9 px-4 flex items-center gap-1.5 font-medium uppercase tracking-wider text-[10px] transition-all ${
                  art.featured === true
                    ? "bg-primary text-primary-foreground border border-transparent cursor-default"
                    : "border border-foreground/20 hover:border-foreground bg-card text-foreground disabled:opacity-50"
                }`}
              >
                <Star
                  className={`w-3.5 h-3.5 ${art.featured === true ? "fill-current" : ""}`}
                />
                {art.featured === true
                  ? "Active Highlight"
                  : "Set as Highlight"}
              </button>
            </div>
          ))
        )}
      </div>

      {/* Action Notification Feedbacks System Modals */}
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
                  Main Highlight Updated
                </h3>
                <p className="text-xs text-muted max-w-xs mx-auto leading-relaxed">
                  The item configuration parameters have been committed. Your
                  selection reflects instantly on the main screen presentation
                  view.
                </p>
              </>
            ) : (
              <>
                <XCircle className="w-12 h-12 text-red-500/80 mx-auto stroke-[1.5]" />
                <h3 className="font-heading text-xl font-light">
                  Update Failed
                </h3>
                <p className="text-xs text-muted max-w-xs mx-auto leading-relaxed">
                  The database script could not overwrite the asset config
                  metrics. Check your internet connection parameters.
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
