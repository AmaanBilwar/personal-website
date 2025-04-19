import { useEffect, useState } from 'react';

interface SpotifyData {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  songUrl?: string;
}

export default function SpotifyNowPlaying() {
  const [spotifyData, setSpotifyData] = useState<SpotifyData>({ isPlaying: false });

  useEffect(() => {
    const fetchSpotifyData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/spotify`);
        const data = await response.json();
        setSpotifyData(data);
      } catch (error) {
        console.error('Error fetching Spotify data:', error);
      }
    };

    fetchSpotifyData();
    // Refresh every 30 seconds
    const interval = setInterval(fetchSpotifyData, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-6 mb-4">
      <div className="max-w-md mx-auto bg-white/5 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-white/10">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <svg className="w-6 h-6 text-green-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            {spotifyData.isPlaying ? (
              <a
                href={spotifyData.songUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:opacity-80 transition-opacity"
              >
                <p className="text-sm font-medium text-black dark:text-white truncate">
                  {spotifyData.title}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                  {spotifyData.artist}
                </p>
              </a>
            ) : (
              <div className="text-sm text-gray-600 dark:text-gray-400 italic">
                that's a rare occurrence, but Amaan is not listening to music right now :)
              </div>
            )}
          </div>
          {spotifyData.isPlaying && (
            <div className="flex-shrink-0">
              <div className="flex space-x-1">
                <div className="w-1 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <div className="w-1 h-3 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-1 h-3 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 