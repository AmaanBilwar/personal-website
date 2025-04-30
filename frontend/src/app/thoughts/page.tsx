'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { format } from 'date-fns';

interface Thought {
  _id: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export default function ThoughtsPage() {
  const [thoughts, setThoughts] = useState<Thought[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchThoughts();
  }, []);

  const fetchThoughts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/thoughts`);
      console.log(response);
      if (!response.ok) {
        throw new Error('Failed to fetch thoughts');
      }
      const data = await response.json();
      setThoughts(data);
      setError(null);
    } catch (err) {
      setError('Failed to load thoughts. Please try again later.');
      console.error('Error fetching thoughts:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main>
        <h1 className="text-center">
            for legal reasons, anything you see is ai generated and not typed by Amaan Bilwar (obviously).
        </h1>
    <div className="container mx-auto py-8 px-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Thoughts</h1>
      
      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {/* Loading State */}
      {isLoading ? (
        <div className="text-center py-8">Loading thoughts...</div>
      ) : (
        /* Thoughts List */
        <div className="space-y-4">
          {thoughts.length === 0 ? (
            <p className="text-center text-white">No thoughts yet.</p>
          ) : (
            thoughts.map((thought) => (
              <Card key={thought._id} className="border-b transition-colors">
                <CardContent className="pt-6">
                  <div className="whitespace-pre-wrap dark:text-white text-black text-lg mb-3">
                    {thought.content}
                  </div>
                  <div className="text-sm dark:text-white text-black">
                    {format(new Date(thought.created_at), 'MMM d, yyyy • h:mm a')}
                    {thought.updated_at !== thought.created_at && (
                      <span className="text-xs"> (edited)</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
    </main>

  );
}
