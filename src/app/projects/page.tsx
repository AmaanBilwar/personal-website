"use client";
import { ReactNode } from "react";
import { ExternalLink } from "lucide-react";
import { GitHubCalendar } from "react-github-calendar";

interface Project {
  status?: ReactNode;
  title: string;
  description: ReactNode;
  link: string;
}

const PROJECTS: Project[] = [
  {
    title: "the-search-thing",
    description: "fastest semantic search tool for your OS",
    link: "https://github.com/the-search-thing/the-search-thing",
    status: "working on audio indexer right now",
  },
  {
    title: "better vscode",
    description: "private, faster and debloated VSCode",
    link: "https://github.com/AmaanBilwar/better-vscode",
    status: "building this with patches so users can pick & choose what they want to keep and what they don't",
  },
  {
    title: "openresolve",
    description: "opencode fork specifically designed to resolve merge conflicts",
    link: "https://github.com/AmaanBilwar/openresolve",
    status: "ast + treesitter work done",
  },
  {
    title: "discord coding agent",
    description: "write features, open, review & merge PRs all via a discord coding agent",
    link: "https://github.com/AmaanBilwar/openresolve",
    status: "works paused cuz im on ai detox",
  },
  {
    title: "Desktop Assistant - (Sky clone)",
    description: "Sky is an AI assistant that lives on your computer, they were recently acquired by OpenAI",
    link: "https://github.com/AmaanBilwar/sky-clone",
    status: "research",
  },
];

const Projects = () => {
  return (
    <main className="relative w-full min-h-screen px-4 sm:px-8 md:px-12 lg:px-24 pt-20 sm:pt-24 pb-12 text-black bg-white overflow-x-hidden">
      <div className="max-w-3xl">
        <h1 className="text-2xl sm:text-3xl font-bold mt-8 mb-6">Projects</h1>
        <div className="text-black/60 pb-6">I work on many projects at the same time, these are some of them.</div>
	<div className="space-y-6">
          {PROJECTS.map((project) => (
            <a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block border border-black/10 rounded-none p-4 sm:p-5 hover:border-black/30 transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-semibold text-base sm:text-lg">{project.title}</h3>
                <ExternalLink className="w-4 h-4 shrink-0 text-black/40 mt-1" />
              </div>
              <p className="text-black/80 text-sm sm:text-base mb-2">{project.description}</p>
              {project.status && (
                <p className="text-black/60 text-sm italic">Notes: {project.status}</p>
              )}
            </a>
          ))}
        </div>

        {/* GitHub Contributions Graph */}
        <section className="mt-12">
          <h2 className="text-xl sm:text-2xl font-bold mb-6">GitHub Contributions</h2>
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
