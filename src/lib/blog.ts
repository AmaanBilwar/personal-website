export type BlogPost = {
  slug: string;
  title: string;
  author: string;
  date: string;
  content: string; // You can write your blog content here as a string, or use markdown
};

// Your blog posts - add new posts here!
export const blogPosts: BlogPost[] = [
  {
    slug: "fastest-video-rag",
    title: "Building the Fastest Video RAG. ever.",
    author: "Amaan",
    date: "2025-11-25",
    content: `
# Coming Soon
    `.trim(),
  }
];

// Helper function to get a blog post by slug
export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

// Helper function to get all blog posts
export function getAllBlogPosts(): BlogPost[] {
  return blogPosts;
}

