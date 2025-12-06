"use client";

import React from "react";
import { useAnimation } from "@/contexts/AnimationContext";

/**
 * A global toggle button to enable/disable background animations.
 * Persists user preference via localStorage (handled in AnimationContext).
 */
export function AnimationToggle({
  className = "",
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "minimal";
}) {
  const { animationEnabled, toggleAnimation } = useAnimation();

  const label = animationEnabled ? "Turn off effects" : "Turn on effects";
  const statusText = animationEnabled ? "On" : "Off";

  // Basic styling variants
  const baseClasses =
    "inline-flex items-center gap-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500 disabled:opacity-50 disabled:pointer-events-none";
  const defaultClasses =
    "px-3 py-2 text-sm bg-neutral-800 text-white hover:bg-neutral-700 ring-offset-neutral-900";
  const minimalClasses =
    "px-2 py-1 text-xs bg-transparent text-neutral-300 hover:text-white hover:bg-neutral-800/50 ring-offset-neutral-900 border border-neutral-700";

  const classes =
    baseClasses +
    " " +
    (variant === "minimal" ? minimalClasses : defaultClasses) +
    (className ? ` ${className}` : "");

  return (
    <button
      type="button"
      aria-pressed={animationEnabled}
      aria-label={label}
      title={label}
      onClick={toggleAnimation}
      className={classes}
    >
      <EffectIcon enabled={animationEnabled} />
      <span className="font-medium">Effects</span>
      <span
        className={`ml-1 rounded-sm px-1 py-0.5 text-[10px] ${
          animationEnabled
            ? "bg-green-700 text-white"
            : "bg-neutral-700 text-neutral-200"
        }`}
      >
        {statusText}
      </span>
    </button>
  );
}

/**
 * A small icon that visually indicates current animation state.
 */
function EffectIcon({ enabled }: { enabled: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      role="img"
      aria-hidden="true"
      className={enabled ? "text-green-400" : "text-neutral-400"}
      fill="currentColor"
    >
      {enabled ? (
        // Sparkles icon (enabled)
        <path d="M12 2l1.6 3.9L18 7.6l-3.4 2.7L15.2 14l-3.2-1.8L8.8 14l.6-3.7L6 7.6l4.4-1.7L12 2zm7 9l1 2.4L22 15l-2 1.6.5 2.4-2.1-1.2-2.1 1.2.5-2.4L15 15l2-1.6 1-2.4zm-14 4l.6 1.5L7 18l-1.2 1-.3 1.4-1.2-.7-1.2.7-.3-1.4-1.2-1L2 16.5l1.4-1.1L4 14z" />
      ) : (
        // Pause icon (disabled)
        <path d="M9 5h2v14H9V5zm4 0h2v14h-2V5z" />
      )}
    </svg>
  );
}

export default AnimationToggle;
