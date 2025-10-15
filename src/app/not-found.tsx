import React from "react";
import Link from "next/link";
import Image from "next/image";

const NotFound = () => {
  return (
    <main className="relative w-full h-screen overflow-hidden">
      <div className="flex flex-col items-center justify-center h-full text-white text-center px-4">
        {/* Dither Cat Image */}
        <div className="mb-6">
          <Image
            src="/dither_cat.png"
            alt="Dither cat"
            width={300}
            height={300}
            className="shadow-lg pixelated"
            style={{
              imageRendering: "pixelated",
            }}
          />
        </div>

        {/* 404 Text */}
        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-medium mb-2">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-300 max-w-md mx-auto">
            The page you're looking for seems to have wandered off into the
            digital void.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Link
            href="/"
            className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-200 hover:scale-105"
          >
            ← Back to Home
          </Link>
          <Link
            href="/projects"
            className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-200 hover:scale-105"
          >
            View Projects
          </Link>
        </div>

        {/* Fun Interactive Element */}
        <div className="mt-8 text-sm text-gray-400">
          <p>Try refreshing the page or check the URL for typos!</p>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
