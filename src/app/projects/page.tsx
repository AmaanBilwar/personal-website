"use client";
import Link from "next/link";
import { ReactNode } from "react";
import { GitHubCalendar } from "react-github-calendar";

interface Project {
  updates?: ReactNode;
  title: string;
  description: ReactNode;
  link: string;
}

const PROJECTS: Project[] = [
  {
    title: "Scene AI",
    description: "AI powered video editor",
    link: "#",
    updates: "Almost Done",
  },
  {
    title: "google docs but for terminal",
    description:
      "multiple people editing a doc at the same time in your terminal ",
    link: "https://github.com/AmaanBilwar/google-docs-but-its-your-terminal",
    updates:
      "added a working editor in the terminal now with search! Go check it out",
  },
  // {
  //   title: "Rush",
  //   description:
  //     "Quickest way to transfer files between ur phone and laptop/computer",
  //   link: "https://github.com/AmaanBilwar/Rush",
  //   updates: "Ideation",
  // },
  {
    title: "Claude Code at home",
    description: "Coding agent in the CLI, written in Rust + Ratatui",
    link: "https://github.com/AmaanBilwar/coding-agent",
    updates: "In Progress",
  },
  {
    title: "Soar AI Labs",
    description: "CLI tool to resolve github merge conflicts",
    updates: "Rust rewrite with new Context Engine",
    link: "https://soarailabs.com",
  },
  {
    title: "Sky clone",
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
        is an ai assistant that lives on your mac, trying to make one in Rust
        for Windows
      </>
    ),
    link: "https://github.com/AmaanBilwar/sky-clone",
    updates: "debating learning GPUI vs using Tauri",
  },
];

const Projects = () => {
  return (
    <main className="relative w-full min-h-screen px-4 sm:px-8 md:px-12 lg:px-24 py-12 text-black bg-white overflow-x-hidden">
      <div className="max-w-3xl">
        <h1 className="text-2xl sm:text-3xl font-bold mt-8 mb-6">Projects</h1>
        <div className="space-y-6">
          {PROJECTS.map((project) => (
            <div
              key={project.title}
              className="border border-black/10 rounded-none p-4 sm:p-5 hover:border-black/30 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                <h3 className="font-semibold text-base sm:text-lg">
                  {project.title}
                </h3>
                <Link
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm underline text-black/70 hover:text-black"
                >
                  View project →
                </Link>
              </div>
              <p className="text-black/80 text-sm sm:text-base mb-2">
                {project.description}
              </p>
              {project.updates && (
                <p className="text-black/60 text-sm italic">
                  Status: {project.updates}
                </p>
              )}
            </div>
          ))}
        </div>

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
