import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function PipelineStage({ stage, index, total, isActive, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.12 }}
    >
      <Card
        onClick={onClick}
        className={cn(
          "cursor-pointer border transition-all duration-300 relative overflow-hidden group",
          isActive
            ? "border-primary bg-primary/5 shadow-lg shadow-primary/5"
            : "border-border bg-card hover:border-primary/30"
        )}
      >
        {/* Stage number */}
        <div className={cn(
          "absolute top-0 right-0 w-16 h-16 flex items-end justify-start pb-2 pl-2",
          isActive ? "text-primary/15" : "text-muted/50"
        )}>
          <span className="text-4xl font-bold font-mono">{index + 1}</span>
        </div>

        <CardContent className="p-5 relative z-10">
          <div className="flex items-start gap-3">
            <div className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors",
              isActive ? "bg-primary/20" : "bg-muted"
            )}>
              <stage.icon className={cn("w-5 h-5", isActive ? "text-primary" : "text-muted-foreground")} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-inter font-semibold text-sm text-foreground mb-1">{stage.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-3">{stage.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {stage.models.map((model) => (
                  <Badge key={model} variant="outline" className="text-[10px] font-mono">
                    {model}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>

        {/* Connector line */}
        {index < total - 1 && (
          <div className="absolute -bottom-4 left-7 w-0.5 h-4 bg-border z-20" />
        )}
      </Card>
    </motion.div>
  );
}