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
  deleteDoc,
  addDoc,
} from "firebase/firestore";
import {
  Trash2,
  Edit3,
  Plus,
  X,
  Save,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function FaqManager() {
  const [faqs, setFaqs] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  // Form input parameters state
  const [q, setQ] = useState("");
  const [a, setA] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  useEffect(() => {
    const queryRef = query(collection(db, "faq"), orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(queryRef, (snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFaqs(items);
    });
    return () => unsubscribe();
  }, []);

  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    if (!q.trim() || !a.trim()) return;

    try {
      if (editingId) {
        await updateDoc(doc(db, "faq", editingId), {
          q: q.trim(),
          a: a.trim(),
          updatedAt: new Date().toISOString(),
        });
        setEditingId(null);
      } else {
        await addDoc(collection(db, "faq"), {
          q: q.trim(),
          a: a.trim(),
          createdAt: new Date().toISOString(),
        });
      }
      setQ("");
      setA("");
      setIsEditorOpen(false);
    } catch (err) {
      console.error("Admin FAQ operation failed:", err);
    }
  };

  const handleAdminDelete = async (id) => {
    if (confirm("Are you sure you want to permanently delete this FAQ item?")) {
      try {
        await deleteDoc(doc(db, "faq", id));
      } catch (err) {
        console.error("Deletion operation rejected:", err);
      }
    }
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="w-full bg-card border border-foreground/10 p-6 md:p-8 space-y-8 relative">
      <div className="absolute inset-0 border border-foreground/5 pointer-events-none m-2"></div>

      {/* Header controls row layout */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10 border-b border-foreground/5 pb-4">
        <div className="space-y-1">
          <h2 className="font-heading text-2xl font-light tracking-tight">
            FAQ Controls
          </h2>
        </div>
        <button
          onClick={() => {
            setEditingId(null);
            setQ("");
            setA("");
            setIsEditorOpen(true);
          }}
          className="btn-luxury text-[9px] tracking-widest uppercase font-semibold h-10 px-4 flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" /> Create FAQ
        </button>
      </div>

      {/* Collapsible item listing mapping layout */}
      <div className="relative z-10 font-body text-xs space-y-4">
        {faqs.length === 0 ? (
          <p className="text-muted text-center py-6">No data entries loaded.</p>
        ) : (
          faqs.map((item) => {
            const isExpanded = expandedId === item.id;
            return (
              <div
                key={item.id}
                className="border border-foreground/15 bg-background/50 overflow-hidden transition-all duration-300"
              >
                {/* Collapsible header summary block row */}
                <div
                  onClick={() => toggleExpand(item.id)}
                  className="p-4 flex items-center justify-between cursor-pointer hover:bg-foreground/[0.02] select-none"
                >
                  <span className="font-medium text-foreground text-sm block truncate pr-4">
                    {item.q}
                  </span>
                  <div className="flex items-center shrink-0">
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-muted" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-muted" />
                    )}
                  </div>
                </div>

                {/* Collapsible inner summary field */}
                {isExpanded && (
                  <div className="px-4 pb-4 pt-2 border-t border-foreground/5 bg-background/20 space-y-4 animate-fade-in">
                    <div className="space-y-1">
                      <span className="text-[9px] tracking-wider uppercase text-muted font-medium">
                        Answer Text
                      </span>
                      <p className="font-light text-sm text-muted leading-relaxed max-w-3xl bg-card p-3 border border-foreground/5">
                        {item.a}
                      </p>
                    </div>

                    {/* Operational Action Block elements */}
                    <div className="flex items-center justify-end gap-3 pt-2 border-t border-foreground/5">
                      <button
                        onClick={() => {
                          setEditingId(item.id);
                          setQ(item.q);
                          setA(item.a);
                          setIsEditorOpen(true);
                        }}
                        className="h-9 px-3 border border-foreground/10 bg-card hover:border-foreground/30 text-muted hover:text-foreground transition-colors flex items-center gap-1.5 font-medium tracking-wide"
                      >
                        <Edit3 className="w-3.5 h-3.5" /> Edit
                      </button>
                      <button
                        onClick={() => handleAdminDelete(item.id)}
                        className="h-9 px-3 border border-red-500/10 bg-card hover:border-red-500/30 text-muted hover:text-red-500 transition-colors flex items-center gap-1.5 font-medium tracking-wide"
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

      {/* Admin Creator/Editor Modal Panel Overlay */}
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
                {editingId ? "Update FAQ" : "Create FAQ"}
              </h3>
            </div>
            <form
              onSubmit={handleAdminSubmit}
              className="space-y-4 font-body text-xs"
            >
              <div className="space-y-1.5">
                <label className="uppercase tracking-wider text-muted">
                  Question Text
                </label>
                <input
                  type="text"
                  required
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  className="w-full h-11 bg-background border border-foreground/20 px-4 focus:outline-none text-foreground text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <label className="uppercase tracking-wider text-muted">
                  Answer Text
                </label>
                <textarea
                  required
                  rows={5}
                  value={a}
                  onChange={(e) => setA(e.target.value)}
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
