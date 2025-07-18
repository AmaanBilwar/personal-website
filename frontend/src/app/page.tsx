"use client";
import React from "react";
import { Open_Sans } from "next/font/google";
import { useIsMobile } from "@/hooks/useMediaQuery";
import SpotifyNowPlaying from "@/components/SpotifyNowPlaying";
import { Badge } from "@/components/ui/badge";

const opensans = Open_Sans({
  subsets: ["latin"],
});

const HomePage = () => {
  const isMobile = useIsMobile();

  return (
    <main className={`${opensans.className} px-4 sm:px-0 animate-fade-in`}>
      <h1 className="text-xl sm:text-2xl md:text-3xl text-center pb-2 mb-4">
        hello, i'm{" "}
        <i>
          <strong>Amaan.</strong>
        </i>{" "}
        glad you could make it :)
      </h1>

      <div className="max-w-lg mx-auto">
        <p className="text-left text-sm sm:text-base mb-6">
          im currently a <strong>pre-junior</strong>{" "}
          <span className="text-muted-foreground">
            (University of Cincinnati has a 5 year engineering program, &
            pre-junior is like almost over with the third going into the fourth
            year)
          </span>{" "}
          studying <strong>computer engineering</strong>.
        </p>
        <p>
          <i className="underline">currently:</i>
          <span className="block mt-2 mb-2 text-xs sm:text-sm">
            - learning Rust + machine learning + cloud
            <br />
            <a
              href="https://tryreduct.vercel.app"
              target="_blank"
              className="relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full"
            >
              - building an ai video editor [cursor for video editing]
            </a>
            <br />- web dev lead of the largest hackathon in the Midwest
          </span>
        </p>
        <br />

        <p>
          <i className="underline">previously:</i>
          <span className="block mt-2 text-xs sm:text-sm">
            - built data acquisition + telemetry device for a Formula Electric
            SAE car
            <br />
            - co-op'ed at Honeywell twice
            <br />
            - participated in my first ever hackathon
            <br />
            <span className="ml-6 block mt-1 text-xs sm:text-sm">
              • won the <strong>most technically impressive</strong> prize
              <br />• won the <strong>best use of aws</strong> category
            </span>
          </span>
        </p>

        <SpotifyNowPlaying />

        <p
          className="pt-6 text-center 
        text-stone-400 text-sm sm:text-base mb-6"
        >
          reach me @ bilwarad [at] mail [dot] uc [dot] edu :)
        </p>

        <div className="flex justify-center space-x-4">
          <a
            href="https://www.linkedin.com/in/AmaanBilwar/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-stone-400 hover:text-primary transition-colors"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
          <a
            href="https://github.com/AmaanBilwar"
            target="_blank"
            rel="noopener noreferrer"
            className="text-stone-400 hover:text-primary transition-colors"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
        </div>
      </div>

      {/* Quick links section - only show on mobile */}
      {isMobile && (
        <div className="mt-8 border-t pt-6">
          <h2 className="text-center font-semibold mb-4">Quick Links</h2>
          <div className="grid grid-cols-2 gap-3">
            <a
              href="/blog"
              className="bg-primary/10 rounded-md p-3 text-center hover:bg-primary/20 transition-colors"
            >
              Blog
            </a>
            <a
              href="/about"
              className="bg-primary/10 rounded-md p-3 text-center hover:bg-primary/20 transition-colors"
            >
              About Me
            </a>
            <a
              href="/projects"
              className="bg-primary/10 rounded-md p-3 text-center hover:bg-primary/20 transition-colors"
            >
              Projects
            </a>
          </div>
        </div>
      )}
    </main>
  );
};

export default HomePage;
