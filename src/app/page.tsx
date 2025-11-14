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
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={toggleAnimation}
            className="group/card w-12 h-12 flex items-center justify-center rounded-md bg-white/10 border border-white/20 backdrop-blur-[4px] hover:bg-white/20 hover:backdrop-blur-[8px] hover:border-white/30 transition-all duration-300"
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
              <Eye className="w-5 h-5 text-white group-hover/card:scale-110 transition-transform duration-200" />
            ) : (
              <EyeOff className="w-5 h-5 text-white group-hover/card:scale-110 transition-transform duration-200" />
            )}
          </button>
        </div>
        <div className="flex flex-row items-center justify-center gap-2 h-screen text-white text-center sticky top-0">
          <div className="flex-1">
            <h1 className="text-4xl font-bold">hi im amaan</h1>
            <p className="mt-6 text-lg">i love building, music and dancing.</p>
            <div className="flex flex-row items-center justify-center gap-4 mt-6">
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
                  className="group/card w-12 h-12 flex items-center justify-center rounded-md bg-white/10 border border-white/20 backdrop-blur-[4px] hover:bg-white/20 hover:backdrop-blur-[8px] hover:border-white/30 transition-all duration-300"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5 text-white group-hover/card:scale-110 transition-transform duration-200" />
                </a>
              ))}
            </div>
          </div>
          <div className="flex-1 ">
            <div className="flex flex-col items-center gap-4">
              <Card className="group/card w-80 bg-white/10 backdrop-blur-[4px] border-white/20 transition-all duration-300 rounded-md relative hover:cursor-pointer hover:bg-white/20 hover:backdrop-blur-[8px] hover:border-white/30">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between gap-2 text-xl">
                    Scene AI
                    <MoveUpRight
                      className="size-4 opacity-0 -translate-y-1 translate-x-1 transition-all duration-200 group-hover/card:opacity-100 group-hover/card:-translate-y-2 group-hover/card:translate-x-2"
                      aria-hidden="true"
                    />
                  </CardTitle>
                  <CardDescription>
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
              <Card className="group/card w-80 bg-white/10 backdrop-blur-[4px] border-white/20 transition-all duration-300 rounded-md relative hover:cursor-pointer hover:bg-white/20 hover:backdrop-blur-[8px] hover:border-white/30">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between gap-2 text-xl">
                    Soar AI Labs
                    <MoveUpRight
                      className="size-4 opacity-0 -translate-y-1 translate-x-1 transition-all duration-200 group-hover/card:opacity-100 group-hover/card:-translate-y-2 group-hover/card:translate-x-2"
                      aria-hidden="true"
                    />
                  </CardTitle>
                  <CardDescription>
                    context engine for your version control. it learns your git
                    habits and helps you with issues like merge conflicts.
                    <span className="font-bold underline underline-offset-2">
                      {" "}
                      fine-tuned models, mcps and agents. the whole jazz.
                    </span>
                  </CardDescription>
                </CardHeader>
              </Card>
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
          </div>
        </div>
      </main>
    </>
  );
};

export default page;
