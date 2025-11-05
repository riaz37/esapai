import React from "react";
import { IconBrandYoutubeFilled } from "@tabler/icons-react";
import Image from "next/image";

interface FeatureSkeletonYouTubeProps {
  youtubeUrl?: string;
  thumbnail?: string;
}

export function FeatureSkeletonYouTube({ 
  youtubeUrl, 
  thumbnail 
}: FeatureSkeletonYouTubeProps) {
  const url = youtubeUrl || "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
  
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="relative flex gap-10 h-full"
    >
      <div className="w-full mx-auto bg-transparent h-full">
        <div className="flex flex-1 w-full h-full flex-col space-y-2 relative">
          <IconBrandYoutubeFilled className="h-20 w-20 absolute z-10 inset-0 text-red-500 m-auto" />
          {thumbnail ? (
            <Image
              src={thumbnail}
              alt="YouTube thumbnail"
              width={800}
              height={800}
              className="h-full w-full aspect-square object-cover object-center rounded-[16px] border border-white-opacity-20"
            />
          ) : (
            <div className="h-full w-full aspect-square bg-white-opacity-10 rounded-[16px] border border-white-opacity-20" />
          )}
        </div>
      </div>
    </a>
  );
}

