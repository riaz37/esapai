"use client";

import WorldMap from "@/components/ui/world-map";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";

export function WorldMapSection() {
  // Define connections between major cities/regions
  const connections = [
    {
      start: { lat: 40.7128, lng: -74.006, label: "New York" },
      end: { lat: 51.5074, lng: -0.1278, label: "London" },
    },
    {
      start: { lat: 51.5074, lng: -0.1278, label: "London" },
      end: { lat: 35.6895, lng: 139.6917, label: "Tokyo" },
    },
    {
      start: { lat: 35.6895, lng: 139.6917, label: "Tokyo" },
      end: { lat: 25.2048, lng: 55.2708, label: "Dubai" },
    },
    {
      start: { lat: 25.2048, lng: 55.2708, label: "Dubai" },
      end: { lat: -33.8688, lng: 151.2093, label: "Sydney" },
    },
    {
      start: { lat: -33.8688, lng: 151.2093, label: "Sydney" },
      end: { lat: 40.7128, lng: -74.006, label: "New York" },
    },
    {
      start: { lat: 28.6139, lng: 77.209, label: "New Delhi" },
      end: { lat: 22.3193, lng: 114.1694, label: "Hong Kong" },
    },
    {
      start: { lat: 22.3193, lng: 114.1694, label: "Hong Kong" },
      end: { lat: 37.7749, lng: -122.4194, label: "San Francisco" },
    },
  ];

  return (
    <Section>
      <SectionHeader
        title={
          <>
            <span className="block">Global Reach,</span>
            <span className="block text-primary">Local Impact</span>
          </>
        }
        subtitle="Our AI solutions are deployed across the globe, connecting businesses and enabling innovation worldwide."
      />

      {/* World Map */}
      <div className="relative w-full max-w-6xl mx-auto">
        <WorldMap
          dots={connections}
          lineColor="rgba(19, 245, 132, 1)"
        />
      </div>
    </Section>
  );
}

