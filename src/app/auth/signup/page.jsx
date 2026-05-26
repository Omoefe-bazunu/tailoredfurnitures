"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";
import Link from "next/link";

export default function SignUp() {
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleRegistration = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setIsSubmitting(true);

    try {
      await register(name, email, password);
      window.location.href = "/gallery"; // Route straight to exhibition library parameters on registration
    } catch (err) {
      setErrorMsg(err.message?.replace("Firebase:", "") || "SignUp Failed.");
    }
    {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-[85vh] w-full flex items-center justify-center px-6 py-12 bg-background text-foreground transition-colors duration-500 gallery-fade">
      <div className="w-full max-w-md premium-frame bg-card p-8 md:p-10 relative shadow-xl">
        <div className="absolute inset-0 border border-foreground/10 pointer-events-none m-3"></div>

        <form
          onSubmit={handleRegistration}
          className="space-y-6 relative z-10 font-body text-xs"
        >
          <div className="text-center space-y-2 border-b border-foreground/5 pb-4">
            <span className="text-[9px] font-medium uppercase tracking-[0.3em] text-primary">
              Tailored Furnitures
            </span>
            <h1 className="font-heading text-3xl font-light tracking-tight">
              Create Account
            </h1>
          </div>

          {errorMsg && (
            <div className="bg-red-500/5 border border-red-500/20 text-red-500 p-3 flex items-start gap-2 leading-relaxed">
              <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Full Name field frame block */}
          <div className="space-y-2">
            <label className="block text-muted/80 uppercase tracking-wider font-medium">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted/40" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-12 bg-background border border-foreground/20 pl-11 pr-4 focus:outline-none focus:border-primary text-foreground font-light text-sm"
              />
            </div>
          </div>

          {/* Email input field block */}
          <div className="space-y-2">
            <label className="block text-muted/80 uppercase tracking-wider font-medium">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted/40" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 bg-background border border-foreground/20 pl-11 pr-4 focus:outline-none focus:border-primary text-foreground font-light text-sm"
              />
            </div>
          </div>

          {/* Secured Password setup block */}
          <div className="space-y-2">
            <label className="block text-muted/80 uppercase tracking-wider font-medium">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted/40" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 bg-background border border-foreground/20 pl-11 pr-12 focus:outline-none focus:border-primary text-foreground font-light text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted/50 hover:text-foreground transition-colors"
                aria-label="Toggle password view state profile parameters"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Action Execution Button Block */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-luxury w-full h-12 flex items-center justify-center disabled:opacity-50"
          >
            {isSubmitting ? (
              <span className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                Submit <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </>
            )}
          </button>

          <div className="text-center pt-2 text-muted text-[11px] font-light">
            Already Signed Up?{" "}
            <Link
              href="/auth/signin"
              className="text-primary hover:underline transition-colors font-medium"
            >
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
