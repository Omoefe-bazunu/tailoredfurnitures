import React from "react";

export default function ArtworkReviews({ reviews }) {
  return (
    <div className="border-t hidden border-foreground/5 pt-16 space-y-8">
      <div className="space-y-1">
        <p className="font-body text-[10px] tracking-widest uppercase text-muted font-medium">
          Verified Client Reviews
        </p>
        <h2 className="font-heading text-3xl font-light">
          Clients&apos; Thoughts on this Masterpiece
        </h2>
      </div>

      {reviews && reviews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map((review, idx) => (
            <div
              key={idx}
              className="p-6 border border-foreground/5 bg-card relative"
            >
              <div className="absolute inset-0 border border-foreground/[0.01] pointer-events-none m-1"></div>
              <p className="font-heading italic text-base text-foreground/80 leading-relaxed mb-6">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="flex justify-between items-center text-[10px] tracking-widest uppercase border-t border-foreground/5 pt-4">
                <span className="font-semibold text-foreground">
                  {review.reviewer}
                </span>
                <span className="text-muted/60"> {review.role}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full p-8 border border-dashed border-foreground/10 text-center font-body text-xs tracking-widest uppercase text-muted">
          First Edition Release Collector sentiment registering on acquisition
          settlement.
        </div>
      )}
    </div>
  );
}
