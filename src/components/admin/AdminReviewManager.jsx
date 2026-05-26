"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  updateDoc,
  deleteDoc,
  addDoc,
} from "firebase/firestore";
import {
  Trash2,
  Edit3,
  ShieldCheck,
  Plus,
  X,
  Save,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function AdminReviewsManager() {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  // Creation/Edit parameters state
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  // Fix: Added the missing live Firestore data subscription stream
  useEffect(() => {
    const q = query(collection(db, "reviews"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReviews(items);
    });
    return () => unsubscribe();
  }, []);

  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    if (!quote.trim() || !author.trim()) return;

    try {
      if (editingId) {
        await updateDoc(doc(db, "reviews", editingId), {
          quote,
          author,
          role: role || "Collector",
          location: location || "Global",
          updatedAt: new Date().toISOString(),
        });
        setEditingId(null);
      } else {
        await addDoc(collection(db, "reviews"), {
          userId: "ADMIN_GENERATED",
          author,
          role: role || "Collector",
          quote,
          location: location || "Global",
          createdAt: new Date().toISOString(),
        });
      }
      // Reset form variables
      setQuote("");
      setAuthor("");
      setRole("");
      setLocation("");
      setIsEditorOpen(false);
    } catch (err) {
      console.error("Admin database operation rejected:", err);
    }
  };

  const handleAdminDelete = async (id) => {
    if (
      confirm(
        "Admin Override Warning: Are you sure you want to permanently delete this review?",
      )
    ) {
      await deleteDoc(doc(db, "reviews", id));
    }
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="w-full bg-card border border-foreground/10 p-6 md:p-8 space-y-8 relative">
      <div className="absolute inset-0 border border-foreground/5 pointer-events-none m-2"></div>

      {/* Title block row control */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10 border-b border-foreground/5 pb-4">
        <div className="space-y-1">
          <h2 className="font-heading text-2xl font-light tracking-tight">
            Reviews Controls
          </h2>
        </div>
        <button
          onClick={() => {
            setEditingId(null);
            setQuote("");
            setAuthor("");
            setRole("");
            setLocation("");
            setIsEditorOpen(true);
          }}
          className="btn-luxury text-[9px] tracking-widest uppercase font-semibold h-10 px-4 flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" /> Create Review
        </button>
      </div>

      {/* Collapsible Items Stream Container */}
      <div className="relative z-10 font-body text-xs space-y-4">
        {reviews.length === 0 ? (
          <p className="text-muted text-center py-6">No data entries loaded.</p>
        ) : (
          reviews.map((rev) => {
            const isExpanded = expandedId === rev.id;
            return (
              <div
                key={rev.id}
                className="border border-foreground/15 bg-background/50 overflow-hidden transition-all duration-300"
              >
                {/* Header Summary Tab */}
                <div
                  onClick={() => toggleExpand(rev.id)}
                  className="p-4 flex items-center justify-between cursor-pointer hover:bg-foreground/[0.02] select-none"
                >
                  <div className="space-y-0.5">
                    <span className="font-medium text-foreground text-sm block">
                      {rev.author}
                    </span>
                    <span className="text-[10px] text-muted block">
                      {rev.role} — {rev.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-muted" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-muted" />
                    )}
                  </div>
                </div>

                {/* Collapsible Body Layer */}
                {isExpanded && (
                  <div className="px-4 pb-4 pt-2 border-t border-foreground/5 bg-background/20 space-y-4 animate-fade-in">
                    <div className="space-y-1">
                      <span className="text-[9px] tracking-wider uppercase text-muted font-medium">
                        Review Text
                      </span>
                      <p className="font-heading italic text-xs leading-relaxed text-foreground/80 bg-card p-3 border border-foreground/5">
                        &ldquo;{rev.quote}&rdquo;
                      </p>
                    </div>

                    {/* Operational Action Block */}
                    <div className="flex items-center justify-end gap-3 pt-2 border-t border-foreground/5">
                      <button
                        onClick={() => {
                          setEditingId(rev.id);
                          setQuote(rev.quote);
                          setAuthor(rev.author);
                          setRole(rev.role);
                          setLocation(rev.location);
                          setIsEditorOpen(true);
                        }}
                        className="h-9 px-3 border border-foreground/10 bg-card hover:border-foreground/30 text-muted hover:text-foreground transition-colors flex items-center gap-1.5 font-medium tracking-wide"
                        title="Admin Edit"
                      >
                        <Edit3 className="w-3.5 h-3.5" /> Edit
                      </button>
                      <button
                        onClick={() => handleAdminDelete(rev.id)}
                        className="h-9 px-3 border border-red-500/10 bg-card hover:border-red-500/30 text-muted hover:text-red-500 transition-colors flex items-center gap-1.5 font-medium tracking-wide"
                        title="Admin Hard Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Admin Creator Overlord Editor Panel Drawer */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-md flex items-center justify-center p-6 gallery-fade">
          <div className="w-full max-w-xl bg-card border border-foreground/10 p-8 relative shadow-2xl space-y-6">
            <button
              onClick={() => setIsEditorOpen(false)}
              className="absolute top-4 right-4 text-muted hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="space-y-1">
              <h3 className="font-heading text-xl font-light">
                {editingId ? "Update Review" : "Create Review"}
              </h3>
            </div>
            <form
              onSubmit={handleAdminSubmit}
              className="space-y-4 font-body text-xs"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="uppercase tracking-wider text-muted">
                    Author Name
                  </label>
                  <input
                    type="text"
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full h-11 bg-background border border-foreground/20 px-4 focus:outline-none text-foreground text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="uppercase tracking-wider text-muted">
                    Role/Context Designation
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Fine Art Collector"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full h-11 bg-background border border-foreground/20 px-4 focus:outline-none text-foreground text-sm"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="uppercase tracking-wider text-muted">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="London, UK"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full h-11 bg-background border border-foreground/20 px-4 focus:outline-none text-foreground text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <label className="uppercase tracking-wider text-muted">
                  Review Text
                </label>
                <textarea
                  required
                  rows={4}
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  className="w-full bg-background border border-foreground/20 p-4 focus:outline-none text-foreground text-sm resize-none leading-relaxed"
                />
              </div>
              <button
                type="submit"
                className="btn-luxury w-full h-12 flex items-center justify-center gap-2"
              >
                <Save className="w-3.5 h-3.5" /> Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
