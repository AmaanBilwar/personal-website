'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ProjectImageProps {
  src: string;
  alt: string;
}

export default function ProjectImage({ src, alt }: ProjectImageProps) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <div className="relative rounded-lg overflow-hidden">
      <Image
        src={imgSrc}
        alt={alt}
        width={800}
        height={600}
        className="w-full h-auto"
        onError={() => setImgSrc('/placeholder.png')}
      />
    </div>
  );
} 