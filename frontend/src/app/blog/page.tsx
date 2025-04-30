'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface BlogPost {
  _id: string;
  title: string;
  description: string;
  content: string;
  date: string;
  views: number;
}

const BlogPage = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'popular'>('newest');

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs`);
      const data = await response.json();
      let sortedPosts = [...data];
      
      switch (sortBy) {
        case 'newest':
          sortedPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
          break;
        case 'oldest':
          sortedPosts.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
          break;
        case 'popular':
          sortedPosts.sort((a, b) => b.views - a.views);
          break;
      }
      
      setBlogPosts(sortedPosts);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    }
  };

  useEffect(() => {
    fetchBlogPosts();
  }, [sortBy]);

  return (
    <div className="min-h-screen bg-white dark:bg-background/80 text-black dark:text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-mono mb-2">Amaan's blog</h1>
          <p className="text-neutral-500">woah, nerd!</p>
        </div>

        <div className="flex justify-center gap-4 mb-8">
          <Link href="/" className="hover:opacity-80">
            <span className="text-2xl">⌂</span>
          </Link>
          {/* <Link href="/" className="hover:opacity-80">
            <span className="text-2xl">↓</span>
          </Link> */}
        </div>

        <div className="max-w-4xl mx-auto mb-8">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest' | 'popular')}
            className="bg-neutral-900 text-white px-4 py-2 rounded-lg border border-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-600 dark:bg-background/80 dark:text-white appearance-none text-center w-48"
          >
            <option className="dark:bg-background/80 dark:text-white" value="newest">Sort by Newest</option>
            <option className="dark:bg-background/80 dark:text-white" value="oldest">Sort by Oldest</option>
            <option className="dark:bg-background/80 dark:text-white" value="popular">Sort by Popular</option>
          </select>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 gap-4">
          {blogPosts.map((post) => (
            <Link href={`/blog/${post._id}`} key={post._id} className="block group">
              <article className="border border-neutral-800 rounded-lg p-6 hover:bg-neutral-900 hover:text-white transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-mono">{post.title}</h2>
                  <div className="flex items-center gap-2 text-neutral-500">
                    <span>{new Date(post.date).toLocaleDateString('en-US', { 
                      day: '2-digit',
                      month: 'numeric',
                      year: 'numeric'
                    })}</span>
                    <span className="text-xs">•</span>
                    <span>{post.views}k</span>
                  </div>
                </div>
                <div className="text-neutral-400 prose dark:prose-invert max-w-none">
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h1: ({node, ...props}) => <h1 className="text-2xl font-bold mb-2 line-clamp-2" {...props} />,
                      h2: ({node, ...props}) => <h2 className="text-xl font-bold mb-2 line-clamp-2" {...props} />,
                      h3: ({node, ...props}) => <h3 className="text-lg font-bold mb-2 line-clamp-2" {...props} />,
                      p: ({node, ...props}) => <p className="line-clamp-2" {...props} />,
                      a: ({node, ...props}) => <a className="text-blue-500 hover:text-blue-600" {...props} />
                    }}
                  >
                    {post.description}
                  </ReactMarkdown>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;