"use client";
import Link from "next/link";
import { ReactNode } from "react";

interface Project {
  title: string;
  description: ReactNode;
  link: string;
}

const PROJECTS: Project[] = [
  {
    title: "Scene AI",
    description: "AI powered video editor",
    link: "#",
  },
  {
    title: "Soar AI Labs",
    description: "CLI tool to resolve github merge conflicts",
    link: "https://soarailabs.com",
  },
  {
    title: "We got Claude Code at home",
    description: "Coding agent in the CLI, written in Rust + Ratatui",
    link: "https://github.com/SoarAILabs/",
  },
  {
    title: "Rush",
    description:
      "quickest way to transfer files between ur phone and laptop/computer",
    link: "https://github.com/AmaanBilwar/Rush",
  },
  {
    title: "Fuse",
    description: "SDK to unify your api keys",
    link: "https://github.com/AmaanBilwar/Fuse",
  },
  {
    title: "Sky-Clone",
    description: (
      <>
        <a
          href="https://openai.com/index/openai-acquires-software-applications-incorporated/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-gray-600"
        >
          sky
        </a>{" "}
        is an ai assistant that lives on your mac, using{" "}
        <a
          href="https://gpui.rs"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-gray-600"
        >
          GPUI
        </a>{" "}
        to make one in Rust
      </>
    ),
    link: "https://github.com/AmaanBilwar/sky-clone",
  },
];

const Projects = () => {
  return (
    <main className="relative w-full min-h-screen px-4 sm:px-8 md:px-12 lg:px-24 py-12 text-black bg-white">
      <div className="max-w-3xl">
        <h1 className="text-2xl sm:text-3xl font-bold mt-8 mb-6">Projects</h1>
        <ul className="space-y-4 sm:space-y-3 text-sm sm:text-base">
          {PROJECTS.map((project) => (
            <li key={project.title} className="flex items-start">
              <span className="mr-2 mt-0.5 flex-shrink-0">•</span>
              <div className="flex-1 min-w-0">
                <span className="font-semibold">{project.title}</span>
                <span className="hidden sm:inline">: </span>
                <br className="sm:hidden" />
                <span className="text-black/80 sm:text-black">
                  {project.description}
                </span>{" "}
                <Link
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-gray-600 inline-block"
                >
                  (link)
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default Projects;
