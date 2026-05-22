"use client";

import React, { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

export default function CommissionForm() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectScope: "Residential",
    woodType: "Walnut",
    dimensions: "",
    brief: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ready to plug into your Firebase collection & Resend API pipelines
    setFormSubmitted(true);
  };

  if (formSubmitted) {
    return (
      <div className="w-full max-w-2xl mx-auto p-12 border border-foreground/10 bg-card text-center space-y-4 gallery-fade">
        <CheckCircle2 className="w-10 h-10 text-primary mx-auto stroke-[1.5]" />
        <h3 className="font-heading text-2xl font-light">
          Intake Brief Received
        </h3>
        <p className="font-body text-xs text-muted max-w-md mx-auto leading-relaxed">
          Our technical execution team will review your project dimensions and
          route an initial consultation itinerary to{" "}
          <span className="text-foreground font-medium">{formData.email}</span>{" "}
          within 48 business hours.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto premium-frame bg-card p-8 md:p-12 relative shadow-xl">
      <div className="absolute inset-0 border border-foreground/10 pointer-events-none m-3"></div>

      <form
        onSubmit={handleSubmit}
        className="space-y-8 relative z-10 font-body text-xs"
      >
        <div className="space-y-2 border-b border-foreground/5 pb-4">
          <h2 className="font-heading text-2xl font-light tracking-tight">
            Project Specifications
          </h2>
          <p className="text-[10px] text-muted uppercase tracking-widest">
            Provide structural allocation metrics
          </p>
        </div>

        {/* Identity Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-muted/80 uppercase tracking-wider font-medium">
              Full Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full h-12 bg-background border border-foreground/20 px-4 focus:outline-none focus:border-primary text-foreground font-light text-sm"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-muted/80 uppercase tracking-wider font-medium">
              Email Address
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full h-12 bg-background border border-foreground/20 px-4 focus:outline-none focus:border-primary text-foreground font-light text-sm"
            />
          </div>
        </div>

        {/* Parameters Select Options Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-muted/80 uppercase tracking-wider font-medium">
              Project Scope
            </label>
            <select
              value={formData.projectScope}
              onChange={(e) =>
                setFormData({ ...formData, projectScope: e.target.value })
              }
              className="w-full h-12 bg-background border border-foreground/20 px-4 focus:outline-none focus:border-primary text-foreground font-light text-sm cursor-pointer"
            >
              <option value="Residential">Private Luxury Residence</option>
              <option value="Commercial">Corporate / Hospitality Space</option>
              <option value="Yacht">Marine / Yacht Interior</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-muted/80 uppercase tracking-wider font-medium">
              Primary Material Timber
            </label>
            <select
              value={formData.woodType}
              onChange={(e) =>
                setFormData({ ...formData, woodType: e.target.value })
              }
              className="w-full h-12 bg-background border border-foreground/20 px-4 focus:outline-none focus:border-primary text-foreground font-light text-sm cursor-pointer"
            >
              <option value="Walnut">Deep Walnut (Amalfi Core)</option>
              <option value="Oak">Carved Oak (Parisian Cathedral Core)</option>
              <option value="Teak">Sculpted Teak (Mediterranean Core)</option>
              <option value="Ebony">Dark Charcoal Ebony</option>
            </select>
          </div>
        </div>

        {/* Structural Spatial Dimensions */}
        <div className="space-y-2">
          <label className="block text-muted/80 uppercase tracking-wider font-medium">
            Target Space Dimensions (e.g., 60&ldquo; x 80&ldquo; or Wall Metric)
          </label>
          <input
            type="text"
            required
            placeholder="Width x Height x Desired Relief Depth"
            value={formData.dimensions}
            onChange={(e) =>
              setFormData({ ...formData, dimensions: e.target.value })
            }
            className="w-full h-12 bg-background border border-foreground/20 px-4 focus:outline-none focus:border-primary text-foreground font-light text-sm"
          />
        </div>

        {/* Artistic Concept Brief Description */}
        <div className="space-y-2">
          <label className="block text-muted/80 uppercase tracking-wider font-medium">
            Creative Narrative Blueprint & Brief
          </label>
          <textarea
            rows="5"
            required
            placeholder="Describe the aesthetic direction, narrative tone, and shadow-play density desired for the installation..."
            value={formData.brief}
            onChange={(e) =>
              setFormData({ ...formData, brief: e.target.value })
            }
            className="w-full bg-background border border-foreground/20 p-4 focus:outline-none focus:border-primary text-foreground font-light text-sm resize-none leading-relaxed"
          />
        </div>

        {/* Submission Action */}
        <button type="submit" className="btn-luxury w-full h-14">
          Submit Brief <Send className="w-3.5 h-3.5 ml-1" />
        </button>
      </form>
    </div>
  );
}
