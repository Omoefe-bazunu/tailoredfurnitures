"use client";

import React, { useState, useEffect } from "react";
import { Plus, Minus } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

export default function CommissionFAQs() {
  const [openIndex, setOpenIndex] = useState(null);
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "faq"), orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEntries(items);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="space-y-12 border-t border-foreground/5 pt-20 pb-16 max-w-4xl mx-auto w-full">
      <div className="text-center space-y-2">
        <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-primary">
          Exhibition Inquiries
        </p>
        <h2 className="font-heading text-3xl font-light">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="border-t border-foreground/10 divide-y divide-foreground/10 font-body text-xs">
        {entries.length === 0 ? (
          <p className="text-muted text-center py-6">No data entries loaded.</p>
        ) : (
          entries.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={item.id || idx} className="py-4">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex justify-between items-center py-2 text-left hover:text-primary transition-colors font-medium text-sm text-foreground uppercase tracking-wider"
                >
                  <span>{item.q}</span>
                  {isOpen ? (
                    <Minus className="w-3.5 h-3.5 text-muted" />
                  ) : (
                    <Plus className="w-3.5 h-3.5 text-muted" />
                  )}
                </button>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100 pt-2" : "grid-rows-[0fr] opacity-0"}`}
                >
                  <div className="overflow-hidden">
                    <p className="text-muted font-light leading-relaxed text-sm max-w-3xl pb-2">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
