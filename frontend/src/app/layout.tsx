"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Remove the localFont import temporarily
// import localFont from "next/font/local";

import { ThemeProvider } from "../components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});



// Remove this problematic font import
// const neueHaasGrotesk = localFont({
//   src: './fonts/neuehass.ttf',  // This path is causing issues
// });

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
          <div className="container mx-auto">
            <header className="flex justify-between items-center py-4 mb-8">
              <div className="flex-1"></div>
              <nav className="flex-grow">
                <ul className="flex justify-center space-x-6">
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
                      What I'm Working On
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
                  <li>
                    <Link 
                      href="/opensource" 
                      className="relative px-2 py-1 transition-colors duration-300 hover:text-primary after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
                    >
                      Open Source
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/blog" 
                      className="relative px-2 py-1 transition-colors duration-300 hover:text-primary after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/resume" 
                      className="relative px-2 py-1 transition-colors duration-300 hover:text-primary after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
                    >
                      Resume
                    </Link>
                  </li>
                </ul>
              </nav>
              <div className="flex-1 flex justify-end">
                <ThemeToggle />
              </div>
            </header>
            
            {/* Content container with dynamic width based on route */}
            <div className={`mx-auto px-4 ${getContentMaxWidth()}`}>
              {children}
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
