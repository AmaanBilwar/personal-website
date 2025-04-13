'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Project {
  _id: string;
  title: string;
  description: string;
  content: string;
  status: string;
  tech: string[];
  slug: string;
  image: string;
  github_link: string;
  category: string;
  created_at: string;
}

const WorkPage = () => {
  // Define categories
  const categories = ['all', 'my projects', 'solving a problem', 'learning'];
  
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/projects');
      
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      
      const data = await response.json();
      setProjects(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || project.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">Loading projects...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-2xl text-red-500 mb-4">{error}</div>
        <Button onClick={fetchProjects}>Try Again</Button>
      </div>
    );
  }

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="space-y-10">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tight">What I'm Working On</h1>
            <p className="text-muted-foreground max-w-[700px] mx-auto">
              Explore my current projects, ongoing work, and learning endeavors.
            </p>
          </div>

          <div className="max-w-md mx-auto w-full">
            <Input
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="w-full max-w-3xl flex flex-col sm:flex-row gap-4 items-center">
            <Select defaultValue="newest">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="status">By Status</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="w-full">
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="flex w-full">
                  {categories.map((category: string) => (
                    <TabsTrigger 
                      key={category} 
                      value={category}
                      onClick={() => setActiveCategory(category)}
                      className="flex-1 px-2 py-1.5 text-sm whitespace-nowrap"
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          </div>

          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredProjects.map((project: Project) => (
                <Link 
                  href={`/work/${project._id}`} 
                  key={project._id}
                  className="block transform transition-all duration-300 hover:scale-[1.02] h-full"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-shadow h-full flex flex-col overflow-hidden">
                    <div className="relative w-full h-48">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-8 flex flex-col flex-grow">
                      <h2 className="text-3xl font-semibold mb-4">{project.title}</h2>
                      <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg flex-grow">{project.description}</p>
                      <div className="flex flex-wrap gap-3 mb-6">
                        {project.tech.map((tech: string, techIndex: number) => (
                          <span key={techIndex} className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-4 py-2 rounded-full text-base">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="text-lg font-medium text-green-600 dark:text-green-400">
                        Status: {project.status}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium">No projects found</h3>
              <p className="text-muted-foreground mt-2">
                Try adjusting your search or filter to find what you're looking for.
              </p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchTerm('');
                  setActiveCategory('all');
                }}
              >
                Reset filters
              </Button>
            </div>
          )}

          <div className="flex justify-center mt-8">
            <Button variant="outline">Load More</Button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default WorkPage