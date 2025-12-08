"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";

const page = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const organizations = [
    {
      title: "placeholder",
      description: "placeholder",
      tech: ["placeholder"],
      status: "placeholder",
      link: "placeholder",
    },
    {
      title: "placeholder",
      description: "placeholder",
      tech: ["placeholder"],
      status: "placeholder",
      link: "placeholder",
    },
  ];

  return (
    <main className="relative w-full min-h-screen pt-16 sm:pt-20 pb-12 sm:pb-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-black">
            Organizations
          </h1>
          <p className="text-base sm:text-lg text-black/80 max-w-2xl mx-auto px-4">
            i love being a part of
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-7xl mx-auto">
          {organizations.map((organization, index) => (
            <Card
              key={index}
              className={`group bg-black/5 backdrop-blur-[2px] border-black/10 transition-all duration-300 rounded-none relative ${
                hoveredIndex === null
                  ? "hover:bg-black/10 hover:scale-[1.02]"
                  : hoveredIndex === index
                    ? "bg-black/10 scale-[1.02]"
                    : "opacity-50"
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onTouchStart={() => setHoveredIndex(index)}
              onTouchEnd={() => setHoveredIndex(null)}
            >
              {index === 0 && (
                <div className="absolute -top-2 -left-2 w-4 h-4 flex items-center justify-center text-black font-bold text-lg">
                  +
                </div>
              )}
              {index === 2 && (
                <div className="absolute -bottom-2 -right-2 w-4 h-4 flex items-center justify-center text-black font-bold text-lg">
                  +
                </div>
              )}
              {index === 4 && (
                <>
                  <div className="absolute -top-2 -left-2 w-4 h-4 flex items-center justify-center text-black font-bold text-lg">
                    +
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-4 h-4 flex items-center justify-center text-black font-bold text-lg">
                    +
                  </div>
                </>
              )}
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-black text-lg sm:text-xl">
                  {organization.title}
                </CardTitle>
                <CardDescription className="text-black/60 text-sm sm:text-base">
                  {organization.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
                <div className="flex flex-wrap gap-2 mb-4">
                  {organization.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-black/10 text-black/80 text-xs border border-black/20 rounded-none"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="p-4 sm:p-6 pt-0 sm:pt-0">
                <div className="flex items-center justify-between w-full">
                  <div className="relative">
                    <Link
                      href={organization.link}
                      className="text-sm text-black/60 hover:text-black active:text-black transition-colors duration-300 relative py-1"
                    >
                      Status: {organization.status}
                      {/* Animated underline */}
                      <span
                        className="absolute bottom-0 left-0 h-0.5 bg-black transform scale-x-0 transition-transform duration-300 ease-in-out origin-left w-full hover:scale-x-100"
                        style={{
                          backgroundImage: `repeating-linear-gradient(
                             90deg,
                             transparent 0px,
                             transparent 1px,
                             black 1px,
                             black 2px,
                             transparent 2px,
                             transparent 3px
                           )`,
                          imageRendering: "pixelated",
                        }}
                      />
                    </Link>
                  </div>
                  <div className="w-2 h-2 bg-green-700 rounded-none"></div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
};

export default page;
