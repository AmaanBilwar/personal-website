import React from 'react'
import Link from 'next/link'
import { Badge } from "@/components/ui/badge"
import ProjectImage from '@/components/ProjectImage'
import { Metadata } from 'next'

interface Project {
  _id: string;
  title: string;
  description: string;
  content: string;
  tech: string[];
  github_link: string;
  category: string;
  created_at: string;
  images: string[];
  github_stats?: {
    stars: number;
    forks: number;
    watchers: number;
    last_updated: string;
    open_issues: number;
  };
}

export const metadata: Metadata = {
  title: 'Project',
  description: 'View my project',
};

async function getProject(id: string): Promise<Project> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects/${id}`, {
    cache: 'no-store'
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch project');
  }
  
  const project = await response.json();
  
  // Fetch GitHub stats if the project has a GitHub link
  if (project.github_link) {
    try {
      const statsResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/github-stats/${encodeURIComponent(project.github_link)}`
      );
      if (statsResponse.ok) {
        const stats = await statsResponse.json();
        project.github_stats = stats;
      }
    } catch (err) {
      console.error('Error fetching GitHub stats:', err);
    }
  }
  
  return project;
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<React.ReactElement> {
  const { id } = await params;
  const project = await getProject(id);

  return (
    <main className="min-h-screen max-w-4xl mx-auto p-8">
      <div className="space-y-8">
        <div>
          <Link href="/projects" className="text-sm text-neutral-500 hover:text-neutral-400 flex items-center space-x-2">
            <span>← Back to projects</span>
          </Link>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-mono font-bold">{project.title}</h1>
          <p className="text-neutral-400">{project.description}</p>

          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
              >
                {tech}
              </Badge>
            ))}
          </div>

          <div className="flex space-x-4">
            <a href={project.github_link} target="_blank" rel="noopener noreferrer" 
              className="px-4 py-2 text-sm font-medium bg-neutral-800 text-white rounded-lg hover:bg-neutral-700">
              GitHub
            </a>
            <a href={project.github_link.replace('github.com', 'github.io')} target="_blank" rel="noopener noreferrer"
              className="px-4 py-2 text-sm font-medium bg-neutral-800 text-white rounded-lg hover:bg-neutral-700">
              Website
            </a>
          </div>
        </div>

        {project.images && project.images.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.images.map((image, index) => (
              <ProjectImage
                key={index}
                src={image}
                alt={`${project.title} screenshot ${index + 1}`}
              />
            ))}
          </div>
        )}

        {project.github_stats && (
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-neutral-900 text-white p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-neutral-500">Stars</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-yellow-500">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              </div>
              <div className="text-2xl font-mono">{project.github_stats.stars}</div>
            </div>
            <div className="bg-neutral-900 text-white p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-neutral-500">Forks</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-blue-500">
                  <path d="M9 18c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z"/>
                  <path d="M15 6c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z"/>
                  <path d="M15 18c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z"/>
                  <path d="M9 12V9"/>
                  <path d="M15 12V9"/>
                </svg>
              </div>
              <div className="text-2xl font-mono">{project.github_stats.forks}</div>
            </div>
            <div className="bg-neutral-900 text-white p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-neutral-500">Watchers</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-green-500">
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              </div>
              <div className="text-2xl font-mono">{project.github_stats.watchers}</div>
            </div>
            <div className="bg-neutral-900 text-white p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-neutral-500">Issues</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-purple-500">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 8v4"/>
                  <path d="M12 16h.01"/>
                </svg>
              </div>
              <div className="text-2xl font-mono">{project.github_stats.open_issues}</div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <h2 className="text-xl font-mono font-semibold">About</h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-neutral-400 whitespace-pre-wrap">{project.content}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
