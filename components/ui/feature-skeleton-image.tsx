import React from "react";
import Image from "next/image";

interface FeatureSkeletonImageProps {
  imageUrl?: string;
}

export function FeatureSkeletonImage({ imageUrl }: FeatureSkeletonImageProps) {
  return (
    <div className="relative flex py-8 px-2 gap-10 h-full">
      <div className="w-full p-5 mx-auto bg-white-opacity-10 backdrop-blur-lg border border-white-opacity-20 rounded-[32px] group h-full">
        <div className="flex flex-1 w-full h-full flex-col space-y-2">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt="Feature"
              width={800}
              height={800}
              className="h-full w-full aspect-square object-cover object-left-top rounded-[16px]"
            />
          ) : (
            <div className="h-full w-full aspect-square bg-white-opacity-10 rounded-[16px] border border-white-opacity-20" />
          )}
        </div>
      </div>

      <div className="absolute bottom-0 z-40 inset-x-0 h-60 bg-gradient-to-t from-dark via-dark to-transparent w-full pointer-events-none" />
      <div className="absolute top-0 z-40 inset-x-0 h-60 bg-gradient-to-b from-dark via-transparent to-transparent w-full pointer-events-none" />
    </div>
  );
}

