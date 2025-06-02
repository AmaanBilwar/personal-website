"use client";
import React, { useState, useEffect } from "react";

interface Project {
  _id: string;
  title: string;
  description: string;
  content: string;
  tech: string[];
  github_link: string;
  text: string;
  category: string;
  created_at: string;
  views?: number;
  github_stats?: {
    stars: number;
    forks: number;
    last_updated: string;
    open_issues: number;
    watchers: number;
  };
}

const OpenSourcePage = () => {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProject();
  }, []);

  const fetchProject = async () => {
    try {
      setLoading(true);
      const repoUrl = "https://api.github.com/repos/AmaanBilwar/pearai-app";

      const response = await fetch(repoUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch project from GitHub");
      }

      const data = await response.json();

      // Transform GitHub API response to match our Project interface
      const projectData: Project = {
        _id: data.id.toString(),
        title: data.name,
        description: data.description || "",
        content: "",
        tech: [], // You might want to get this from a different source
        text: data.text,
        github_link: data.html_url,
        category: "opensource",
        created_at: data.created_at,
        github_stats: {
          stars: data.stargazers_count,
          forks: data.forks_count,
          last_updated: data.updated_at,
          open_issues: data.open_issues_count,
          watchers: data.watchers_count,
        },
      };

      setProject(projectData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error fetching project:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">Loading project...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-2xl text-red-500 mb-4">{error}</div>
        <button
          onClick={fetchProject}
          className="text-blue-500 hover:text-blue-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-2xl text-yellow-500 mb-4">Project not found</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen max-w-4xl mx-auto p-8">
      <div className="space-y-8">
        <div className="text-center space-y-1">
          <h1 className="text-4xl font-mono font-bold">
            Open Source contributions
          </h1>
          <p className="text-muted-foreground">
            here's what i'm working on contributing to
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <article className="border border-neutral-800 rounded-lg p-6 transition-colors hover:bg-neutral-900 hover:text-white">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-mono font-semibold">
                {project.title}
              </h2>
              <div className="flex items-center space-x-4 text-sm text-neutral-500">
                {project.github_stats && (
                  <div className="flex items-center space-x-2">
                    <span className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path
                          fillRule="evenodd"
                          d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {project.github_stats.watchers}
                    </span>
                    <span className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {project.github_stats.stars}
                    </span>
                    <span className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {project.github_stats.forks}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <p className="text-neutral-400 mb-4">{project.description}</p>
            <div className="flex items-center space-x-2">
              <a
                href="https://github.com/trypear/pearai-app/issues/33"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600"
              >
                <span className="text-sm text-neutral-300">
                  {project.text || "the feature i'm working on"}
                </span>
                <br />
                View on GitHub
              </a>
            </div>
          </article>
        </div>
      </div>
    </main>
  );
};

export default OpenSourcePage;
