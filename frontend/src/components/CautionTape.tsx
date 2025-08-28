"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type CautionTapeProps = {
  text?: string;
  className?: string;
  height?: number; // in pixels
};

export default function CautionTape({
  text = "UNDER CONSTRUCTION — DO NOT CROSS — AMAAN IS COOKING",
  className,
  height = 36,
}: CautionTapeProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "relative w-full overflow-hidden rounded-md border shadow-sm",
        className
      )}
      style={{
        height,
        backgroundImage:
          "repeating-linear-gradient(45deg, #facc15 0px, #facc15 12px, #0a0a0a 12px, #0a0a0a 24px)",
        backgroundSize: "auto",
      }}
    >
      {/* Soft edge fade to keep it tasteful */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          maskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <motion.div
          className="absolute inset-y-0 flex items-center gap-8 text-black dark:text-yellow-100/95"
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 24,
            repeatDelay: 1,
          }}
          style={{ whiteSpace: "nowrap" }}
        >
          {/* Duplicate the content twice for seamless loop */}
          {[0, 1].map((i) => (
            <span
              key={i}
              className="font-semibold tracking-wider drop-shadow-[0_1px_0_rgba(255,255,255,0.25)]"
            >
              {Array.from({ length: 8 })
                .map(() => text)
                .join("  •  ")}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
