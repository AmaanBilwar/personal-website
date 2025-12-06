import type { Metadata } from "next";
import localFont from "next/font/local";
import {
  Inter,
  JetBrains_Mono,
  Pixelify_Sans,
  Instrument_Sans,
} from "next/font/google";
import "./globals.css";
import { AnimationProvider } from "@/contexts/AnimationContext";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { AnimationToggle } from "@/components/AnimationToggle";

const inter = Inter({
  subsets: ["latin"],
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
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
  title: "amaan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${instrumentSans.className} antialiased`}>
        <AnimationProvider>
          {/* ASCII Filter Background */}
          <div className="fixed inset-0 z-[-1]">
            <AnimatedBackground />
          </div>

          {/* Navigation Menu */}
          {/* <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
            <div className="pointer-events-auto">
              <NavigationMenu />
            </div>
          </div> */}

          {/* Global Animation Toggle - bottom-right */}
          <div className="fixed bottom-4 right-4 z-50">
            <AnimationToggle variant="default" />
          </div>

          {/* Page Content */}
          <div className="relative z-10">{children}</div>

          {/* <Footer /> */}
        </AnimationProvider>
      </body>
    </html>
  );
}
