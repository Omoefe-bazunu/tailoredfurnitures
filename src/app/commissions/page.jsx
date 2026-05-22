import React from "react";
import CommissionHero from "@/components/commissions/CommissionHero";
import CommissionForm from "@/components/commissions/CommissionForm";
import CommissionProcess from "@/components/commissions/CommissionProcess";
import CommissionFAQs from "@/components/commissions/CommissionFAQs";

export default function Commissions() {
  return (
    <main className="min-h-screen bg-background text-foreground py-12 px-6 md:px-12 lg:px-24 transition-colors duration-500 gallery-fade">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* 1. Introductory Philosophy Presentation */}
        <CommissionHero />

        {/* 2. Structured Lead Specification Form */}
        <CommissionForm />

        {/* 3. Horizontal Operations Roadmap */}
        <CommissionProcess />

        {/* 4. Objections Handling System Accordion */}
        <CommissionFAQs />
      </div>
    </main>
  );
}
