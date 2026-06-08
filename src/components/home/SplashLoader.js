"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const words = ["tailored", "furnitures"];

export default function SplashLoader() {
  const [loading, setLoading] = useState(true);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 4000);
    const cursorTimer = setTimeout(() => setShowCursor(false), 3000);
    return () => {
      clearTimeout(timer);
      clearTimeout(cursorTimer);
    };
  }, []);

  const penTimings = [
    0.055, 0.06, 0.05, 0.065, 0.055, 0.07, 0.05, 0.06, 0.08, 0.055, 0.065, 0.06,
    0.055, 0.07, 0.06, 0.055, 0.065, 0.06, 0.07,
  ];

  const allChars = "tailored furnitures".split("");

  const cumulativeDelays = allChars.reduce((acc, _, i) => {
    const prev = acc[i - 1] ?? 0.3;
    return [...acc, prev + (penTimings[i] ?? 0.06)];
  }, []);

  const letterVariants = {
    hidden: {
      opacity: 0,
      clipPath: "inset(0 100% 0 0)",
    },
    visible: (i) => ({
      opacity: 1,
      clipPath: "inset(0 0% 0 0)",
      transition: {
        delay: cumulativeDelays[i],
        duration: 0.01,
        ease: "linear",
      },
    }),
  };

  const containerVariants = {
    exit: {
      y: "-100%",
      transition: {
        ease: [0.76, 0, 0.24, 1],
        duration: 1.1,
      },
    },
  };

  const writingDuration = cumulativeDelays[cumulativeDelays.length - 1];

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          variants={containerVariants}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit="exit"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background text-foreground select-none transition-colors duration-500"
        >
          {/* Dynamic mix-blend zebra texture adapting naturally across backdrop environments */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.012] dark:opacity-[0.02] mix-blend-difference"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25'%3E%3Cdefs%3E%3Cpattern id='zebra' width='120' height='120' patternUnits='userSpaceOnUse'%3E%3Cpath d='M0,20 Q30,15 60,35 T120,20 L120,35 Q90,50 60,30 T0,45 Z M0,70 Q40,85 80,60 T120,75 L120,90 Q80,75 40,95 T0,85 Z' fill='%23888888'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23zebra)'/%3E%3C/svg%3E")`,
              backgroundSize: "240px 240px",
            }}
          />

          <div className="flex flex-col items-center space-y-5 relative z-10">
            {/* Word rows */}
            <div className="flex flex-col items-center gap-1">
              {words.map((word, wordIndex) => {
                const charOffset = wordIndex === 0 ? 0 : "tailored ".length;

                return (
                  <div key={word} className="relative flex items-end">
                    <div className="flex">
                      {word.split("").map((char, charIndex) => {
                        const globalIndex = charOffset + charIndex;
                        return (
                          <motion.span
                            key={charIndex}
                            custom={globalIndex}
                            variants={letterVariants}
                            initial="hidden"
                            animate="visible"
                            className="font-heading text-5xl md:text-7xl font-light tracking-tight text-foreground"
                            style={{ display: "inline-block" }}
                          >
                            {char}
                          </motion.span>
                        );
                      })}

                      {/* Dynamic blinking pen cursor */}
                      {wordIndex === words.length - 1 && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{
                            opacity: showCursor ? [0, 1, 1, 0] : 0,
                          }}
                          transition={{
                            delay: 0.35,
                            duration: 0.4,
                            repeat: showCursor ? Infinity : 0,
                            repeatDelay: 0.05,
                          }}
                          className="font-heading text-5xl md:text-7xl font-extralight text-foreground/60 ml-[1px]"
                          style={{ display: "inline-block" }}
                        >
                          |
                        </motion.span>
                      )}
                    </div>

                    {/* SVG underline trace per word */}
                    <svg
                      className="absolute bottom-0 left-0 w-full"
                      height="3"
                      viewBox="0 0 100 3"
                      preserveAspectRatio="none"
                      overflow="visible"
                    >
                      <motion.path
                        d="M0,2 Q25,0.5 50,2 T100,2"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="0.8"
                        strokeLinecap="round"
                        className="text-primary/30"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{
                          pathLength: {
                            delay:
                              wordIndex === 0
                                ? cumulativeDelays[7]
                                : writingDuration,
                            duration: 0.6,
                            ease: "easeOut",
                          },
                          opacity: {
                            delay:
                              wordIndex === 0
                                ? cumulativeDelays[7]
                                : writingDuration,
                            duration: 0.1,
                          },
                        }}
                      />
                    </svg>
                  </div>
                );
              })}
            </div>

            {/* Baseline anchor line */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 0.25 }}
              transition={{
                delay: writingDuration + 0.3,
                duration: 0.8,
                ease: "easeInOut",
              }}
              className="w-16 h-[1px] bg-primary origin-center"
            />

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 0.4, y: 0 }}
              transition={{ delay: writingDuration + 0.5, duration: 0.8 }}
              className="font-body text-[8px] tracking-[0.4em] uppercase text-primary font-medium"
            >
              Luxury.Power.Masterpieces.
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
