"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface HeroAnimationProps {
  className?: string;
  onProgress?: (progress: number) => void;
  frameCount?: number;
  framePrefix?: string;
  frameExtension?: string;
  backgroundImage?: string;
}

export function HeroAnimation({
  className,
  onProgress,
  frameCount = 408,
  framePrefix = "/animations/product-hero/frame_",
  frameExtension = ".jpg",
  backgroundImage = "/producthero.png",
}: HeroAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const bgImageRef = useRef<HTMLImageElement | null>(null);
  const currentFrameRef = useRef(0);
  const absoluteFrameRef = useRef(0);
  const requestRef = useRef<number>(0);
  const lastDrawTimeRef = useRef<number>(0);

  // Load Background Image
  useEffect(() => {
    if (backgroundImage) {
      const img = new Image();
      img.src = backgroundImage;
      bgImageRef.current = img;
    }
  }, [backgroundImage]);

  // Load images
  useEffect(() => {
    let active = true;
    let loadedCount = 0;
    const imgArray: HTMLImageElement[] = [];

    const loadImages = () => {
      for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        const paddedIndex = i.toString().padStart(4, "0");
        img.src = `${framePrefix}${paddedIndex}${frameExtension}`;
        
        img.onload = () => {
          if (!active) return;
          loadedCount++;
          if (loadedCount === frameCount) {
            setLoaded(true);
          }
        };

        imgArray.push(img);
      }
      if (active) setImages(imgArray);
    };

    loadImages();

    return () => {
      active = false;
      imgArray.forEach((img) => {
        img.src = ""; // Stop loading on unmount
      });
    };
  }, [frameCount, framePrefix, frameExtension]);

  // Draw background helper
  const drawBackground = (ctx: CanvasRenderingContext2D, alpha: number) => {
    if (!bgImageRef.current || !bgImageRef.current.complete) return;
    const cw = ctx.canvas.width;
    const ch = ctx.canvas.height;
    
    ctx.globalAlpha = alpha;
    
    // Target width is ~70% of canvas, right-aligned
    const imgW = bgImageRef.current.width;
    const imgH = bgImageRef.current.height;
    const targetW = cw * 0.8;
    const targetH = targetW * (imgH / imgW);
    
    const x = cw - targetW + (cw * 0.1); // Slightly off center right
    const y = 0; // Aligned to the fully top
    ctx.globalAlpha = alpha;
    // Draw the image
    ctx.drawImage(bgImageRef.current, x, y, targetW, targetH);
    
    // CRITICAL: The mask MUST be drawn at 100% opacity to cover the edges properly!
    ctx.globalAlpha = 1.0;

    // Apply Left Edge Fade
    const fadeLeft = ctx.createLinearGradient(x, 0, x + targetW * 0.35, 0);
    fadeLeft.addColorStop(0, "rgba(0,0,0,1)");
    fadeLeft.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = fadeLeft;
    ctx.fillRect(x, y, targetW * 0.35, targetH);

    // Apply Top Edge Fade
    const fadeTop = ctx.createLinearGradient(0, y, 0, y + targetH * 0.35);
    fadeTop.addColorStop(0, "rgba(0,0,0,1)");
    fadeTop.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = fadeTop;
    ctx.fillRect(x, y, targetW, targetH * 0.35);

    // Apply Bottom Edge Fade
    const fadeBottom = ctx.createLinearGradient(0, y + targetH, 0, y + targetH - targetH * 0.35);
    fadeBottom.addColorStop(0, "rgba(0,0,0,1)");
    fadeBottom.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = fadeBottom;
    ctx.fillRect(x, y + targetH - targetH * 0.35, targetW, targetH * 0.35);

    // Apply Right Edge Fade
    const fadeRight = ctx.createLinearGradient(x + targetW, 0, x + targetW - targetW * 0.35, 0);
    fadeRight.addColorStop(0, "rgba(0,0,0,1)");
    fadeRight.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = fadeRight;
    ctx.fillRect(x + targetW - targetW * 0.35, y, targetW * 0.35, targetH);
  };

  // Initial Draw
  useEffect(() => {
    if (images.length > 0 && images[0].complete && canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        ctx.globalCompositeOperation = "source-over";
        if (bgImageRef.current && bgImageRef.current.complete) {
          drawBackground(ctx, 1.0);
        } else {
          ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
          ctx.fillStyle = "black";
          ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        }

        ctx.globalCompositeOperation = "multiply";
        ctx.drawImage(images[0], 0, 0, canvasRef.current.width, canvasRef.current.height);

        // Ambient background starts at 0 on initial draw
        ctx.globalCompositeOperation = "source-over";
        drawBackground(ctx, 0.0);

        ctx.globalCompositeOperation = "screen";
        ctx.drawImage(images[0], 0, 0, canvasRef.current.width, canvasRef.current.height);
        
        ctx.globalCompositeOperation = "source-over";
      }
    }
  }, [images]);

  // Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsPlaying(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (canvasRef.current) observer.observe(canvasRef.current);
    
    return () => observer.disconnect();
  }, []);

  // Animation Loop
  useEffect(() => {
    const FPS = 24;
    const interval = 1000 / FPS;

    const animate = (time: DOMHighResTimeStamp) => {
      if (!isPlaying || !loaded || !canvasRef.current || images.length === 0) return;

      const elapsed = time - lastDrawTimeRef.current;

      if (elapsed > interval) {
        lastDrawTimeRef.current = time - (elapsed % interval);

        const ctx = canvasRef.current.getContext("2d");
        const idx = currentFrameRef.current;
        const img = images[idx];

        if (ctx && img && img.complete) {
          ctx.globalCompositeOperation = "source-over";
          if (bgImageRef.current && bgImageRef.current.complete) {
            drawBackground(ctx, 1.0);
          } else {
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
          }

          ctx.globalCompositeOperation = "multiply";
          ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);

          // Calculate ambient alpha using the absolute frame counter for a one-time fade in
          absoluteFrameRef.current += 1;
          const fadeInDurationFrames = 72; // ~3 seconds at 24fps
          const ambientAlpha = 0.2 * Math.min(absoluteFrameRef.current / fadeInDurationFrames, 1.0);

          // Add ambient opacity background image back so dark areas aren't purely black
          ctx.globalCompositeOperation = "source-over";
          drawBackground(ctx, ambientAlpha);

          ctx.globalCompositeOperation = "screen";
          ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);

          ctx.globalCompositeOperation = "source-over";
          
          const progress = idx / (frameCount - 1);
          if (onProgress) {
            onProgress(progress);
          }
        }

        currentFrameRef.current = (idx + 1) % frameCount;
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    if (isPlaying && loaded) {
      requestRef.current = requestAnimationFrame(animate);
    } else if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPlaying, loaded, images, frameCount, onProgress]);

  return (
    <canvas
      ref={canvasRef}
      width={1280}
      height={720}
      className={cn("w-full h-full object-cover", className)}
      aria-label="Product Animation sequence"
    />
  );
}
