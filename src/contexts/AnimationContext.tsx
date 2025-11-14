"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface AnimationContextType {
  animationEnabled: boolean;
  toggleAnimation: () => void;
}

const AnimationContext = createContext<AnimationContextType | undefined>(
  undefined
);

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  const [animationEnabled, setAnimationEnabled] = useState(true);

  useEffect(() => {
    // Load preference from localStorage on mount
    const stored = localStorage.getItem("animationEnabled");
    if (stored !== null) {
      setAnimationEnabled(stored === "true");
    }
  }, []);

  const toggleAnimation = () => {
    setAnimationEnabled((prev) => {
      const newValue = !prev;
      localStorage.setItem("animationEnabled", String(newValue));
      return newValue;
    });
  };

  return (
    <AnimationContext.Provider value={{ animationEnabled, toggleAnimation }}>
      {children}
    </AnimationContext.Provider>
  );
}

export function useAnimation() {
  const context = useContext(AnimationContext);
  if (context === undefined) {
    throw new Error("useAnimation must be used within an AnimationProvider");
  }
  return context;
}
