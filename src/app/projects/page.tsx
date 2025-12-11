"use client";
import Link from "next/link";
import { ReactNode } from "react";
import { GitHubCalendar } from "react-github-calendar";

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
    title: "Rush",
    description:
      "Quickest way to transfer files between ur phone and laptop/computer",
    link: "https://github.com/AmaanBilwar/Rush",
  },
  {
    title: "Sky-Clone",
    description: (
      <>
        <a
          href="https://x.com/skybysoftware/status/1927760056122036511?s=20"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Sky
        </a>{" "}
        is an ai assistant that lives on your mac, using{" "}
        <a
          href="https://gpui.rs"
          target="_blank"
          rel="noopener noreferrer"
          className="underline "
        >
          GPUI
        </a>{" "}
        to make one in Rust for Windows
      </>
    ),
    link: "https://github.com/AmaanBilwar/sky-clone",
  },
  {
    title: "Fuse",
    description: "SDK to unify your api keys",
    link: "https://github.com/AmaanBilwar/Fuse",
  },

  {
    title: `"We got Claude Code at home"`,
    description: "Coding agent in the CLI, written in Rust + Ratatui",
    link: "https://github.com/AmaanBilwar/coding-agent",
  },
  {
    title: "Soar AI Labs",
    description: "CLI tool to resolve github merge conflicts",
    link: "https://soarailabs.com",
  },
];

const Projects = () => {
  return (
    <main className="relative w-full min-h-screen px-4 sm:px-8 md:px-12 lg:px-24 py-12 text-black bg-white overflow-x-auto">
      <div className="max-w-3xl">
        <h1 className="text-2xl sm:text-3xl font-bold mt-8 mb-6">Projects</h1>
        <ul className="space-y-4 sm:space-y-3 text-sm sm:text-base whitespace-nowrap">
          {PROJECTS.map((project) => (
            <li key={project.title} className="flex items-start">
              <span className="mr-2 mt-0.5 flex-shrink-0">•</span>
              <div className="flex-1">
                <span className="font-semibold">{project.title}</span>
                <span className="hidden sm:inline">: </span>
                <span className="text-black/80 sm:text-black">
                  {project.description}
                </span>{" "}
                —{" "}
                <Link
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline inline-block"
                >
                  {" "}
                  link
                </Link>
              </div>
            </li>
          ))}
        </ul>

        {/* GitHub Contributions Graph */}
        <section className="mt-12">
          <h2 className="text-xl sm:text-2xl font-bold mb-6">
            GitHub Contributions
          </h2>
          <div className="overflow-x-auto pb-2">
            <GitHubCalendar
              username="AmaanBilwar"
              colorScheme="light"
              fontSize={12}
              blockSize={10}
              blockMargin={4}
            />
          </div>
        </section>
      </div>
    </main>
  );
};

export default Projects;
