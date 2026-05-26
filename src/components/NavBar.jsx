"use client";

import React, { useState, useSyncExternalStore } from "react";
import { ShoppingBag, Menu, X, LogOut, UserCheck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext"; // Injected security layer hook
import Link from "next/link";
import Image from "next/image";

// Recommended SSR-safe client detection — no setState, no effect
function useIsClient() {
  return useSyncExternalStore(
    () => () => {}, // no-op subscribe
    () => true, // client snapshot
    () => false, // server snapshot
  );
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authPromptOpen, setAuthPromptOpen] = useState(false); // Controls the cart login modal
  const isClient = useIsClient();
  const { getCartCount } = useCart();
  const { user, logout } = useAuth(); // Extracted dynamic auth state and actions
  const cartCount = getCartCount();

  const handleCartClick = (e) => {
    if (!user) {
      e.preventDefault(); // Intercept and cancel raw Link redirect behavior
      setAuthPromptOpen(true);
    }
  };

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-background/80 backdrop-blur-md border-b border-foreground/5 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 group">
          {/* Logo container utilizing native utility handles for theme matching configuration */}
          <div className="relative w-8 h-8 flex items-center justify-center">
            {/* Render on Lightmode */}
            <Image
              src="/logo.png"
              alt="Tailored Furnitures Logo"
              width={20}
              height={20}
              className="object-contain block dark:hidden transition-transform duration-500 group-hover:scale-105"
              priority
            />
            {/* Render on Darkmode */}
            <Image
              src="/logow.png"
              alt="Tailored Furnitures Logo"
              width={20}
              height={20}
              className="object-contain hidden dark:block transition-transform duration-500 group-hover:scale-105"
              priority
            />
          </div>
          <span className="font-body text-xs sm:text-sm tracking-[0.35em] uppercase font-semibold text-foreground">
            Tailored Furnitures
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          <Link
            href="/gallery"
            className="font-body text-[11px] tracking-[0.25em] uppercase text-foreground hover:text-foreground transition-colors duration-300"
          >
            The Gallery
          </Link>
          <Link
            href="/commissions"
            className="font-body text-[11px] tracking-[0.25em] uppercase text-foreground hover:text-foreground transition-colors duration-300"
          >
            Bespoke Commissions
          </Link>
          <Link
            href="/orders"
            className="font-body text-[11px] tracking-[0.25em] uppercase text-foreground hover:text-foreground transition-colors duration-300"
          >
            Orders
          </Link>

          {/* Desktop Conditional Auth Button Action Handles */}
          {isClient &&
            (user ? (
              <button
                onClick={logout}
                className="font-body text-[11px] tracking-[0.25em] uppercase text-red-500/80 hover:text-red-500 transition-colors duration-300 flex items-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5 stroke-[1.5]" /> Sign Out
              </button>
            ) : (
              <Link
                href="/auth/signin"
                className="font-body text-[11px] tracking-[0.25em] uppercase text-primary hover:opacity-80 transition-opacity duration-300 flex items-center gap-1.5"
              >
                <UserCheck className="w-3.5 h-3.5 stroke-[1.5]" /> Sign In
              </Link>
            ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/cart"
            onClick={handleCartClick}
            className="relative p-2 text-foreground hover:opacity-70 transition-opacity"
            aria-label="View Private Vault Cart"
          >
            <ShoppingBag className="w-4 h-4 stroke-[1.5]" />
            {isClient && cartCount > 0 && (
              <span className="absolute top-1 right-1 min-w-[14px] h-[14px] bg-primary text-primary-foreground font-sans text-[8px] font-bold rounded-full flex items-center justify-center px-0.5 animate-fade-in">
                {cartCount}
              </span>
            )}
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-foreground md:hidden hover:opacity-70 transition-opacity"
          >
            {mobileMenuOpen ? (
              <X className="w-4 h-4" />
            ) : (
              <Menu className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-foreground/5 bg-background/95 backdrop-blur-md px-6 py-6 space-y-4">
          <Link
            href="/gallery"
            onClick={() => setMobileMenuOpen(false)}
            className="block font-body text-[11px] tracking-[0.25em] uppercase text-foreground/70 hover:text-foreground transition-colors duration-300"
          >
            The Gallery
          </Link>
          <Link
            href="/commissions"
            onClick={() => setMobileMenuOpen(false)}
            className="block font-body text-[11px] tracking-[0.25em] uppercase text-foreground/70 hover:text-foreground transition-colors duration-300"
          >
            Bespoke Commissions
          </Link>
          <Link
            href="/orders"
            onClick={() => setMobileMenuOpen(false)}
            className="block font-body text-[11px] tracking-[0.25em] uppercase text-foreground/70 hover:text-foreground transition-colors duration-300"
          >
            Orders
          </Link>

          {/* Mobile Conditional Auth Button Action Handles */}
          {isClient &&
            (user ? (
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left font-body text-[11px] tracking-[0.25em] uppercase text-red-500/80 hover:text-red-500 transition-colors duration-300 pt-2 border-t border-foreground/5 flex items-center gap-2"
              >
                <LogOut className="w-4 h-4 stroke-[1.5]" /> Sign Out
              </button>
            ) : (
              <Link
                href="/auth/signin"
                onClick={() => setMobileMenuOpen(false)}
                className="block font-body text-[11px] tracking-[0.25em] uppercase text-primary hover:opacity-80 transition-opacity duration-300 pt-2 border-t border-foreground/5 items-center gap-2"
              >
                <UserCheck className="w-4 h-4 stroke-[1.5]" /> Sign In /
                Register
              </Link>
            ))}
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────────
         MINIMALIST SECURE CART SIGN IN PROMPT MODAL
         ────────────────────────────────────────────────────────────────────── */}
      {authPromptOpen && (
        <div className="fixed inset-0 z-[100] top-32 bg-background/90 backdrop-blur-sm flex items-center justify-center p-6 gallery-fade">
          <div className="w-full max-w-sm bg-card border border-foreground/10 p-6 relative shadow-2xl space-y-6">
            <div className="absolute inset-0 border border-foreground/5 pointer-events-none m-2"></div>

            {/* <button
              onClick={() => setAuthPromptOpen(false)}
              className="absolute top-4 right-4 text-muted hover:text-foreground transition-colors"
              aria-label="Dismiss Portal Link Prompt"
            >
              <X className="w-4 h-4" />
            </button> */}

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 border border-primary/20 bg-primary/5 rounded-full flex items-center justify-center shrink-0">
                <ShoppingBag className="w-4 h-4 text-primary stroke-[1.5]" />
              </div>
              <div className="space-y-1 pt-1">
                <h3 className="font-heading text-lg font-light tracking-tight text-foreground">
                  SignIn Required for Cart Access
                </h3>
                <p className="font-body text-xs text-muted leading-relaxed">
                  You must be authenticated to view your cart and finalize your
                  orders. Please sign in or create an account.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 font-body text-[10px] tracking-widest uppercase font-semibold">
              <button
                onClick={() => setAuthPromptOpen(false)}
                className="h-11 border border-foreground/20 hover:border-foreground bg-transparent text-foreground transition-colors text-center"
              >
                Cancel View
              </button>
              <Link
                href="/auth/signin"
                onClick={() => setAuthPromptOpen(false)}
                className="btn-luxury h-11 flex items-center justify-center text-center"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
