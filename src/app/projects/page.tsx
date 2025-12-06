"use client";
import Link from "next/link";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MoveUpRight, Eye, EyeOff } from "lucide-react";
import { useAnimation } from "@/contexts/AnimationContext";

const PROJECTS = [
  {
    title: "Scene AI",
    description:
      "AI powered video editor. let your prompts dictate the edit for you. Now there's no excuse for not posting. My biggest project yet.",
    link: "#",
    external: false,
  },
  {
    title: "Soar AI Labs",
    description:
      "CLI tool with context + memory engine to resolve github merge conflicts.",
    link: "https://soarailabs.com",
  },
  {
    title: `"We have Claude Code at home"`,
    description: "Coding agent in the CLI, made by me. Written in Rust.",
    link: "#",
    external: false,
  },
];

const Projects = () => {
  const { animationEnabled, toggleAnimation } = useAnimation();

  return (
    <main className="relative w-full min-h-screen px-6 py-12 flex flex-col items-center text-white">
      <div className="fixed top-4 right-4 z-50">
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
      <div className="w-full max-w-6xl flex flex-col items-center gap-8">
        {/* Back to Home button */}
        <Link
          href="https://amaandoes.tech"
          className="text-white/70 hover:text-white transition-colors self-start"
        >
          ← Back to Home
        </Link>
        <div className="w-full flex flex-col items-center gap-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-10 pb-24 text-center">
            Projects
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 w-full">
            {PROJECTS.map((project, idx) => {
              const CardContent = (
                <Card className="group/card h-full bg-white/10 backdrop-blur-[4px] border-white/20 transition-all duration-300 rounded-md relative hover:cursor-pointer hover:bg-white/20 hover:backdrop-blur-[8px] hover:border-white/30">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between gap-2 text-lg sm:text-xl">
                      {project.title}
                      <MoveUpRight
                        className="size-4 opacity-0 -translate-y-1 translate-x-1 transition-all duration-200 group-hover/card:opacity-100 group-hover/card:-translate-y-2 group-hover/card:translate-x-2"
                        aria-hidden="true"
                      />
                    </CardTitle>
                    <div className="my-3 border-t border-white/20"></div>
                    <CardDescription className="text-sm sm:text-base">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
              return project.external ? (
                <a
                  key={project.title}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-full block"
                >
                  {CardContent}
                </a>
              ) : (
                <Link
                  key={project.title}
                  href={project.link}
                  className="w-full h-full block"
                >
                  {CardContent}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Projects;
