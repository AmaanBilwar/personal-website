import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Amaan's Portfolio",
  description: "Personal website and portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="container mx-auto">
          <nav className="w-full py-4 mb-8">
            <ul className="flex justify-center space-x-6">
              <li><Link href="/" className="hover:underline">Home</Link></li>
              <li><Link href="/about" className="hover:underline">About</Link></li>
              <li><Link href="/work" className="hover:underline">What I'm Working On</Link></li>
              <li><Link href="/experience" className="hover:underline">Experience</Link></li>
              <li><Link href="/organizations" className="hover:underline">Organizations</Link></li>
              <li><Link href="/opensource" className="hover:underline">Open Source</Link></li>
              <li><Link href="/blog" className="hover:underline">Blog</Link></li>
              <li><Link href="/resume" className="hover:underline">Resume</Link></li>
            </ul>
          </nav>
          
          {/* Centered content container for all pages */}
          <div className="max-w-2xl mx-auto px-4">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
