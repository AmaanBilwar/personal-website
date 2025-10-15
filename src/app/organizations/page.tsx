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
    <main className="relative w-full min-h-screen pt-20 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-white">Organizations</h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            i love being a part of
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
          {organizations.map((organization, index) => (
            <Card
              key={index}
              className={`group bg-white/10 backdrop-blur-[2px] border-white/20 transition-all duration-300 rounded-none relative ${
                hoveredIndex === null
                  ? "hover:bg-white/15 hover:scale-102"
                  : hoveredIndex === index
                    ? "bg-white/15 scale-102"
                    : "opacity-50"
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {index === 0 && (
                <div className="absolute -top-2 -left-2 w-4 h-4 flex items-center justify-center text-white font-bold text-lg">
                  +
                </div>
              )}
              {index === 2 && (
                <div className="absolute -bottom-2 -right-2 w-4 h-4 flex items-center justify-center text-white font-bold text-lg">
                  +
                </div>
              )}
              {index === 4 && (
                <>
                  <div className="absolute -top-2 -left-2 w-4 h-4 flex items-center justify-center text-white font-bold text-lg">
                    +
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-4 h-4 flex items-center justify-center text-white font-bold text-lg">
                    +
                  </div>
                </>
              )}
              <CardHeader>
                <CardTitle className="text-white text-xl">
                  {organization.title}
                </CardTitle>
                <CardDescription className="text-white/70">
                  {organization.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {organization.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs border border-blue-400/30 rounded-none"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex items-center justify-between w-full">
                  <div className="relative">
                    <Link
                      href={organization.link}
                      className="text-sm text-white/60 hover:text-white transition-colors duration-300 relative"
                    >
                      Status: {organization.status}
                      {/* Animated underline */}
                      <span
                        className="absolute bottom-0 left-0 h-0.5 bg-white transform scale-x-0 transition-transform duration-300 ease-in-out origin-left w-full hover:scale-x-100"
                        style={{
                          backgroundImage: `repeating-linear-gradient(
                             90deg,
                             transparent 0px,
                             transparent 1px,
                             white 1px,
                             white 2px,
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
