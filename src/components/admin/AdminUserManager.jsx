"use client";

import React, { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  deleteDoc,
} from "firebase/firestore";
import {
  User,
  Mail,
  Shield,
  ChevronDown,
  ChevronUp,
  Trash2,
  Search,
  Loader2,
} from "lucide-react";

export default function AdminUserManager() {
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedUserId, setExpandedUserId] = useState(null);

  // Real-time synchronization loop with your Firestore users collection instance
  useEffect(() => {
    const q = query(collection(db, "users"), orderBy("role", "asc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsersList(items);
        setLoading(false);
      },
      (error) => {
        console.error("Firestore user registry subscription failed:", error);
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  const handleDeleteUser = async (userId, userEmail) => {
    if (
      confirm(
        `Admin Warning: Are you sure you want to permanently delete account record entry for ${userEmail}? This action cannot be undone.`,
      )
    ) {
      try {
        await deleteDoc(doc(db, "users", userId));
      } catch (err) {
        console.error("User record deletion rejected:", err);
      }
    }
  };

  // Safe client filter query evaluation
  const filteredUsers = usersList.filter((account) => {
    const targetSearch = searchTerm.toLowerCase();
    const matchName = account.name?.toLowerCase() || "";
    const matchEmail = account.email?.toLowerCase() || "";
    return (
      matchName.includes(targetSearch) || matchEmail.includes(targetSearch)
    );
  });

  if (loading) {
    return (
      <div className="w-full py-12 flex items-center justify-center text-muted-foreground font-body text-xs uppercase tracking-widest">
        <Loader2 className="w-4 h-4 animate-spin mr-2 text-primary" /> Loading
        user directory...
      </div>
    );
  }

  return (
    <div className="w-full bg-card border border-foreground/10 p-6 md:p-8 space-y-6 relative font-body text-xs text-foreground">
      <div className="absolute inset-0 border border-foreground/5 pointer-events-none m-2"></div>

      {/* Control Row with Filter Search Box */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10 border-b border-foreground/5 pb-4">
        <div className="space-y-0.5">
          <h3 className="font-heading text-xl font-light">
            Registered Profiles
          </h3>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
            Total Members: {usersList.length}
          </p>
        </div>

        {/* Search Bar Input */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-9 bg-background border border-foreground/20 pl-9 pr-4 focus:outline-none text-foreground text-sm"
          />
        </div>
      </div>

      {/* Dynamic Collapsible List Container */}
      <div className="relative z-10 space-y-3">
        {filteredUsers.length === 0 ? (
          <p className="text-center py-6 text-muted-foreground uppercase tracking-widest">
            No matching user profiles found.
          </p>
        ) : (
          filteredUsers.map((account) => {
            const isExpanded = expandedUserId === account.id;
            const accountRole = account.role || "client";
            const isAdminAccount =
              accountRole === "admin" ||
              account.email === "tailoredfurnitures@gmail.com";

            return (
              <div
                key={account.id}
                className={`border transition-all duration-300 ${
                  isExpanded
                    ? "border-primary/40 bg-background/50"
                    : "border-foreground/10 bg-background/20"
                }`}
              >
                {/* Header Row summary line snippet */}
                <div
                  onClick={() =>
                    setExpandedUserId(isExpanded ? null : account.id)
                  }
                  className="p-4 flex items-center justify-between cursor-pointer hover:bg-foreground/[0.01] select-none gap-4"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-full border border-foreground/5 bg-card flex items-center justify-center shrink-0">
                      <User className="w-3.5 h-3.5 text-muted-foreground" />
                    </div>
                    <div className="min-w-0 space-y-0.5">
                      <span className="font-medium text-sm text-foreground block truncate">
                        {account.name || "Anonymous User"}
                      </span>
                      <span className="text-[10px] text-muted-foreground block truncate">
                        {account.email}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    {/* Dynamic Structural Badging System */}
                    <span
                      className={`text-[8px] font-semibold uppercase tracking-widest px-2 py-0.5 border ${
                        isAdminAccount
                          ? "bg-primary/5 text-primary border-primary/20"
                          : "bg-muted text-muted-foreground border-foreground/5"
                      }`}
                    >
                      {accountRole}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                </div>

                {/* Expanded Details Section Drawer */}
                {isExpanded && (
                  <div className="px-4 pb-4 pt-2 border-t border-foreground/5 bg-background/10 space-y-4 animate-fade-in">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[11px] bg-card p-3 border border-foreground/5 font-light">
                      <div className="space-y-1">
                        <span className="text-muted-foreground block uppercase text-[8px] tracking-wider font-medium">
                          User Id
                        </span>
                        <strong className="text-foreground select-all font-mono break-all">
                          {account.id}
                        </strong>
                      </div>
                      <div className="space-y-1">
                        <span className="text-muted-foreground block uppercase text-[8px] tracking-wider font-medium">
                          Email Address
                        </span>
                        <span className="flex items-center gap-1.5 text-foreground">
                          <Mail className="w-3 h-3 text-muted-foreground" />{" "}
                          {account.email}
                        </span>
                      </div>
                    </div>

                    {/* Operational Action Footer Bar */}
                    <div className="flex justify-end pt-2 border-t border-foreground/5">
                      <button
                        disabled={isAdminAccount}
                        onClick={() =>
                          handleDeleteUser(account.id, account.email)
                        }
                        className="h-8 px-3 border border-red-500/10 bg-card hover:border-red-500/30 text-red-500 transition-colors flex items-center gap-1 font-medium disabled:opacity-30 disabled:hover:border-red-500/10 disabled:hover:text-red-500 disabled:cursor-not-allowed"
                        title={
                          isAdminAccount
                            ? "Administrative accounts cannot be deleted directly"
                            : "Delete record entry"
                        }
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete Account
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
  );
}
