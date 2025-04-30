import React from 'react';
import Link from 'next/link';
import { Badge } from "@/components/ui/badge";

interface Project {
  _id: string;
  title: string;
  description: string;
  tech: string[];
  github_link: string;
  created_at: string;
  views: number;
  github_stats?: {
    stars: number;
    forks: number;
    watchers: number;
  };
}

async function getProjects(): Promise<Project[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`, {
    cache: 'no-store'
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch projects');
  }
  
  const data = await response.json();
  
  // Fetch GitHub stats for each project
  const projectsWithStats = await Promise.all(
    data.map(async (project: Project) => {
      if (project.github_link) {
        try {
          const statsResponse = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/github-stats/${encodeURIComponent(project.github_link)}`
          );
          if (statsResponse.ok) {
            const stats = await statsResponse.json();
            return { ...project, github_stats: stats };
          }
        } catch (err) {
          console.error('Error fetching GitHub stats:', err);
        }
      }
      return project;
    })
  );
  
  return projectsWithStats;
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  const formatDate = (date: string) => {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, '0');
    const month = d.toLocaleString('default', { month: 'short' }).toUpperCase();
    const year = d.getFullYear();
    return `${day} ${month} ${year}`;
  };

  return (
    <main className="min-h-screen max-w-4xl mx-auto p-8">
      <div className="space-y-8">
        <div className="text-center space-y-1">
          <h1 className="text-4xl font-mono font-bold">Amaan&apos;s projects</h1>
          <p className="text-muted-foreground">stuff I&apos;ve built</p>
        </div>

        <div className="flex justify-center space-x-6">
          <button className="hover:opacity-80 flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          </button>
          <button className="hover:opacity-80 flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
              <path d="M9 18c-4.51 2-5-2-7-2"/>
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          {projects.map((project) => (
            <Link 
              href={`/projects/${project._id}`} 
              key={project._id} 
              className="block group"
            >
              <article className="border border-neutral-800 rounded-lg p-6 transition-colors hover:bg-neutral-900 hover:text-white">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-mono font-semibold">{project.title}</h2>
                  <div className="flex items-center space-x-4 text-sm text-neutral-500">
                    {project.github_stats && (
                      <div className="flex items-center space-x-2">
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                          </svg>
                          {project.github_stats.watchers}
                        </span>
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                          </svg>
                          {project.github_stats.stars}
                        </span>
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                          </svg>
                          {project.github_stats.forks}
                        </span>
                      </div>
                    )}
                    <span>{project.views}</span>
                  </div>
                </div>
                <p className="text-neutral-400 mb-4">{project.description}</p>
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
                <div className="flex justify-between items-center mt-4 text-sm text-neutral-500">
                  <span>{formatDate(project.created_at)}</span>
                  <span>{project.github_link.replace('https://github.com/', '')}</span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}