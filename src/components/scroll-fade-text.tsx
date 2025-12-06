"use client";

import React from "react";
import { motion, useScroll, useTransform } from "motion/react";

export default function ScrollFadeText() {
  const { scrollYProgress } = useScroll();

  // hi fades out
  const hiOpacity = useTransform(scrollYProgress, [0.0, 0.35, 0.45], [1, 1, 0]);
  // "im amaan" fades in then out
  const amaanOpacity = useTransform(
    scrollYProgress,
    [0.45, 0.6, 0.7],
    [0, 1, 0],
  );
  // "builder." fades in then out
  const builderOpacity = useTransform(
    scrollYProgress,
    [0.7, 0.85, 0.95],
    [0, 1, 0],
  );
  // "founder." fades in and stays
  const founderOpacity = useTransform(
    scrollYProgress,
    [0.95, 0.99, 1],
    [0, 1, 1],
  );

  return (
    <div style={{ height: "700vh", position: "relative" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1 className="text-white m-0 whitespace-nowrap grid place-items-center">
          <motion.span
            className="row-start-1 col-start-1"
            style={{ opacity: hiOpacity }}
          >
            hi
          </motion.span>
          <motion.span
            className="row-start-1 col-start-1"
            style={{ opacity: amaanOpacity }}
          >
            im amaan
          </motion.span>
          <motion.span
            className="row-start-1 col-start-1"
            style={{ opacity: builderOpacity }}
          >
            builder.
          </motion.span>
          <motion.span
            className="row-start-1 col-start-1"
            style={{ opacity: founderOpacity }}
          >
            founder.
          </motion.span>
        </h1>
      </div>
    </div>
  );
}
