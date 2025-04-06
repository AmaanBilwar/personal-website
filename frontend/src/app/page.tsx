"use client";
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Open_Sans } from "next/font/google";
import { useIsMobile } from "@/hooks/useMediaQuery";

const opensans = Open_Sans({
  subsets: ["latin"],
});

const HomePage = () => {
  const isMobile = useIsMobile();
  
  return (
    <main className={`${opensans.className} px-4 sm:px-0 animate-fade-in`}>
      <h1 className="text-xl sm:text-2xl md:text-3xl text-center pb-2 mb-4">
        hello, i'm <strong>amaan.</strong> glad you're here!
      </h1>
      
      <Alert className="text-center mb-6">
        <AlertTitle className="text-center flex justify-center pt-2 pb-2 text-sm sm:text-base">
          ⚠️this site is a work in progress⚠️
        </AlertTitle>
        <AlertDescription className="text-center flex justify-center items-center text-xs sm:text-sm">
          Watch your step & Please don't mind the mess🧹
        </AlertDescription>
      </Alert>
      
      <div className="max-w-lg mx-auto">
        <p className="text-center text-sm sm:text-base mb-6">
          im currently a <strong>pre-junior</strong> (u of cincy has a 5 year engineering programme, and pre-junior is like almost over with the third going into their fourth) in <strong>computer engineering</strong>.
        </p>
        
        <p className="text-center text-sm sm:text-base mb-6">
          my interests are in <strong>machine learning</strong>, <strong>deep learning</strong>, <strong>cloud</strong> (engineering + networking), <strong>quant</strong>, and <strong>software engineering</strong>. 
        </p>
        
        <p className="text-center text-sm sm:text-base">
          currently looking for opportunities in <strong>cloud, ml</strong>, as a <strong>swe</strong>
        </p>
      </div>

      {/* Quick links section - only show on mobile */}
      {isMobile && (
        <div className="mt-8 border-t pt-6">
          <h2 className="text-center font-semibold mb-4">Quick Links</h2>
          <div className="grid grid-cols-2 gap-3">
            <a href="/experience" className="bg-primary/10 rounded-md p-3 text-center hover:bg-primary/20 transition-colors">
              Experience
            </a>
            <a href="/about" className="bg-primary/10 rounded-md p-3 text-center hover:bg-primary/20 transition-colors">
              About Me
            </a>
            <a href="/work" className="bg-primary/10 rounded-md p-3 text-center hover:bg-primary/20 transition-colors">
              Current Work
            </a>
            <a href="/resume" className="bg-primary/10 rounded-md p-3 text-center hover:bg-primary/20 transition-colors">
              Resume
            </a>
          </div>
        </div>
      )}
    </main>
  );
};

export default HomePage;
