"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Badge } from "@/components/ui/badge";
import ReactMarkdown from 'react-markdown';

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

const BlogPostPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<BlogPost | null>(null);

  useEffect(() => {
    // Fetch blog post
    fetch(`https://amaans-domain.onrender.com/api/blogs/${id}`)
      .then(res => res.json())
      .then(data => {
        setBlog(data);
      });
  }, [id]);

  if (!blog) return <div>Loading...</div>;

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="aspect-video relative overflow-hidden mb-8">
          <div 
            className="h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${blog.image})` }}
          ></div>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-bold">{blog.title}</h1>
          <div className="flex items-center gap-4 text-muted-foreground">
            <span>{new Date(blog.date).toLocaleDateString()}</span>
            <span>•</span>
            <span>{blog.readTime}</span>
            <span>•</span>
            <span>By {blog.author}</span>
          </div>
          <Badge variant="secondary">{blog.category}</Badge>
        </div>

        <div className="mt-8 prose prose-lg max-w-none">
          <ReactMarkdown>{blog.content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage; 