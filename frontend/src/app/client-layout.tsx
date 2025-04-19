"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Sparkles } from "lucide-react";

import { ThemeProvider } from "../components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

function ClientLayoutContent({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [typedKeys, setTypedKeys] = useState("");
  
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const newTypedKeys = typedKeys + e.key.toLowerCase();
      setTypedKeys(newTypedKeys.slice(-8)); // Keep last 8 characters
      
      if (newTypedKeys.includes("memories")) {
        setShowHint(true);
        setTimeout(() => setShowHint(false), 3000);
        setTypedKeys("");
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [typedKeys]);

  // Determine content width based on the current route
  const getContentMaxWidth = () => {
    if (pathname === "/projects") {
      return "max-w-4xl"; // Wider content for experience page
    }
    return "max-w-2xl"; // Default width for other pages
  };

  return (
    <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {showHint && (
          <div className="fixed bottom-4 right-4 bg-background/80 backdrop-blur-sm p-4 rounded-lg shadow-lg border animate-fade-in-out flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <p className="text-sm">Try visiting /memories...</p>
          </div>
        )}
        <div className="container mx-auto px-4 sm:px-6">
          <header className="py-4 mb-8">
            <div className="flex justify-between items-center">
              {/* Left side - Mobile menu button */}
              <div className="flex items-center md:w-24 flex-shrink-0">
                <button 
                  className="md:hidden p-2 rounded-md"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </button>
              </div>

              {/* Center - Navigation links */}
              <div className="hidden md:block flex-grow">
                <nav className="flex justify-center">
                  <ul className="flex space-x-4 lg:space-x-6">
                    <li>
                      <Link 
                        href="/" 
                        className="relative px-2 py-1 transition-colors duration-300 hover:text-primary after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
                      >
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/about" 
                        className="relative px-2 py-1 transition-colors duration-300 hover:text-primary after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
                      >
                        About
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/projects" 
                        className="relative px-2 py-1 transition-colors duration-300 hover:text-primary after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
                      >
                        Projects
                      </Link>
                    </li>
                    <li className="hidden lg:block">
                      <Link 
                        href="/blog" 
                        className="relative px-2 py-1 transition-colors duration-300 hover:text-primary after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
                      >
                        Blog
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/organizations" 
                        className="relative px-2 py-1 transition-colors duration-300 hover:text-primary after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
                      >
                        Organizations
                      </Link>
                    </li>
                    <li className="hidden lg:block">
                      <Link 
                        href="/opensource" 
                        className="relative px-2 py-1 transition-colors duration-300 hover:text-primary after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
                      >
                        Contributions
                      </Link>
                    </li>
                    <li className="hidden lg:block">
                      <Link 
                        href="/thoughts" 
                        className="relative px-2 py-1 transition-colors duration-300 hover:text-primary after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
                      >
                        Thoughts
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
              
              {/* Right side - Theme toggle */}
              <div className="md:w-auto flex justify-end flex-shrink-0 items-center gap-2">
                <ThemeToggle />
              </div>
            </div>
            
            {/* Mobile menu */}
            {mobileMenuOpen && (
              <div className="md:hidden mt-4 animate-slide-down">
                <nav className="bg-background border rounded-lg shadow-md p-4">
                  <ul className="space-y-2">
                    <li>
                      <Link 
                        href="/" 
                        className="block py-2 hover:text-primary"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/about" 
                        className="block py-2 hover:text-primary"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        About
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/projects" 
                        className="block py-2 hover:text-primary"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Projects
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/organizations" 
                        className="block py-2 hover:text-primary"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Organizations
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/opensource" 
                        className="block py-2 hover:text-primary"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Contributions
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/blog" 
                        className="block py-2 hover:text-primary"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Blog
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            )}
          </header>
          
          {/* Content container with dynamic width based on route */}
          <div className={`mx-auto px-0 sm:px-4 ${getContentMaxWidth()}`}>
            {children}
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
}

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ClientLayoutContent>{children}</ClientLayoutContent>;
} 