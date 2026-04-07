import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function ModelSelector({ models, selectedModel, onSelect, side }) {
  const sideLabel = side === "left" ? "Left Model" : "Right Model";
  const sideColor = side === "left" ? "text-primary" : "text-accent";

  return (
    <div>
      <p className={cn("text-[10px] font-mono uppercase tracking-wider mb-2", sideColor)}>
        {sideLabel}
      </p>
      <div className="flex flex-wrap gap-2">
        {models.map((model) => {
          const isSelected = selectedModel === model.id;
          return (
            <button
              key={model.id}
              onClick={() => onSelect(model.id)}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-inter font-medium transition-all duration-200",
                isSelected
                  ? side === "left"
                    ? "bg-primary/10 border-primary text-primary"
                    : "bg-accent/10 border-accent text-accent"
                  : "bg-card border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
              )}
            >
              <span
                className={cn("w-2 h-2 rounded-full shrink-0", isSelected
                  ? side === "left" ? "bg-primary" : "bg-accent"
                  : "bg-muted-foreground/40"
                )}
              />
              {model.name}
              {model.badge && (
                <Badge className="text-[9px] px-1 py-0 font-mono bg-chart-3/10 text-chart-3 border-chart-3/20 border">
                  {model.badge}
                </Badge>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}