import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const categories = [
  {
    label: "Language",
    items: ["Python"],
  },
  {
    label: "Deep Learning",
    items: ["PyTorch"],
  },
  {
    label: "Vision",
    items: ["OpenCV"],
  },
  {
    label: "Backend",
    items: ["FastAPI"],
  },
  {
    label: "Optimization",
    items: ["TensorRT", "ONNX Runtime"],
  },
  {
    label: "Models",
    items: ["NAFNet", "Zero-DCE", "Retinex", "PromptIR"],
  },
  {
    label: "Datasets",
    items: ["UAVIR-5D", "ISTD", "SRD"],
  },
];

export default function TechStack() {
  return (
    <div className="mt-10">
      <h2 className="text-lg font-inter font-semibold text-foreground mb-1">Technology Stack</h2>
      <p className="text-sm text-muted-foreground mb-6">Software and tools powering this research</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {categories.map((cat) => (
          <Card key={cat.label} className="bg-card border border-border">
            <CardContent className="p-4">
              <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-2">
                {cat.label}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {cat.items.map((item) => (
                  <Badge
                    key={item}
                    variant="secondary"
                    className="text-xs font-mono bg-primary/5 text-primary border border-primary/10"
                  >
                    {item}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}