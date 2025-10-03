import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AsciiNoiseEffect } from "@/components/asciifilter";

const inter = Inter({
  subsets: ["latin"],
});

const spaceMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
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
      <body className={`${spaceMono.className} antialiased`}>
        <div className="fixed inset-0 z-[-1] pointer-events-none">
          <AsciiNoiseEffect className="h-full w-full" />
        </div>
        {children}
      </body>
    </html>
  );
}
