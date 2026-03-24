import type { Metadata, Viewport } from "next";
import { Space_Mono } from "next/font/google";
import "./globals.css";
import NavigationMenuDemo from "@/components/navigation-menu";
import { TooltipProvider } from "@/components/ui/tooltip";

const mono = Space_Mono({
  weight: "400",
});

export const metadata: Metadata = {
  title: "amaan",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${mono.className} antialiased overflow-x-hidden`}>
        <TooltipProvider>
          {/* Navigation Menu */}
          <div className="fixed top-2 right-2 sm:top-4 sm:right-4 z-50">
            <NavigationMenuDemo />
          </div>

          {/* Page Content */}
          <div className="relative z-10">{children}</div>
        </TooltipProvider>

        {/* <Footer /> */}
      </body>
    </html>
  );
}
