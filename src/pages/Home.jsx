import React from "react";
import HeroSection from "../components/home/HeroSection";
import ObjectivesGrid from "../components/home/ObjectivesGrid";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto space-y-2">
      <HeroSection />
      <ObjectivesGrid />
    </div>
  );
}
