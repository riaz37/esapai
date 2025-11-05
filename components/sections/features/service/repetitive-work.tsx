"use client";

import { useId } from "react";
import { Section } from "@/components/ui/section";

export function RepetitiveWork() {
  const uniqueId = useId();

  return (
    <Section>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="block text-light-gray-90">
                The End of{" "}
                <span className="text-primary">Repetitive</span>
              </span>
              <span className="block text-light-gray-90">
                Work. <span className="text-primary">Systems</span> that work
              </span>
              <span className="block text-light-gray-90">
                for people <span className="text-primary">not</span> the other
              </span>
              <span className="block text-light-gray-90">
                way around.
              </span>
            </h2>
          </div>

          {/* Right Side - Target with Dart Graphic */}
          <div className="flex items-center justify-center">
            <div className="relative">
              <svg
                width="400"
                height="400"
                viewBox="0 0 400 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full max-w-[400px] h-auto"
              >
                <defs>
                  <filter id={uniqueId} x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <filter id={`${uniqueId}-strong`} x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Five concentric circles - outermost to innermost */}
                <circle
                  cx="200"
                  cy="200"
                  r="160"
                  stroke="rgba(19, 245, 132, 0.3)"
                  strokeWidth="2"
                  fill="none"
                  filter={`url(#${uniqueId})`}
                />
                <circle
                  cx="200"
                  cy="200"
                  r="130"
                  stroke="rgba(19, 245, 132, 0.4)"
                  strokeWidth="2"
                  fill="none"
                  filter={`url(#${uniqueId})`}
                />
                <circle
                  cx="200"
                  cy="200"
                  r="100"
                  stroke="rgba(19, 245, 132, 0.5)"
                  strokeWidth="2"
                  fill="none"
                  filter={`url(#${uniqueId})`}
                />
                <circle
                  cx="200"
                  cy="200"
                  r="70"
                  stroke="rgba(19, 245, 132, 0.6)"
                  strokeWidth="2"
                  fill="none"
                  filter={`url(#${uniqueId})`}
                />
                <circle
                  cx="200"
                  cy="200"
                  r="40"
                  stroke="rgba(19, 245, 132, 0.7)"
                  strokeWidth="2"
                  fill="none"
                  filter={`url(#${uniqueId})`}
                />
                {/* Center dot - brightest and most opaque */}
                <circle
                  cx="200"
                  cy="200"
                  r="12"
                  fill="rgba(19, 245, 132, 0.95)"
                  filter={`url(#${uniqueId}-strong)`}
                />

                {/* Dart - positioned from bottom-left, hitting center, extending upward-right */}
                <g>
                  {/* Trajectory line (faint) */}
                  <line
                    x1="60"
                    y1="340"
                    x2="200"
                    y2="200"
                    stroke="rgba(19, 245, 132, 0.2)"
                    strokeWidth="1"
                    strokeDasharray="3,3"
                  />
                  
                  {/* Dart shaft - from center extending upward-right */}
                  <line
                    x1="200"
                    y1="200"
                    x2="280"
                    y2="120"
                    stroke="rgba(19, 245, 132, 1)"
                    strokeWidth="5"
                    strokeLinecap="round"
                    filter={`url(#${uniqueId}-strong)`}
                  />
                  
                  {/* Dart tip at center */}
                  <circle
                    cx="200"
                    cy="200"
                    r="4"
                    fill="rgba(19, 245, 132, 1)"
                    filter={`url(#${uniqueId}-strong)`}
                  />
                  
                  {/* Dart fletching (feathers) at the back */}
                  <g transform="translate(280, 120)">
                    <path
                      d="M 0 0 L -8 -6 M 0 0 L -8 6 M 0 0 L -12 0"
                      stroke="rgba(19, 245, 132, 0.9)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      filter={`url(#${uniqueId})`}
                    />
                  </g>
                </g>
              </svg>
            </div>
          </div>
        </div>
    </Section>
  );
}

