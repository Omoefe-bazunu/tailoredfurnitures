"use client";

import React from "react";
import { MessageSquare } from "lucide-react";

export default function WhatsAppWidget() {
  // Clean parsing formatting removing raw layout string symbols to build a deep structural link
  const whatsappNumber = "18329810893";
  const defaultMessage = encodeURIComponent(
    "Hello, I am interested in discussing a custom premium luxury wall art commission installation.",
  );

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${defaultMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-card border border-foreground/10 hover:border-primary text-foreground hover:text-primary-foreground hover:bg-primary p-4 rounded-full shadow-2xl transition-all duration-300 group flex items-center justify-center backdrop-blur-sm"
      title="Open secure WhatsApp design consultation link channel"
    >
      {/* Subtle background luxury pulse ring element */}
      <span className="absolute inset-0 rounded-full border border-primary/30 animate-ping opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></span>

      {/* Dynamic icon indicator layout node wrapper */}
      <MessageSquare className="w-5 h-5 stroke-[1.5]" />
    </a>
  );
}
