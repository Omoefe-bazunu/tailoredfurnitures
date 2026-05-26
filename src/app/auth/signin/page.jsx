"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Eye, EyeOff, Lock, Mail, ArrowRight, ShieldAlert } from "lucide-react";
import Link from "next/link";

export default function SignIn() {
  const { login, resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");
  const [infoMsg, setInfoMsg] = useState("");
  const [isForgotPasswordMode, setIsForgotPasswordMode] = useState(false);

  const handleAuthAction = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setInfoMsg("");
    setIsSubmitting(true);

    try {
      if (isForgotPasswordMode) {
        await resetPassword(email);
        setInfoMsg(
          "A link has been sent to your email to reset your password. You can also check your spam folder.",
        );
      } else {
        await login(email, password);
        window.location.href = "/gallery"; // Elite route redirect on approval signature
      }
    } catch (err) {
      setErrorMsg(
        err.message?.replace("Firebase:", "") ||
          "Authorization handshake declined.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-[85vh] w-full flex items-center justify-center px-6 py-12 bg-background text-foreground transition-colors duration-500 gallery-fade">
      <div className="w-full max-w-md premium-frame bg-card p-8 md:p-10 relative shadow-xl">
        <div className="absolute inset-0 border border-foreground/10 pointer-events-none m-3"></div>

        <form
          onSubmit={handleAuthAction}
          className="space-y-6 relative z-10 font-body text-xs"
        >
          <div className="text-center space-y-2 border-b border-foreground/5 pb-4">
            <span className="text-[9px] font-medium uppercase tracking-[0.3em] text-primary">
              Tailored Furnitures
            </span>
            <h1 className="font-heading text-3xl font-light tracking-tight">
              {isForgotPasswordMode ? "Reset Password" : "Account Sign In"}
            </h1>
          </div>

          {errorMsg && (
            <div className="bg-red-500/5 border border-red-500/20 text-red-500 p-3 flex items-start gap-2 leading-relaxed">
              <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {infoMsg && (
            <div className="bg-primary/5 border border-primary/20 text-foreground p-3 flex items-start gap-2 leading-relaxed">
              <span className="text-primary font-bold">|</span>
              <span>{infoMsg}</span>
            </div>
          )}

          {/* Email input field track */}
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

          {/* Conditional field render context based on mode switches */}
          {!isForgotPasswordMode && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="block text-muted/80 uppercase tracking-wider font-medium">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setIsForgotPasswordMode(true)}
                  className="text-[10px] text-muted hover:text-primary tracking-wide lowercase transition-colors"
                >
                  Forgot Password?
                </button>
              </div>
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
                  aria-label="Toggle password view boundary"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          )}

          {/* CTA Submit Button execution context trigger block */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-luxury w-full h-12 flex items-center justify-center disabled:opacity-50"
          >
            {isSubmitting ? (
              <span className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin"></span>
            ) : isForgotPasswordMode ? (
              "Send Reset Link"
            ) : (
              <>
                Sign In <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </>
            )}
          </button>

          {/* Direct Switch Toggle Footnote line context link handles */}
          <div className="text-center pt-2 text-muted text-[11px] font-light">
            {isForgotPasswordMode ? (
              <button
                type="button"
                onClick={() => setIsForgotPasswordMode(false)}
                className="hover:text-foreground text-primary underline transition-colors"
              >
                Return to SignIn
              </button>
            ) : (
              <>
                No Account Yet?{" "}
                <Link
                  href="/auth/signup"
                  className="text-primary hover:underline transition-colors font-medium"
                >
                  Create Account
                </Link>
              </>
            )}
          </div>
        </form>
      </div>
    </main>
  );
}
