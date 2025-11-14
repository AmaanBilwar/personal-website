"use client";

import { AsciiNoiseEffect } from "@/components/asciifilter";
import { useAnimation } from "@/contexts/AnimationContext";

export function AnimatedBackground() {
  const { animationEnabled } = useAnimation();

  if (!animationEnabled) {
    return <div className="h-full w-full bg-black" />;
  }

  return <AsciiNoiseEffect className="h-full w-full" disabled={false} />;
}
