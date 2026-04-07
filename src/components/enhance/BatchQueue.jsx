import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2, Clock, X, Download, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const statusConfig = {
  pending:    { icon: Clock,         color: "text-muted-foreground", bg: "bg-muted",       label: "Pending" },
  processing: { icon: Loader2,       color: "text-primary",          bg: "bg-primary/10",  label: "Processing", spin: true },
  done:       { icon: CheckCircle2,  color: "text-accent",           bg: "bg-accent/10",   label: "Done" },
  error:      { icon: AlertCircle,   color: "text-destructive",      bg: "bg-destructive/10", label: "Error" },
};

function QueueItem({ item, onRemove, isActive, stageProgress, currentStage }) {
  const cfg = statusConfig[item.status];
  const Icon = cfg.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <div className={cn(
        "flex items-center gap-3 p-3 rounded-xl border transition-all",
        isActive ? "border-primary/40 bg-primary/5" : "border-border bg-card"
      )}>
        {/* Thumbnail */}
        <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-muted">
          <img src={item.preview} alt={item.name} className="w-full h-full object-cover" />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="text-xs font-inter font-semibold text-foreground truncate">{item.name}</p>
          <p className="text-[10px] text-muted-foreground font-mono">{(item.size / 1024).toFixed(0)} KB</p>

          {isActive && item.status === "processing" && (
            <div className="mt-1.5">
              <Progress value={stageProgress} className="h-1" />
              <p className="text-[10px] text-primary font-mono mt-0.5 truncate">
                {currentStage >= 0 ? ["Illumination", "Shadow", "Blur", "Refinement"][currentStage] + "..." : "Starting..."}
              </p>
            </div>
          )}

          {item.status === "done" && item.enhancedUrl && (
            <a
              href={item.enhancedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[10px] text-accent font-mono mt-1 hover:underline"
            >
              <Download className="w-3 h-3" /> Download
            </a>
          )}
        </div>

        {/* Status badge */}
        <div className={cn("flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-mono shrink-0", cfg.bg, cfg.color)}>
          <Icon className={cn("w-3 h-3", cfg.spin && "animate-spin")} />
          {cfg.label}
        </div>

        {/* Remove button */}
        {item.status === "pending" && (
          <button
            onClick={() => onRemove(item.id)}
            className="p-1 rounded text-muted-foreground hover:text-foreground transition-colors shrink-0"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </motion.div>
  );
}

export default function BatchQueue({ queue, onRemove, activeId, stageProgress, currentStage }) {
  if (queue.length === 0) return null;

  const done = queue.filter((i) => i.status === "done").length;
  const total = queue.length;

  return (
    <Card className="border border-border bg-card">
      <div className="px-4 py-3 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-inter font-semibold text-foreground">Queue</span>
          <Badge variant="outline" className="text-[10px] font-mono">{done}/{total}</Badge>
        </div>
        {total > 0 && (
          <Progress value={(done / total) * 100} className="w-24 h-1.5" />
        )}
      </div>
      <CardContent className="p-3 space-y-2 max-h-96 overflow-y-auto">
        <AnimatePresence>
          {queue.map((item) => (
            <QueueItem
              key={item.id}
              item={item}
              onRemove={onRemove}
              isActive={item.id === activeId}
              stageProgress={stageProgress}
              currentStage={currentStage}
            />
          ))}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}