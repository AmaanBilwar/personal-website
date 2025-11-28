"use client";

import React, { useState, useEffect } from "react";
import {
  Github,
  Linkedin,
  Mail,
  MoveUpRight,
  Twitter,
  Eye,
  EyeOff,
} from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useAnimation } from "@/contexts/AnimationContext";
const page = () => {
  const { animationEnabled, toggleAnimation } = useAnimation();
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    // Check if dialog has been shown before
    const hasSeenDialog = localStorage.getItem("hasSeenAnimationDialog");
    if (!hasSeenDialog) {
      setShowDialog(true);
    }
  }, []);

  const handleCloseDialog = () => {
    setShowDialog(false);
    localStorage.setItem("hasSeenAnimationDialog", "true");
  };

  return (
    <>
      <Dialog open={showDialog} onOpenChange={handleCloseDialog}>
        <DialogContent onClose={handleCloseDialog}>
          <DialogHeader>
            <DialogTitle>Accessibility Notice</DialogTitle>
            <DialogDescription>
              If you have difficulty reading this page due to the animated
              background, you can disable it using the eye icon button in the
              top-right corner. Your preference will be saved for future visits.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <main className="relative w-full min-h-screen">
        <div className="fixed top-4 right-4 z-50 ">
          <button
            onClick={toggleAnimation}
            className="group/card w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-md bg-white/10 border border-white/20 backdrop-blur-[4px] hover:bg-white/20 hover:backdrop-blur-[8px] hover:border-white/30 transition-all duration-300"
            aria-label={
              animationEnabled
                ? "Disable background animation"
                : "Enable background animation"
            }
            title={
              animationEnabled
                ? "Disable background animation"
                : "Enable background animation"
            }
          >
            {animationEnabled ? (
              <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover/card:scale-110 transition-transform duration-200" />
            ) : (
              <EyeOff className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover/card:scale-110 transition-transform duration-200" />
            )}
          </button>
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-2 lg:gap-2 min-h-screen py-8 lg:pt-16 lg:pb-0 lg:h-screen text-white text-center lg:sticky top-0">
          <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-2xl w-full space-y-6 sm:space-y-8">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-2 sm:mb-3 lg:mb-4 text-center">
                hi im{" "}
                {/* <span
                  className="underline underline-offset-4"
                  style={{ textDecorationThickness: "4px" }}
                >
                  amaan
                </span> */}
                <img
                  src="/badge.png"
                  alt="Badge"
                  className="inline-block align-middle mr-8 h-48 lg:h-64 rotate-12"
                  style={{ verticalAlign: "middle" }}
                />
              </h1>

              {/* About Section */}
              <section className="pt-1 border-t border-white/20">
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-left">
                  about:
                </h2>
                <ul className="space-y-3 sm:space-y-4 text-left text-base sm:text-lg">
                  <li className="pl-4 border-l-2 border-white/30">
                    im currently a junior studying computer engineering at UC.
                  </li>
                  <li className="pl-4 border-l-2 border-white/30">
                    i love building, music and dancing.
                  </li>
                  <li className="pl-4 border-l-2 border-white/30">
                    <span className="line-through">building an ai browser</span>{" "}
                    im not writting all that c++, more of a 🦀 guy.
                  </li>
                  <li className="pl-4 border-l-2 border-white/30">
                    web dev lead of one of the{" "}
                    <a
                      className="font-bold underline transition-colors"
                      href="https://revolutionuc.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      largest student hackathons in the midwest
                    </a>
                    .
                  </li>
                  <li className="pl-4 border-l-2 border-white/30">
                    data acquisition & telemetry work on a{" "}
                    <a
                      href="https://www.instagram.com/bearcats_electric_racing/"
                      className="font-bold underline transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      formula electric racecar
                    </a>{" "}
                    . i can get you all the data from it. wirelessly. yes a real
                    car. built by students.
                  </li>
                  <li className="pl-4 border-l-2 border-white/30 hover:cursor-pointer transition-colors">
                    Read my{" "}
                    <a
                      className="underline"
                      href="https://blog.amaandoes.tech"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Blog
                    </a>
                    .
                  </li>
                  <li className="pl-4 border-l-2 border-white/30"></li>
                </ul>
              </section>

              {/* Previously Section */}
              <section className="pt-4 pb-20 border-t border-white/20">
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-left">
                  previously:
                </h2>
                <ul className="space-y-3 sm:space-y-4 text-left text-base sm:text-lg">
                  <li className="pl-4 border-l-2 border-white/30">
                    interned 2x @{" "}
                    <a
                      href="https://www.honeywell.com/us/en"
                      className="underline transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Honeywell
                    </a>
                    , and an sf startup called{" "}
                    <a
                      href="https://www.story.com/"
                      className="underline transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Story.com
                    </a>
                    . both cool places to work at.
                  </li>
                  <li className="pl-4 border-l-2 border-white/30">
                    participated in my first ever{" "}
                    <a
                      href="https://www.revolutionuc.com/"
                      className="underline transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      hackathon
                    </a>{" "}
                    and won:
                    <ul className="ml-4 mt-2 space-y-1">
                      <li className="font-semibold">
                        • the most technically impressive
                      </li>
                      <li className="font-semibold">• the best use of aws</li>
                    </ul>
                  </li>
                  <li className="pl-4 border-l-2 border-white/30">
                    participated in{" "}
                    <a
                      href="https://calhacks.io"
                      className="underline transition-colors"
                    >
                      calhacks
                    </a>{" "}
                    & won the{" "}
                    <a
                      href="https://devpost.com/software/memary"
                      className="underline transition-colors"
                    >
                      snapchat ar glasses track
                    </a>
                  </li>
                </ul>
              </section>
            </div>
          </div>
          <div className="flex-1 w-full lg:w-auto">
            <div className="flex flex-col items-center gap-4 px-4 sm:px-0">
              <Link href="#" className="w-full max-w-sm lg:max-w-none lg:w-80">
                <Card className="group/card w-full lg:w-80 bg-white/10 backdrop-blur-[4px] border-white/20 transition-all duration-300 rounded-md relative hover:cursor-pointer hover:bg-white/20 hover:backdrop-blur-[8px] hover:border-white/30">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between gap-2 text-lg sm:text-xl">
                      Scene AI
                      <MoveUpRight
                        className="size-4 opacity-0 -translate-y-1 translate-x-1 transition-all duration-200 group-hover/card:opacity-100 group-hover/card:-translate-y-2 group-hover/card:translate-x-2"
                        aria-hidden="true"
                      />
                    </CardTitle>
                    <CardDescription className="text-sm sm:text-base">
                      ai powered video editor, upload your videos and let your
                      prompts dictate the edit for you. No technical burden. Now
                      there's no excuse for not posting.
                      <span className="font-bold underline underline-offset-2">
                        {" "}
                        my biggest project yet.
                      </span>
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
              <Link
                href="https://soarailabs.com"
                target="_blank"
                className="w-full max-w-sm lg:max-w-none lg:w-80"
              >
                <Card className="group/card w-full lg:w-80 bg-white/10 backdrop-blur-[4px] border-white/20 transition-all duration-300 rounded-md relative hover:cursor-pointer hover:bg-white/20 hover:backdrop-blur-[8px] hover:border-white/30">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between gap-2 text-lg sm:text-xl">
                      Soar AI Labs
                      <MoveUpRight
                        className="size-4 opacity-0 -translate-y-1 translate-x-1 transition-all duration-200 group-hover/card:opacity-100 group-hover/card:-translate-y-2 group-hover/card:translate-x-2"
                        aria-hidden="true"
                      />
                    </CardTitle>
                    <CardDescription className="text-sm sm:text-base">
                      CLI tool with context + memory engine to resolve github
                      merge conflicts. Written in Rust
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
              <Link
                className="underline underline-offset-4"
                href="https://projects.amaandoes.tech"
              >
                <span className="flex flex-row items-center gap-2 text-muted-foreground hover:text-foreground">
                  projects i'm currently working on
                  <MoveUpRight className="size-4" aria-hidden="true" />
                </span>
              </Link>
              {/* <Card className="group/card w-80 bg-white/10 backdrop-blur-[4px] border-white/20 transition-all duration-300 rounded-md relative hover:cursor-pointer hover:bg-white/20 hover:backdrop-blur-[8px] hover:border-white/30">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between gap-2 text-xl">
                    Pollen
                    <MoveUpRight
                      className="size-4 opacity-0 -translate-y-1 translate-x-1 transition-all duration-200 group-hover/card:opacity-100 group-hover/card:-translate-y-2 group-hover/card:translate-x-2"
                      aria-hidden="true"
                    />
                  </CardTitle>
                  <CardDescription>
                    a social media platform for sharing your thoughts and ideas.
                  </CardDescription>
                </CardHeader>
              </Card> */}
            </div>
            {/* Social Links */}
            <div className="flex flex-row items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-8">
              {[
                {
                  href: "https://github.com/amaanbilwar",
                  label: "GitHub",
                  Icon: Github,
                },
                {
                  href: "https://www.linkedin.com/in/amaanbilwar/",
                  label: "LinkedIn",
                  Icon: Linkedin,
                },
                {
                  href: "https://twitter.com/bilwaramaan",
                  label: "Twitter",
                  Icon: Twitter,
                },
                {
                  href: "mailto:bilwarad@mail.uc.edu",
                  label: "Email",
                  Icon: Mail,
                },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/card w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-md bg-white/10 border border-white/20 backdrop-blur-[4px] hover:bg-white/20 hover:backdrop-blur-[8px] hover:border-white/30 transition-all duration-300"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover/card:scale-110 transition-transform duration-200" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default page;
