'use client'
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from 'next/link';

interface BlogPost {
  _id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  readTime: string;
  image: string;
  author: string;
  date: string;
}

const BlogPage = () => {
  // Define categories array
  const categories = ['All', 'Machine Learning', 'Programming', 'Books' , 'Music'];

  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      const response = await fetch('https://amaans-domain.onrender.com/api/blogs');
      const data = await response.json();
      setBlogPosts(data);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    }
  };

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

        <div className="max-w-md mx-auto w-full">
          <Input
            placeholder="Search articles..."
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
              <SelectItem value="popular">Most Popular</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="w-full">
            <Tabs defaultValue="All" className="w-full">
              <TabsList className="flex w-full">
                {categories.map((category: string) => (
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

        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <Link href={`/blog/${post._id}`} key={post._id}>
                <Card className="overflow-hidden transition-all hover:shadow-lg flex flex-col h-full cursor-pointer">
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
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <CardTitle className="text-xl">
                      <span className="line-clamp-2 hover:underline">
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
              </Link>
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