"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Determine content width based on the current route
  const getContentMaxWidth = () => {
    if (pathname === "/experience") {
      return "max-w-4xl"; // Wider content for experience page
    }
    return "max-w-2xl"; // Default width for other pages
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
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
                          href="/work" 
                          className="relative px-2 py-1 transition-colors duration-300 hover:text-primary after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
                        >
                          what I'm workin on
                        </Link>
                      </li>
                      <li>
                        <Link 
                          href="/experience" 
                          className="relative px-2 py-1 transition-colors duration-300 hover:text-primary after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
                        >
                          Experience
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
                          Open Source
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
                      <li className="hidden lg:block">
                        <Link 
                          href="/resume" 
                          className="relative px-2 py-1 transition-colors duration-300 hover:text-primary after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
                        >
                          Resume
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </div>
                
                {/* Right side - Theme toggle */}
                <div className="md:w-24 flex justify-end flex-shrink-0">
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
                          href="/work" 
                          className="block py-2 hover:text-primary"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          What I'm Working On
                        </Link>
                      </li>
                      <li>
                        <Link 
                          href="/experience" 
                          className="block py-2 hover:text-primary"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Experience
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
                          Open Source
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
                      <li>
                        <Link 
                          href="/resume" 
                          className="block py-2 hover:text-primary"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Resume
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
      </body>
    </html>
  );
}
