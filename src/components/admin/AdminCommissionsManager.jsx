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
  Layers,
  Sliders,
} from "lucide-react";

export default function AdminCommissionsManager() {
  const [commissions, setCommissions] = useState([]);
  const [scopes, setScopes] = useState([]);
  const [materials, setMaterials] = useState([]);

  // Collapse toggles
  const [expandedCommId, setExpandedCommId] = useState(null);

  // Form handling state entries
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editorTarget, setEditorTarget] = useState("scope"); // 'scope' or 'material'
  const [editingId, setEditingId] = useState(null);
  const [inputName, setInputName] = useState("");

  useEffect(() => {
    // 1. Monitor Incoming Customer Requests
    const qComm = query(
      collection(db, "commissions"),
      orderBy("createdAt", "desc"),
    );
    const unsubComm = onSnapshot(qComm, (snap) => {
      setCommissions(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    // 2. Monitor Custom Scopes
    const qScope = query(
      collection(db, "projectScopes"),
      orderBy("createdAt", "asc"),
    );
    const unsubScope = onSnapshot(qScope, (snap) => {
      setScopes(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    // 3. Monitor Materials Option Set
    const qMat = query(
      collection(db, "materials"),
      orderBy("createdAt", "asc"),
    );
    const unsubMat = onSnapshot(qMat, (snap) => {
      setMaterials(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
      unsubComm();
      unsubScope();
      unsubMat();
    };
  }, []);

  const handleOptionSubmit = async (e) => {
    e.preventDefault();
    if (!inputName.trim()) return;

    const collectionName =
      editorTarget === "scope" ? "projectScopes" : "materials";

    try {
      if (editingId) {
        await updateDoc(doc(db, collectionName, editingId), {
          name: inputName.trim(),
          updatedAt: new Date().toISOString(),
        });
      } else {
        await addDoc(collection(db, collectionName), {
          name: inputName.trim(),
          createdAt: new Date().toISOString(),
        });
      }
      setInputName("");
      setEditingId(null);
      setIsEditorOpen(false);
    } catch (err) {
      console.error("Option save failed:", err);
    }
  };

  const handleOptionDelete = async (id, target) => {
    if (
      confirm(
        "Are you sure you want to permanently delete this option? This will affect the public dropdown form.",
      )
    ) {
      const collectionName = target === "scope" ? "projectScopes" : "materials";
      await deleteDoc(doc(db, collectionName, id));
    }
  };

  const handleCommissionDelete = async (id) => {
    if (
      confirm(
        "Are you sure you want to delete this submitted request from the log?",
      )
    ) {
      await deleteDoc(doc(db, "commissions", id));
    }
  };

  return (
    <div className="w-full space-y-12 font-body text-xs text-foreground">
      {/* SECTION A: DROPDOWN SELECTION OPTIONS CONFIGURATOR */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Project Scopes Control Box */}
        <div className="bg-card border border-foreground/10 p-6 relative">
          <div className="flex justify-between items-center border-b border-foreground/5 pb-3 mb-4">
            <h3 className="font-heading text-lg font-light flex items-center gap-2">
              <Sliders className="w-4 h-4 text-primary" /> Project Scopes
            </h3>
            <button
              onClick={() => {
                setEditorTarget("scope");
                setEditingId(null);
                setInputName("");
                setIsEditorOpen(true);
              }}
              className="p-1 border border-foreground/10 hover:border-foreground/30 text-xs flex items-center gap-1"
            >
              <Plus className="w-3 h-3" /> Add Scope
            </button>
          </div>
          <div className="space-y-2">
            {scopes.map((s) => (
              <div
                key={s.id}
                className="p-3 bg-background border border-foreground/5 flex justify-between items-center"
              >
                <span className="font-medium text-sm">{s.name}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setEditorTarget("scope");
                      setEditingId(s.id);
                      setInputName(s.name);
                      setIsEditorOpen(true);
                    }}
                    className="text-muted hover:text-foreground p-1"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleOptionDelete(s.id, "scope")}
                    className="text-muted hover:text-red-500 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Materials Control Box */}
        <div className="bg-card border border-foreground/10 p-6 relative">
          <div className="flex justify-between items-center border-b border-foreground/5 pb-3 mb-4">
            <h3 className="font-heading text-lg font-light flex items-center gap-2">
              <Layers className="w-4 h-4 text-primary" /> Form Materials
            </h3>
            <button
              onClick={() => {
                setEditorTarget("material");
                setEditingId(null);
                setInputName("");
                setIsEditorOpen(true);
              }}
              className="p-1 border border-foreground/10 hover:border-foreground/30 text-xs flex items-center gap-1"
            >
              <Plus className="w-3 h-3" /> Add Material
            </button>
          </div>
          <div className="space-y-2">
            {materials.map((m) => (
              <div
                key={m.id}
                className="p-3 bg-background border border-foreground/5 flex justify-between items-center"
              >
                <span className="font-medium text-sm">{m.name}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setEditorTarget("material");
                      setEditingId(m.id);
                      setInputName(m.name);
                      setIsEditorOpen(true);
                    }}
                    className="text-muted hover:text-foreground p-1"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleOptionDelete(m.id, "material")}
                    className="text-muted hover:text-red-500 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION B: LOGGED SUBMISSIONS VIEWER */}
      <div className="bg-card border border-foreground/10 p-6 md:p-8 space-y-6">
        <div className="border-b border-foreground/5 pb-4">
          <h2 className="font-heading text-2xl font-light tracking-tight">
            Submitted Requests
          </h2>
          <p className="text-muted text-[10px] uppercase tracking-wider mt-0.5">
            Review current customer input briefs
          </p>
        </div>

        <div className="space-y-4">
          {commissions.length === 0 ? (
            <p className="text-muted text-center py-6">
              No submission logs found inside database.
            </p>
          ) : (
            commissions.map((comm) => {
              const isExpanded = expandedCommId === comm.id;
              return (
                <div
                  key={comm.id}
                  className="border border-foreground/15 bg-background/50 overflow-hidden"
                >
                  {/* Summary Bar */}
                  <div
                    onClick={() =>
                      setExpandedCommId(isExpanded ? null : comm.id)
                    }
                    className="p-4 flex items-center justify-between cursor-pointer hover:bg-foreground/[0.01] select-none"
                  >
                    <div className="space-y-0.5">
                      <span className="font-medium text-sm block text-foreground">
                        {comm.name}
                      </span>
                      <span className="text-[10px] text-muted block">
                        {comm.email} — {comm.projectScope}
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

                  {/* Expanded Body Content */}
                  {isExpanded && (
                    <div className="px-4 pb-4 pt-2 border-t border-foreground/5 bg-background/10 space-y-4 animate-fade-in">
                      <div className="grid grid-cols-2 gap-4 text-[11px] bg-card p-3 border border-foreground/5">
                        <p>
                          <span className="text-muted block uppercase text-[9px]">
                            Selected Material
                          </span>{" "}
                          <strong>{comm.woodType}</strong>
                        </p>
                        <p>
                          <span className="text-muted block uppercase text-[9px]">
                            Target Dimensions
                          </span>{" "}
                          <strong>{comm.dimensions}</strong>
                        </p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[9px] tracking-wider uppercase text-muted font-medium">
                          Project Description Brief
                        </span>
                        <p className="p-4 bg-card border border-foreground/5 text-xs text-foreground/90 whitespace-pre-line leading-relaxed font-light">
                          {comm.brief}
                        </p>
                      </div>
                      <div className="flex justify-end pt-2 border-t border-foreground/5">
                        <button
                          onClick={() => handleCommissionDelete(comm.id)}
                          className="h-9 px-3 border border-red-500/10 bg-card hover:border-red-500/30 text-red-500 transition-colors flex items-center gap-1.5 font-medium"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Remove Log Entry
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* ADMIN OPTION INJECTOR OVERLAY EDITOR */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-md flex items-center justify-center p-6 gallery-fade">
          <div className="w-full max-w-sm bg-card border border-foreground/10 p-6 relative shadow-2xl space-y-6">
            <button
              onClick={() => setIsEditorOpen(false)}
              className="absolute top-4 right-4 text-muted hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="font-heading text-xl font-light">
              {editingId
                ? `Update ${editorTarget === "scope" ? "Scope" : "Material"}`
                : `Add New ${editorTarget === "scope" ? "Scope" : "Material"}`}
            </h3>
            <form onSubmit={handleOptionSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="uppercase tracking-wider text-muted text-[10px]">
                  Option Value Name
                </label>
                <input
                  type="text"
                  required
                  value={inputName}
                  onChange={(e) => setInputName(e.target.value)}
                  placeholder={
                    editorTarget === "scope"
                      ? "e.g., Office space"
                      : "e.g., Mahogany"
                  }
                  className="w-full h-11 bg-background border border-foreground/20 px-4 focus:outline-none text-foreground text-sm"
                />
              </div>
              <button
                type="submit"
                className="btn-luxury w-full h-11 flex items-center justify-center gap-2"
              >
                <Save className="w-3.5 h-3.5" /> Save Option
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
