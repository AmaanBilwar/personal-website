"use client";

import React, { useState } from "react";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "motion/react";
import Image from "next/image";

const page = () => {
  const [text, setText] = useState("hi");
  const { scrollY } = useScroll();

  // Create opacity transforms for each image section based on scroll position
  const childImageOpacity = useTransform(scrollY, [0, 300, 600], [0, 1, 0]);
  const leftImageOpacity = useTransform(scrollY, [600, 900, 1200], [0, 1, 0]);
  const rightImageOpacity = useTransform(scrollY, [600, 900, 1200], [0, 1, 0]);
  const smirkImageOpacity = useTransform(
    scrollY,
    [1200, 1500, 1800],
    [0, 1, 0]
  );

  // Floating/dancing animation variants
  const floatingAnimation = {
    y: [0, -15, 0],
    rotate: [-3, 3, -3],
    transition: {
      duration: 2.5,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "reverse" as const,
    },
  };

  const wavingAnimation = {
    rotate: [-10, 10, -10],
    y: [0, -10, 0],
    transition: {
      duration: 2,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "reverse" as const,
    },
  };

  useMotionValueEvent(scrollY, "change", (latest) => {
    console.log("Page scroll: ", latest);

    // Change text based on scroll position
    if (latest > 2400) {
      setText("wip");
    } else if (latest > 1800) {
      setText("Anyways");
    } else if (latest > 1200) {
      setText("hows it going?!?");
    } else if (latest > 600) {
      setText("welcome to my corner of the internet");
    } else {
      setText("hi");
    }
  });

  return (
    <>
      <main className="relative w-full min-h-screen">
        <div className="flex flex-col items-center justify-center gap-8 h-screen text-white text-center sticky top-0">
          {/* Main content container with images */}
          <div className="relative flex items-center justify-center w-full max-w-6xl px-4">
            {/* Left image for "welcome" section */}
            <motion.div
              className="absolute left-0 w-48 h-48 md:w-64 md:h-64"
              style={{ opacity: leftImageOpacity }}
              animate={floatingAnimation}
            >
              <div className="relative w-full h-full">
                <Image
                  src="/smirk.png"
                  alt="left decoration"
                  fill
                  className="object-contain"
                />
              </div>
            </motion.div>

            {/* Center content with text and conditional images */}
            <div className="flex flex-col items-center gap-6 z-10">
              {/* Childhood image for "hi" section */}
              <motion.div
                className="w-48 h-48 md:w-64 md:h-64"
                style={{ opacity: childImageOpacity }}
                animate={wavingAnimation}
              >
                <div className="relative w-full h-full">
                  <Image
                    src="/smirk.png"
                    alt="childhood wave"
                    fill
                    className="object-contain"
                  />
                </div>
              </motion.div>

              <h1 className="text-2xl font-bold">{text}</h1>

              {/* Smirk image for "hows it going" section */}
              <motion.div
                className="w-48 h-48 md:w-64 md:h-64"
                style={{ opacity: smirkImageOpacity }}
                animate={floatingAnimation}
              >
                <div className="relative w-full h-full">
                  <Image
                    src="/smirk.png"
                    alt="hows it going"
                    fill
                    className="object-contain"
                  />
                </div>
              </motion.div>
            </div>

            {/* Right image for "welcome" section */}
            <motion.div
              className="absolute right-0 w-48 h-48 md:w-64 md:h-64"
              style={{ opacity: rightImageOpacity }}
              animate={floatingAnimation}
            >
              <div className="relative w-full h-full">
                <Image
                  src="/smirk.png"
                  alt="right decoration"
                  fill
                  className="object-contain"
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Add scrollable content */}
        <div className="h-[500vh] bg-gradient-to-b from-transparent"></div>
      </main>
    </>
  );
};

export default page;
