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
    <div className="container mx-auto p-4">
      {showEntrance ? (
        <div className="fixed inset-0 flex items-center justify-center bg-background z-50 animate-fade-out">
          <div className="text-center">
            <Sparkles className="w-12 h-12 mx-auto mb-4 text-primary animate-spin" />
            <h1 className="text-4xl font-bold mb-2">You found the secret!</h1>
            <p className="text-gray-500">Welcome to my digital memory box...</p>
          </div>
        </div>
      ) : (
        <>
          <h1 className="text-4xl font-bold text-center mb-8">
            <span className="inline-flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-primary" />
              Memories
              <Sparkles className="w-6 h-6 text-primary" />
            </span>
          </h1>
          
          {images.length === 0 ? (
            <p className="text-center text-gray-500">No memories uploaded yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
              {images.map((image) => {
                const aspectRatio = image.width / image.height;
                let spanClass = '';
                
                // Determine grid span based on aspect ratio
                if (aspectRatio > 1.5) spanClass = 'sm:col-span-2';
                if (aspectRatio > 2) spanClass = 'sm:col-span-3';
                if (image.height > image.width * 1.5) spanClass = 'row-span-2';

                return (
                  <div
                    key={image._id}
                    className={`relative rounded-lg overflow-hidden ${spanClass} transition-transform duration-300 hover:scale-105`}
                  >
                    <Image
                      src={image.image}
                      alt="Memory"
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                    />
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}

