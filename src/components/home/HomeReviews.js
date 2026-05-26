"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { Edit2, Trash2, PenTool, X, Send, AlertCircle } from "lucide-react";

export default function HomeReviews() {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quote, setQuote] = useState("");
  const [location, setLocation] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Real-time listener for the public display database collection
  useEffect(() => {
    const q = query(collection(db, "reviews"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const dataStream = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReviews(dataStream);
    });
    return () => unsubscribe();
  }, []);

  // Automatic slideshow rotation loop (Runs purely on the background interval timer)
  useEffect(() => {
    if (reviews.length <= 1 || isModalOpen) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
    }, 6000); // Progresses automatically every 6 seconds

    return () => clearInterval(interval);
  }, [reviews.length, isModalOpen]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!quote.trim()) return;

    try {
      if (editingId) {
        const docRef = doc(db, "reviews", editingId);
        await updateDoc(docRef, {
          quote,
          location: location.trim() || "Global",
          updatedAt: new Date().toISOString(),
        });
        setEditingId(null);
      } else {
        await addDoc(collection(db, "reviews"), {
          userId: user.uid,
          author: user.name || "Anonymous Collector",
          role: "Collector",
          quote,
          location: location.trim() || "Global",
          createdAt: new Date().toISOString(),
        });
        setCurrentIndex(0);
      }
      setQuote("");
      setLocation("");
      setIsModalOpen(false);
    } catch (err) {
      console.error("Client record mutation rejected:", err);
    }
  };

  const handleDeleteReview = async (id) => {
    if (
      confirm(
        "Are you sure you want to discard this record entry from your journal?",
      )
    ) {
      try {
        await deleteDoc(doc(db, "reviews", id));
        setCurrentIndex(0);
      } catch (err) {
        console.error("Deletion rejected:", err);
      }
    }
  };

  const startEdit = (review) => {
    setEditingId(review.id);
    setQuote(review.quote);
    setLocation(review.location);
    setIsModalOpen(true);
  };

  const activeReview = reviews[currentIndex];

  return (
    <section className="w-full py-24 px-6 md:px-12 lg:px-24 bg-background border-b border-foreground/5 transition-colors duration-500 relative">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Section Header Row */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-6 border-b border-foreground/5 pb-6">
          <div className="space-y-2 text-left">
            <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-muted flex items-center gap-4">
              <span className="inline-block w-4 h-[1px] bg-muted/40 shrink-0"></span>
              Client Reviews
            </p>
            <h2 className="font-heading text-3xl font-light">
              Spatial Transformations
            </h2>
          </div>

          <div>
            {user ? (
              <button
                onClick={() => {
                  setEditingId(null);
                  setQuote("");
                  setLocation("");
                  setIsModalOpen(true);
                }}
                className="btn-luxury font-body text-[10px] tracking-widest uppercase py-2 px-4 h-10 flex items-center gap-2"
              >
                <PenTool className="w-3.5 h-3.5" /> Share Review
              </button>
            ) : (
              <p className="font-body text-[10px] tracking-wider uppercase text-muted/60 bg-foreground/[0.02] border border-foreground/5 p-2.5">
                <AlertCircle className="w-3 h-3 inline mr-1 -mt-0.5" /> Sign In
                to drop review
              </p>
            )}
          </div>
        </div>

        {/* Automatic Single Review Canvas Display */}
        {reviews.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-foreground/10 text-muted font-body text-xs tracking-widest uppercase">
            No reviews found matching this section.
          </div>
        ) : (
          <div className="space-y-4">
            {/* Slide Container box */}
            <div className="relative overflow-hidden min-h-[220px] bg-card border border-foreground/5 p-8 md:p-12 shadow-sm flex flex-col justify-between group">
              <div className="absolute inset-0 border border-foreground/[0.02] pointer-events-none m-1.5"></div>

              {/* Individual Slide Frame with layout key to trigger smooth re-entry animations */}
              <div
                key={activeReview.id}
                className="animate-in fade-in slide-in-from-right-8 duration-500 flex flex-col justify-between h-full space-y-8"
              >
                <p className="font-heading italic text-lg md:text-2xl text-foreground/80 leading-relaxed tracking-wide">
                  &ldquo;{activeReview.quote}&rdquo;
                </p>

                <div className="border-t border-foreground/5 pt-4 flex justify-between items-end">
                  <div>
                    <h4 className="font-body text-xs font-semibold uppercase tracking-widest text-foreground flex items-center gap-2">
                      {activeReview.author}
                      {user && user.uid === activeReview.userId && (
                        <span className="text-[8px] font-medium text-primary bg-primary/5 px-1.5 py-0.5 border border-primary/10 tracking-normal lowercase">
                          my log
                        </span>
                      )}
                    </h4>
                    <p className="font-body text-[10px] text-muted mt-0.5 font-light">
                      {activeReview.role}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    {user && user.uid === activeReview.userId && (
                      <div className="flex items-center gap-2 opacity-40 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => startEdit(activeReview)}
                          className="p-1 text-muted hover:text-foreground transition-colors"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteReview(activeReview.id)}
                          className="p-1 text-muted hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                    <span className="font-body text-[9px] tracking-[0.2em] uppercase text-muted/60">
                      {activeReview.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* User Submission Portal Frame Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-md flex items-center justify-center p-6 gallery-fade">
          <div className="w-full max-w-xl bg-card border border-foreground/10 p-8 relative shadow-2xl space-y-6">
            <button
              onClick={() => {
                setIsModalOpen(false);
                setEditingId(null);
              }}
              className="absolute top-4 right-4 text-muted hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="space-y-1">
              <span className="text-[8px] tracking-[0.3em] font-medium uppercase text-primary">
                Review
              </span>
              <h3 className="font-heading text-2xl font-light tracking-tight">
                {editingId ? "Update Review" : "Add Review"}
              </h3>
            </div>
            <form
              onSubmit={handleSubmitReview}
              className="space-y-4 font-body text-xs"
            >
              <div className="space-y-1.5">
                <label className="uppercase tracking-wider text-muted/80">
                  Review text
                </label>
                <textarea
                  required
                  rows={4}
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  className="w-full bg-background border border-foreground/20 p-4 focus:outline-none focus:border-primary text-foreground text-sm resize-none leading-relaxed"
                />
              </div>
              <div className="space-y-1.5">
                <label className="uppercase tracking-wider text-muted/80">
                  Your Location
                </label>
                <input
                  type="text"
                  placeholder="e.g. Lagos, Paris"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full h-12 bg-background border border-foreground/20 px-4 focus:outline-none focus:border-primary text-foreground text-sm"
                />
              </div>
              <button
                type="submit"
                className="btn-luxury w-full h-12 flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />{" "}
                {editingId ? "Save update" : "Submit"}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
