import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter, JetBrains_Mono, Pixelify_Sans } from "next/font/google";
import "./globals.css";
import { AsciiNoiseEffect } from "@/components/asciifilter";
import NavigationMenu from "@/components/navigation-menu";
const inter = Inter({
  subsets: ["latin"],
});

const ari = localFont({
  src: [
    {
      path: "../fonts/ari-w9500.ttf",
      weight: "400",
      style: "normal",
    },
  ],
});

const spaceMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const pixelify = Pixelify_Sans({
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "hi :)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ari.className} antialiased`}>
        {/* ASCII Filter Background */}
        <div className="fixed inset-0 z-[-1]">
          <AsciiNoiseEffect className="h-full w-full" />
        </div>

        {/* Navigation Menu */}
        <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
          <div className="pointer-events-auto">
            <NavigationMenu />
          </div>
        </div>

        {/* Page Content */}
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
