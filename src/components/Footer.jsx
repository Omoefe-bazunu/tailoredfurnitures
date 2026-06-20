import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-[#111111] border-t border-white/10 pt-16 pb-12 px-6 md:px-12 transition-colors duration-500">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 pb-12">
        {/* Left Column: Brand Vision Copy */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 flex items-center justify-center">
              <Image
                src="/logow.png"
                alt="Tailored Furnitures Logo"
                width={16}
                height={16}
                className="object-contain transition-transform duration-500 group-hover:scale-105"
                priority
              />
            </div>
            <span className="font-body text-[10px] tracking-[0.4em] uppercase font-bold text-white">
              Tailored Furnitures
            </span>
          </div>
          <p className="font-body font-light text-xs text-white/70 leading-relaxed max-w-sm">
            To craft intricate set pieces that elevate the luxury of your home
            or personal space. Each design is tailored explicitly to the
            micro-details of modern architectural environments.
          </p>
        </div>

        {/* Center Column: Interactive Exhibition Portals & Legal Links */}
        <div className="md:col-span-3 space-y-6">
          <div className="space-y-3">
            <p className="font-body text-[10px] tracking-widest uppercase text-white/40 font-semibold">
              Exhibitions
            </p>
            <ul className="space-y-2 font-body text-xs text-white/70 font-light">
              <li>
                <Link
                  href="/gallery?filter=Italian"
                  className="hover:text-white transition-colors"
                >
                  The Italian Collection
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery?filter=French"
                  className="hover:text-white transition-colors"
                >
                  The French Collection
                </Link>
              </li>

              <li>
                <Link
                  href="/commissions"
                  className="hover:text-white transition-colors"
                >
                  Custom Installations
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Pages Sub-Section */}
          <div className="space-y-3 pt-2 border-t border-white/5">
            <p className="font-body text-[10px] tracking-widest uppercase text-white/40 font-semibold">
              Legal & Terms
            </p>
            <ul className="space-y-2 font-body text-xs text-white/70 font-light">
              <li>
                <Link
                  href="/policies"
                  className="hover:text-white transition-colors"
                >
                  Studio Policies
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-white transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: Contact Concierge Credentials */}
        <div className="md:col-span-4 space-y-4">
          <div className="space-y-2">
            <p className="font-body text-[10px] tracking-widest uppercase text-white/40 font-semibold">
              Contact Concierge
            </p>
            <ul className="space-y-2 font-body text-xs text-white/70 font-light">
              <li>
                General:{" "}
                <a
                  href="mailto:info@tailoredfurnitures.com"
                  className="hover:text-white transition-colors underline decoration-white/10"
                >
                  info@tailoredfurnitures.com
                </a>
              </li>
              <li>
                Bookings:{" "}
                <a
                  href="mailto:bookings@tailoredfurnitures.com"
                  className="hover:text-white transition-colors underline decoration-white/10"
                >
                  commissions@tailoredfurnitures.com
                </a>
              </li>
              <li>
                Call:{" "}
                <a
                  href="tel:+14482191390"
                  className="hover:text-white transition-colors font-medium tracking-wide"
                >
                  +1 (448) 219-1390
                </a>
              </li>
            </ul>
          </div>

          {/* Physical Headquarters Address Block */}
          <div className="space-y-1 pt-2 border-t border-white/5">
            <p className="font-body text-[10px] tracking-widest uppercase text-white/40 font-semibold">
              Contact Address
            </p>
            <p className="font-body font-light text-xs text-white/60 leading-relaxed">
              30N Gould St Ste N<br />
              Sheridan, WY 82801
            </p>
          </div>
        </div>
      </div>

      {/* Sub-Footer Meta Attributions */}
      <div className="max-w-7xl mx-auto border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center text-[9px] tracking-[0.3em] uppercase text-white/60 gap-4">
        <p>© 2026 Tailored Furnitures. All Rights Reserved.</p>
        <p className="font-medium text-white/40">
          Interior Decorations & Wall Hang Arts Only
        </p>
      </div>
    </footer>
  );
}
