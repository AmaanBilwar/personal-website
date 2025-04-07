"use client";

import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Sample blog post data
const blogPosts = [
  {
    id: 1,
    title: "bruh bruh bruh bruh bruh",
    description: "Learn how to build modern web applications with Next.js",
    date: "March 30, 2025",
    author: "Amaan",
    category: "Web Development",
    readTime: "5 min read",
    image: "/blog/nextjs.png"
  },
  {
    id: 2,
    title: "The Power of Shadcn Components",
    description: "Build beautiful UIs faster with shadcn component library",
    date: "March 25, 2025",
    author: "Amaan",
    category: "UI/UX",
    readTime: "7 min read",
    image: "/blog/shadcn.png"
  },
  {
    id: 3,
    title: "TypeScript Best Practices",
    description: "Write more maintainable code with these TypeScript tips",
    date: "March 20, 2025",
    author: "Amaan",
    category: "Programming",
    readTime: "8 min read",
    image: "/blog/typescript.png"
  }
];

const categories = ["All", "Web Development", "UI/UX", "Programming"];

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="space-y-10">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
          <p className="text-muted-foreground max-w-[700px] mx-auto">
            Thoughts, stories, and ideas on tech, design, and development.
          </p>
        </div>

        {/* Search bar moved below the description */}
        <div className="max-w-md mx-auto w-full">
          <Input
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Filter and category tabs section */}
        <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
          <div className="w-full max-w-3xl flex flex-col sm:flex-row gap-4 items-center">
            <Select defaultValue="newest">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="w-full">
              <Tabs defaultValue="All" className="w-full">
                <TabsList className="flex w-full">
                  {categories.map((category) => (
                    <TabsTrigger 
                      key={category} 
                      value={category}
                      onClick={() => setActiveCategory(category)}
                      className="flex-1 px-2 py-1.5 text-sm whitespace-nowrap"
                    >
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          </div>
        </div>

        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden transition-all hover:shadow-lg flex flex-col h-full">
                <div className="aspect-video relative overflow-hidden">
                  <div 
                    className="h-full w-full bg-muted bg-cover bg-center"
                    style={{ 
                      backgroundImage: `url(${post.image})`,
                      backgroundColor: 'rgba(0, 0, 0, 0.05)'
                    }}
                  ></div>
                </div>
                
                <CardHeader className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <CardTitle className="text-xl">
                    <span className="line-clamp-2 hover:underline cursor-pointer">
                      {post.title}
                    </span>
                  </CardTitle>
                  <CardDescription>
                    <span className="line-clamp-2">
                      {post.description}
                    </span>
                  </CardDescription>
                </CardHeader>
                
                <CardFooter className="flex justify-between items-center mt-auto pt-4">
                  <div className="text-sm font-medium">By {post.author}</div>
                  <Badge variant="secondary">{post.category}</Badge>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium">No blog posts found</h3>
            <p className="text-muted-foreground mt-2">
              Try adjusting your search or filter to find what you're looking for.
            </p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                setSearchTerm('');
                setActiveCategory('All');
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
  );
};

export default BlogPage;