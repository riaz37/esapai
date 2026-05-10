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
  isRTL?: boolean;
}

export function HeroAnimation({
  className,
  onProgress,
  frameCount = 408,
  framePrefix = "/animations/product-hero/frame_",
  frameExtension = ".jpg",
  backgroundImage = "/images/comic.png",
  isRTL = false,
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

  // Draw a frame with cover scaling — focal point shifts right on mobile
  // to keep the lightbulb (at ~75% from left) visible on portrait viewports
  const drawFrameCover = (ctx: CanvasRenderingContext2D, img: HTMLImageElement) => {
    const cw = ctx.canvas.width;
    const ch = ctx.canvas.height;
    const scale = Math.max(cw / img.width, ch / img.height);
    const drawW = img.width * scale;
    const drawH = img.height * scale;
    const dpr = window.devicePixelRatio || 1;
    const isMobile = cw / dpr < 1024;
    const xFocal = isMobile ? 0.72 : 0.5; // 72% from left on mobile to center lightbulb
    const x = (cw - drawW) * xFocal;
    const y = (ch - drawH) / 2;
    ctx.drawImage(img, x, y, drawW, drawH);
  };

  // Draw background helper — cover full canvas
  const drawBackground = (ctx: CanvasRenderingContext2D, alpha: number) => {
    if (!bgImageRef.current || !bgImageRef.current.complete) return;
    const cw = ctx.canvas.width;
    const ch = ctx.canvas.height;

    const imgW = bgImageRef.current.width;
    const imgH = bgImageRef.current.height;

    // Cover: fill entire canvas (may crop), centered
    const scale = Math.max(cw / imgW, ch / imgH);
    const drawW = imgW * scale;
    const drawH = imgH * scale;
    const x = (cw - drawW) / 2;
    const y = (ch - drawH) / 2;

    ctx.globalAlpha = alpha * 0.4;
    ctx.drawImage(bgImageRef.current, x, y, drawW, drawH);

    ctx.globalAlpha = 1.0;

    // Soft edge fades on all sides
    const fadeSize = 0.15;

    const fadeLeft = ctx.createLinearGradient(0, 0, cw * fadeSize, 0);
    fadeLeft.addColorStop(0, "rgba(0,0,0,1)");
    fadeLeft.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = fadeLeft;
    ctx.fillRect(0, 0, cw * fadeSize, ch);

    const fadeTop = ctx.createLinearGradient(0, 0, 0, ch * fadeSize);
    fadeTop.addColorStop(0, "rgba(0,0,0,1)");
    fadeTop.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = fadeTop;
    ctx.fillRect(0, 0, cw, ch * fadeSize);

    const bottomFadeSize = 0.2;
    const fadeBottom = ctx.createLinearGradient(0, ch, 0, ch - ch * bottomFadeSize);
    fadeBottom.addColorStop(0, "rgba(0,0,0,1)");
    fadeBottom.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = fadeBottom;
    ctx.fillRect(0, ch - ch * bottomFadeSize, cw, ch * bottomFadeSize);

    const fadeRight = ctx.createLinearGradient(cw, 0, cw - cw * fadeSize, 0);
    fadeRight.addColorStop(0, "rgba(0,0,0,1)");
    fadeRight.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = fadeRight;
    ctx.fillRect(cw - cw * fadeSize, 0, cw * fadeSize, ch);
  };

  // Edge vignette — runs AFTER all compositing to fade all edges to black
  const drawEdgeVignette = (ctx: CanvasRenderingContext2D) => {
    const cw = ctx.canvas.width;
    const ch = ctx.canvas.height;
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 1.0;

    const leftSize = isRTL ? 0.15 : 0.25;
    const rightSize = isRTL ? 0.25 : 0.15;
    const bottomSize = 0.15;
    const topSize = 0.08;

    const fadeLeft = ctx.createLinearGradient(0, 0, cw * leftSize, 0);
    fadeLeft.addColorStop(0, "rgba(0,0,0,1)");
    fadeLeft.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = fadeLeft;
    ctx.fillRect(0, 0, cw * leftSize, ch);

    const fadeRight = ctx.createLinearGradient(cw, 0, cw - cw * rightSize, 0);
    fadeRight.addColorStop(0, "rgba(0,0,0,1)");
    fadeRight.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = fadeRight;
    ctx.fillRect(cw - cw * rightSize, 0, cw * rightSize, ch);

    const fadeBottom = ctx.createLinearGradient(0, ch, 0, ch - ch * bottomSize);
    fadeBottom.addColorStop(0, "rgba(0,0,0,1)");
    fadeBottom.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = fadeBottom;
    ctx.fillRect(0, ch - ch * bottomSize, cw, ch * bottomSize);

    const fadeTop = ctx.createLinearGradient(0, 0, 0, ch * topSize);
    fadeTop.addColorStop(0, "rgba(0,0,0,1)");
    fadeTop.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = fadeTop;
    ctx.fillRect(0, 0, cw, ch * topSize);
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
        drawFrameCover(ctx, images[0]);

        // Ambient background starts at 0 on initial draw
        ctx.globalCompositeOperation = "source-over";
        drawBackground(ctx, 0.0);

        ctx.globalCompositeOperation = "screen";
        drawFrameCover(ctx, images[0]);

        drawEdgeVignette(ctx);
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
          drawFrameCover(ctx, img);

          // Calculate ambient alpha using the absolute frame counter for a one-time fade in
          absoluteFrameRef.current += 1;
          const fadeInDurationFrames = 72; // ~3 seconds at 24fps
          const ambientAlpha = 0.2 * Math.min(absoluteFrameRef.current / fadeInDurationFrames, 1.0);

          // Add ambient opacity background image back so dark areas aren't purely black
          ctx.globalCompositeOperation = "source-over";
          drawBackground(ctx, ambientAlpha);

          ctx.globalCompositeOperation = "screen";
          drawFrameCover(ctx, img);

          drawEdgeVignette(ctx);

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

  // Resize canvas to match container so CSS doesn't scale/zoom it
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeObserver = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
    });

    resizeObserver.observe(canvas);
    return () => resizeObserver.disconnect();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={cn("w-full h-full", className)}
      style={isRTL ? { transform: "scaleX(-1)" } : undefined}
      aria-label="Product Animation sequence"
    />
  );
}
