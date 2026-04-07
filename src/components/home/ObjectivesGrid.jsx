import React from "react";
import { motion } from "framer-motion";
import { Target, Layers, Gauge, Search, Minimize2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const objectives = [
  {
    icon: Target,
    title: "Unified Restoration Model",
    description: "Develop a single model that handles all UAV image degradations simultaneously.",
  },
  {
    icon: Layers,
    title: "Multi-Degradation Handling",
    description: "Simultaneously correct motion blur, shadows, and illumination variations.",
  },
  {
    icon: Gauge,
    title: "Real-Time Performance",
    description: "Optimize for real-time processing suitable for live UAV applications.",
  },
  {
    icon: Search,
    title: "Detection Accuracy",
    description: "Enhance image quality to improve downstream object detection tasks.",
  },
  {
    icon: Minimize2,
    title: "Reduced Model Dependency",
    description: "Eliminate the need for multiple separate restoration models.",
  },
];

export default function ObjectivesGrid() {
  return (
    <div className="mt-10">
      <h2 className="text-lg font-inter font-semibold text-foreground mb-1">Project Objectives</h2>
      <p className="text-sm text-muted-foreground mb-6">Core goals driving this research</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {objectives.map((obj, i) => (
          <motion.div
            key={obj.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            <Card className="bg-card/80 border border-border hover:border-primary/30 transition-all duration-300 h-full group">
              <CardContent className="p-5">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                  <obj.icon className="w-4 h-4 text-primary" />
                </div>
                <h3 className="font-inter font-semibold text-sm text-foreground mb-1.5">{obj.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{obj.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}