'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Sparkles } from 'lucide-react';

interface ImageItem {
  _id: string;
  image: string;
  width: number;
  height: number;
  created_at: string;
}

export default function MemoriesGrid() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showEntrance, setShowEntrance] = useState(true);

  // Fetch existing memories
  useEffect(() => {
    const fetchMemories = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/memories`);
        if (!response.ok) throw new Error('Failed to fetch memories');
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error('Error fetching memories:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMemories();
    
    // Hide entrance animation after 2 seconds
    setTimeout(() => setShowEntrance(false), 2000);
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 text-center">
        <p className="text-gray-500">Loading memories...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {showEntrance ? (
        <div className="fixed inset-0 flex items-center justify-center bg-background z-50 animate-fade-out">
          <div className="text-center">
            <Sparkles className="w-12 h-12 mx-auto mb-4 text-primary animate-spin" />
            <h1 className="text-4xl font-bold mb-2">You found the secret!</h1>
            <p className="text-gray-500">Welcome to my digital memory box...</p>
          </div>
        </div>
      ) : (
        <div className="px-2 py-8">
          <h1 className="text-4xl font-bold text-center mb-12">
            <span className="inline-flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-primary" />
              Memories
              <Sparkles className="w-6 h-6 text-primary" />
            </span>
          </h1>
          
          {images.length === 0 ? (
            <p className="text-center text-gray-500">No memories uploaded yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 px-0 sm:px-4">
              {images.map((image, index) => {
                const aspectRatio = image.width / image.height;
                
                return (
                  <div
                    key={image._id}
                    className="relative group w-full h-auto"
                  >
                    <div 
                      className="relative overflow-hidden rounded-lg transition-all duration-300 hover:scale-[1.02]"
                      style={{ 
                        width: '100%',
                        paddingTop: `${(1 / aspectRatio) * 100}%`,
                      }}
                    >
                      <Image
                        src={image.image}
                        alt="Memory"
                        fill
                        className="object-cover absolute top-0 left-0 w-full h-full"
                        sizes="(max-width: 640px) 98vw, (max-width: 1024px) 48vw, (max-width: 1536px) 32vw, 24vw"
                        priority={index < 4}
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                          <p className="text-sm">
                            {new Date(image.created_at).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

