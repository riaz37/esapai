import React from "react";
import { FeatureSkeletonImage } from "./feature-skeleton-image";
import { FeatureSkeletonGallery } from "./feature-skeleton-gallery";
import { FeatureSkeletonYouTube } from "./feature-skeleton-youtube";
import { FeatureSkeletonGlobe } from "./feature-skeleton-globe";

export interface FeatureSkeletonProps {
  imageUrl?: string;
  galleryImages?: string[];
  youtubeUrl?: string;
  youtubeThumbnail?: string;
}

interface FeatureSkeletonComponentProps {
  skeleton: "image" | "gallery" | "youtube" | "globe" | undefined;
  props?: FeatureSkeletonProps;
}

/**
 * Renders the appropriate skeleton component based on the skeleton type.
 * This is a convenience component that selects the right skeleton based on the type.
 */
export function FeatureSkeleton({
  skeleton,
  props,
}: FeatureSkeletonComponentProps): React.ReactNode {
  if (!skeleton) {
    return null;
  }

  switch (skeleton) {
    case "image":
      return <FeatureSkeletonImage imageUrl={props?.imageUrl} />;
    case "gallery":
      return <FeatureSkeletonGallery images={props?.galleryImages} />;
    case "youtube":
      return (
        <FeatureSkeletonYouTube
          youtubeUrl={props?.youtubeUrl}
          thumbnail={props?.youtubeThumbnail}
        />
      );
    case "globe":
      return <FeatureSkeletonGlobe />;
    default:
      return null;
  }
}

// Export individual skeleton components for direct use
export {
  FeatureSkeletonImage,
  FeatureSkeletonGallery,
  FeatureSkeletonYouTube,
  FeatureSkeletonGlobe,
};

