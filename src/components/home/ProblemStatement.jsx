import React from "react";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const problems = [
  "Motion blur from drone vibration and movement",
  "Cast shadows distorting ground features",
  "Uneven illumination across image regions",
  "Multiple degradations occurring simultaneously",
  "Separate models increase computational cost",
  "Inconsistent outputs from pipeline approaches",
];

export default function ProblemStatement() {
  return (
    <div className="mt-10">
      <h2 className="text-lg font-inter font-semibold text-foreground mb-1">Problem Statement</h2>
      <p className="text-sm text-muted-foreground mb-6">Challenges in current UAV image processing</p>

      <Card className="bg-card border border-border overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-start gap-3 mb-5">
            <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0 mt-0.5">
              <AlertTriangle className="w-4 h-4 text-destructive" />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              UAV imagery often suffers from multiple simultaneous degradations. 
              Existing methods address these issues independently, increasing computational 
              cost and leading to inconsistent outputs. A unified, real-time restoration 
              system is needed.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {problems.map((problem, i) => (
              <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50">
                <ArrowRight className="w-3 h-3 text-primary shrink-0" />
                <span className="text-xs text-foreground/80">{problem}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}