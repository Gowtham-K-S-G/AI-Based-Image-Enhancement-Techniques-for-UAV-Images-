import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings2, Sun, Eclipse, Focus, Sparkles, ChevronDown, ChevronUp, RotateCcw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const defaultSettings = {
  illumination: { enabled: true, intensity: 70 },
  shadow:        { enabled: true, intensity: 80 },
  blur:          { enabled: true, intensity: 65 },
  refinement:    { enabled: true, intensity: 75 },
};

const stageConfig = [
  {
    key: "illumination",
    label: "Illumination Enhancement",
    icon: Sun,
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
    description: "Corrects under/over-exposure and normalises brightness across the aerial scene.",
  },
  {
    key: "shadow",
    label: "Shadow Removal",
    icon: Eclipse,
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    description: "Detects and removes hard shadows cast by objects, vegetation, and buildings.",
  },
  {
    key: "blur",
    label: "Blur Correction",
    icon: Focus,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    description: "Deconvolves motion and defocus blur introduced during UAV flight.",
  },
  {
    key: "refinement",
    label: "Unified Refinement",
    icon: Sparkles,
    color: "text-primary",
    bg: "bg-primary/10",
    description: "Final pass that harmonises all corrections and sharpens fine detail.",
  },
];

function StageRow({ cfg, settings, onChange }) {
  const [expanded, setExpanded] = useState(false);
  const Icon = cfg.icon;
  const s = settings[cfg.key];

  return (
    <div className={cn("rounded-xl border transition-colors", s.enabled ? "border-border bg-card" : "border-border/40 bg-muted/30")}>
      {/* Header row */}
      <div className="flex items-center gap-3 px-4 py-3">
        <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0", cfg.bg)}>
          <Icon className={cn("w-4 h-4", cfg.color)} />
        </div>

        <div className="flex-1 min-w-0">
          <p className={cn("text-xs font-inter font-semibold truncate", s.enabled ? "text-foreground" : "text-muted-foreground")}>
            {cfg.label}
          </p>
          {s.enabled && (
            <p className="text-[10px] text-muted-foreground font-mono">Intensity: {s.intensity}%</p>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {!s.enabled && <Badge variant="outline" className="text-[9px] font-mono text-muted-foreground">Skipped</Badge>}
          <Switch
            checked={s.enabled}
            onCheckedChange={(val) => onChange(cfg.key, { ...s, enabled: val })}
          />
          {s.enabled && (
            <button
              onClick={() => setExpanded((v) => !v)}
              className="p-1 rounded text-muted-foreground hover:text-foreground transition-colors"
            >
              {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          )}
        </div>
      </div>

      {/* Expanded controls */}
      <AnimatePresence>
        {s.enabled && expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-0 space-y-3 border-t border-border/50">
              <p className="text-[10px] text-muted-foreground pt-3">{cfg.description}</p>
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-mono text-muted-foreground w-16 shrink-0">Intensity</span>
                <Slider
                  value={[s.intensity]}
                  onValueChange={([val]) => onChange(cfg.key, { ...s, intensity: val })}
                  min={10}
                  max={100}
                  step={5}
                  className="flex-1"
                />
                <span className="text-[10px] font-mono text-primary w-8 text-right">{s.intensity}%</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function PipelineSettings({ settings, onChange }) {
  const [open, setOpen] = useState(false);

  const activeCount = Object.values(settings).filter((s) => s.enabled).length;

  const handleReset = () => onChange(defaultSettings);

  return (
    <div>
      {/* Toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 text-xs font-inter font-medium text-muted-foreground hover:text-foreground transition-colors mb-3"
      >
        <Settings2 className="w-3.5 h-3.5" />
        Custom Settings
        <Badge variant="outline" className="text-[9px] font-mono ml-1">{activeCount}/4 stages</Badge>
        {open ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <Card className="border border-border bg-card/50 mb-4">
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-[10px] text-muted-foreground font-mono">
                    Configure which pipeline stages run and at what intensity.
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleReset}
                    className="text-[10px] h-6 px-2 gap-1 text-muted-foreground"
                  >
                    <RotateCcw className="w-3 h-3" /> Reset
                  </Button>
                </div>

                {stageConfig.map((cfg) => (
                  <StageRow
                    key={cfg.key}
                    cfg={cfg}
                    settings={settings}
                    onChange={(key, val) => onChange({ ...settings, [key]: val })}
                  />
                ))}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}