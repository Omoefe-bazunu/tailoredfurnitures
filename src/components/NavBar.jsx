"use client";

import React, { useState, useSyncExternalStore } from "react";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import Image from "next/image"; // Injected Next Image tool layer

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
  const isClient = useIsClient();
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

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
              width={24}
              height={24}
              className="object-contain block dark:hidden transition-transform duration-500 group-hover:scale-105"
              priority
            />
            {/* Render on Darkmode */}
            <Image
              src="/logow.png"
              alt="Tailored Furnitures Logo"
              width={24}
              height={24}
              className="object-contain hidden dark:block transition-transform duration-500 group-hover:scale-105"
              priority
            />
          </div>
          <span className="font-body text-lg tracking-[0.35em] uppercase font-semibold text-foreground">
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
            href="/studio/orders"
            className="font-body text-[11px] tracking-[0.25em] uppercase text-foreground hover:text-foreground transition-colors duration-300"
          >
            Studio Orders
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/cart"
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
            className="block font-body text-[11px] tracking-[0.25em] uppercase text-foreground/70 hover:text-foreground transition-colors duration-300"
          >
            The Gallery
          </Link>
          <Link
            href="/commissions"
            className="block font-body text-[11px] tracking-[0.25em] uppercase text-foreground/70 hover:text-foreground transition-colors duration-300"
          >
            Bespoke Commissions
          </Link>
          <Link
            href="/studio/orders"
            className="block font-body text-[11px] tracking-[0.25em] uppercase text-foreground/70 hover:text-foreground transition-colors duration-300"
          >
            Studio Orders
          </Link>
        </div>
      )}
    </header>
  );
}
