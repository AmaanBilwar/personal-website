"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Sparkles, Construction } from "lucide-react";
import { motion } from "framer-motion";

import { ThemeProvider } from "../components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import CautionTape from "@/components/CautionTape";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

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

              {/* Center - Navigation: keep only Home, then caution tape */}
              <div className="hidden md:block flex-grow">
                <nav className="flex flex-col items-center gap-3">
                  <ul className="flex space-x-4 lg:space-x-6">
                    <li>
                      <Link
                        href="/"
                        className="relative px-2 py-1 transition-colors duration-300 hover:text-primary after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
                      >
                        Home
                      </Link>
                    </li>
                  </ul>
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="w-[min(56rem,92vw)]"
                  >
                    <CautionTape />
                  </motion.div>
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
                      <CautionTape className="mt-2" height={30} />
                    </li>
                  </ul>
                </nav>
              </div>
            )}
          </header>

          {/* Always-visible tasteful construction alert */}
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <Alert className="bg-yellow-50 text-yellow-900 dark:bg-yellow-950/50 dark:text-yellow-100 border-yellow-300 dark:border-yellow-800 text-center flex flex-col items-center">
              <Construction className="col-start-1 row-span-2 self-center mx-auto" />
              <AlertTitle className="w-full text-center">
                Website under construction
              </AlertTitle>
              <AlertDescription className="w-full flex justify-center items-center text-center">
                Amaan is cooking and will be with you shortly.
              </AlertDescription>
            </Alert>
          </motion.div>
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
