import React from "react";
import { Badge } from "@/components/ui/badge";
import { Database } from "lucide-react";
import { cn } from "@/lib/utils";

const colorMap = {
  primary: "border-primary bg-primary/5 text-primary",
  "chart-3": "border-chart-3 bg-chart-3/5 text-chart-3",
  "chart-4": "border-chart-4 bg-chart-4/5 text-chart-4",
};

const activeBg = {
  primary: "bg-primary/10 border-primary text-primary",
  "chart-3": "bg-chart-3/10 border-chart-3 text-chart-3",
  "chart-4": "bg-chart-4/10 border-chart-4 text-chart-4",
};

export default function DatasetSelector({ datasets, activeDataset, onSelect, datasetMeta }) {
  return (
    <div className="flex flex-wrap gap-3 mb-6">
      {datasets.map((name) => {
        const meta = datasetMeta[name];
        const isActive = activeDataset === name;
        return (
          <button
            key={name}
            onClick={() => onSelect(name)}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-200 text-left",
              isActive
                ? activeBg[meta.color]
                : "border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground"
            )}
          >
            <Database className="w-4 h-4 shrink-0" />
            <div>
              <p className="text-sm font-inter font-semibold leading-tight">{name}</p>
              <p className="text-[10px] font-mono mt-0.5 opacity-70">
                {meta.stats.totalImages.toLocaleString()} images
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}