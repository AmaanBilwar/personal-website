import React, { useState } from 'react';

export default function LocationHover() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="flex items-center">
      <img src="/location.png" className="w-10 h-10" />
      <h1 className="ml-2">Location:</h1>
      <p
        className="ml-2 hover:bg-gradient-to-r hover:from-blue-500 hover:to-red-500"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ cursor: 'pointer' }}
      >
        {hovered ? 'United States' : 'Unknown'}
      </p>
    </div>
  );
} 