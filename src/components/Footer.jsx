import React from "react";
import Link from "next/link"; // Next.js performance route layer injection

export default function Footer() {
  return (
    <footer className="w-full bg-[#111111] border-t border-white/10 pt-16 pb-12 px-6 md:px-12 transition-colors duration-500">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 pb-12">
        {/* Left Column: Brand Vision Copy */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-5 bg-white relative flex flex-col justify-between p-[1px]">
              <div className="w-full h-[4px] bg-[#111111]"></div>
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

        {/* Center Column: Interactive Exhibition Portals */}
        <div className="md:col-span-3 space-y-3">
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

        {/* Right Column: Contact Concierge Credentials */}
        <div className="md:col-span-4 space-y-3">
          <p className="font-body text-[10px] tracking-widest uppercase text-white/40 font-semibold">
            Studio Communications
          </p>
          <ul className="space-y-2 font-body text-xs text-white/70 font-light">
            <li>
              General:{" "}
              <a
                href="mailto:info@craftedfurnitures.com"
                className="hover:text-white transition-colors underline decoration-white/10"
              >
                info@craftedfurnitures.com
              </a>{" "}
            </li>
            <li>
              Bookings:{" "}
              <a
                href="mailto:bookings@craftedfurnitures.com"
                className="hover:text-white transition-colors underline decoration-white/10"
              >
                bookings@craftedfurnitures.com
              </a>{" "}
            </li>
            <li className="pt-2 text-[10px] tracking-widest uppercase text-white/60 flex gap-4">
              <a
                href="https://instagram.com/craftedfurnitures"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                Instagram
              </a>{" "}
              <a
                href="https://facebook.com/craftedfurnitures"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                Facebook
              </a>{" "}
              <a
                href="https://tiktok.com/@craftedfurnitures"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                TikTok
              </a>{" "}
            </li>
          </ul>
        </div>
      </div>

      {/* Sub-Footer Meta Attributions */}
      <div className="max-w-7xl mx-auto border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center text-[9px] tracking-[0.3em] uppercase text-white/60 gap-4">
        <p>© 2026 Tailored Furnitures LLC. All Rights Reserved.</p>
        <p className="font-medium text-white/40">
          Interior Decorations & Wall Hang Arts Only
        </p>
      </div>
    </footer>
  );
}
