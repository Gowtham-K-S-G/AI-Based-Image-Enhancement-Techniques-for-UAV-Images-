import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Images, Layers, Maximize2, MapPin } from "lucide-react";

export default function DatasetStats({ dataset }) {
  const { stats, description, degradations } = dataset;

  const statItems = [
    { label: "Total Images", value: stats.totalImages.toLocaleString(), icon: Images },
    { label: "Image Pairs", value: stats.imagePairs.toLocaleString(), icon: Layers },
    { label: "Resolution", value: stats.resolution, icon: Maximize2 },
    { label: "Scenes", value: stats.scenes, icon: MapPin },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      key={dataset.name}
      className="mb-6"
    >
      <Card className="border border-border bg-card">
        <CardContent className="p-5">
          <div className="flex flex-col md:flex-row md:items-start gap-5">
            {/* Description */}
            <div className="flex-1">
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">{description}</p>
              <div className="flex flex-wrap gap-1.5">
                {degradations.map((d) => (
                  <Badge
                    key={d}
                    variant="outline"
                    className="text-[10px] font-mono"
                  >
                    {d}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3 shrink-0">
              {statItems.map((s) => (
                <div
                  key={s.label}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-muted/50 min-w-[120px]"
                >
                  <s.icon className="w-4 h-4 text-primary shrink-0" />
                  <div>
                    <p className="text-xs font-bold font-mono text-foreground">{s.value}</p>
                    <p className="text-[10px] text-muted-foreground">{s.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Split bar */}
          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-2">
              Dataset Split
            </p>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden flex">
                {Object.entries(stats.splits)
                  .filter(([, v]) => v > 0)
                  .map(([key, val], i) => {
                    const total = Object.values(stats.splits).reduce((a, b) => a + b, 0);
                    const colors = ["bg-primary", "bg-chart-3", "bg-chart-4"];
                    return (
                      <div
                        key={key}
                        className={colors[i]}
                        style={{ width: `${(val / total) * 100}%` }}
                      />
                    );
                  })}
              </div>
              <div className="flex gap-3 text-[10px] font-mono text-muted-foreground shrink-0">
                {Object.entries(stats.splits)
                  .filter(([, v]) => v > 0)
                  .map(([key, val]) => (
                    <span key={key} className="capitalize">
                      {key}: {val}
                    </span>
                  ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}