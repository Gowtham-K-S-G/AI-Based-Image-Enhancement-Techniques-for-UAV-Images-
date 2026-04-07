import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import ImageSlider from "../components/comparison/ImageSlider";
import TripleSplitView from "../components/comparison/TripleSplitView";
import MetricsTable from "../components/comparison/MetricsTable";
import { ArrowLeftRight, Columns3 } from "lucide-react";

const models = [
  {
    id: "input",
    name: "Degraded Input",
    badge: null,
    description: "Original UAV image with mixed degradations",
    metrics: { psnr: "20.1", ssim: "0.71", lpips: "0.42", params: "—", fps: "—", flops: "—" },
  },
  {
    id: "nafnet",
    name: "NAFNet",
    badge: null,
    description: "Non-linear Activation Free Network — fast & lightweight deblurring",
    metrics: { psnr: "33.7", ssim: "0.927", lpips: "0.081", params: "17.1", fps: "42", flops: "65.8" },
  },
  {
    id: "restormer",
    name: "Restormer",
    badge: null,
    description: "Efficient Transformer for High-Resolution Image Restoration",
    metrics: { psnr: "34.1", ssim: "0.934", lpips: "0.074", params: "26.1", fps: "28", flops: "140.9" },
  },
  {
    id: "promptir",
    name: "PromptIR",
    badge: null,
    description: "Prompt-based Image Restoration — handles multiple degradation types",
    metrics: { psnr: "33.2", ssim: "0.931", lpips: "0.079", params: "35.6", fps: "22", flops: "158.4" },
  },
  {
    id: "zeroDce",
    name: "Zero-DCE",
    badge: null,
    description: "Zero-Reference Deep Curve Estimation for illumination enhancement",
    metrics: { psnr: "22.8", ssim: "0.856", lpips: "0.135", params: "0.08", fps: "120", flops: "0.35" },
  },
  {
    id: "proposed",
    name: "Proposed",
    badge: "Ours",
    description: "Unified 4-stage transformer pipeline — best overall restoration",
    metrics: { psnr: "34.8", ssim: "0.962", lpips: "0.061", params: "42.0", fps: "35", flops: "95.2" },
  },
];

const scenes = [
  {
    id: "urban",
    label: "Urban Area",
    degradation: "Motion Blur + Shadow",
    images: {
      input:    "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=30&blur=5",
      nafnet:   "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=68",
      restormer:"https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=75",
      promptir: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=72",
      zeroDce:  "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=60",
      proposed: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=88",
    },
  },
  {
    id: "field",
    label: "Agricultural Field",
    degradation: "Illumination + Shadow",
    images: {
      input:    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=30",
      nafnet:   "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=65",
      restormer:"https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=74",
      promptir: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=70",
      zeroDce:  "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=58",
      proposed: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=85",
    },
  },
  {
    id: "forest",
    label: "Forest Canopy",
    degradation: "Motion Blur",
    images: {
      input:    "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=28",
      nafnet:   "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=67",
      restormer:"https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=76",
      promptir: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=71",
      zeroDce:  "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=56",
      proposed: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=87",
    },
  },
  {
    id: "coast",
    label: "Coastal Region",
    degradation: "Haze + Illumination",
    images: {
      input:    "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&q=28",
      nafnet:   "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&q=65",
      restormer:"https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&q=73",
      promptir: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&q=70",
      zeroDce:  "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&q=59",
      proposed: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&q=86",
    },
  },
];

const modelColors = [
  { border: "border-primary/40", dot: "bg-primary", label: "A" },
  { border: "border-accent/40",  dot: "bg-accent",  label: "B" },
  { border: "border-chart-3/40", dot: "bg-chart-3", label: "C" },
];

function ModelPicker({ label, dotColor, borderColor, selectedId, onChange, excludeIds }) {
  return (
    <div>
      <p className="text-[10px] font-mono text-muted-foreground mb-1.5 flex items-center gap-1.5">
        <span className={cn("w-2 h-2 rounded-full", dotColor)} />
        Panel {label}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {models.map((m) => {
          const isSelected = m.id === selectedId;
          const isDisabled = excludeIds.includes(m.id) && !isSelected;
          return (
            <button
              key={m.id}
              onClick={() => !isDisabled && onChange(m.id)}
              disabled={isDisabled}
              className={cn(
                "px-2.5 py-1 rounded-lg border text-[10px] font-inter font-medium transition-all",
                isSelected
                  ? cn("text-foreground", borderColor, "bg-card shadow-sm")
                  : isDisabled
                  ? "border-border/30 text-muted-foreground/30 cursor-not-allowed bg-transparent"
                  : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground bg-transparent"
              )}
            >
              {m.name}
              {m.badge && <span className="ml-1 opacity-60">★</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function Comparison() {
  const [mode, setMode] = useState("2way"); // "2way" | "3way"
  const [leftModelId,   setLeftModelId]   = useState("nafnet");
  const [rightModelId,  setRightModelId]  = useState("proposed");
  const [midModelId,    setMidModelId]    = useState("restormer");
  const [activeScene, setActiveScene] = useState(scenes[0]);

  const leftModel  = models.find((m) => m.id === leftModelId);
  const rightModel = models.find((m) => m.id === rightModelId);
  const midModel   = models.find((m) => m.id === midModelId);

  const leftImage  = activeScene.images[leftModelId];
  const rightImage = activeScene.images[rightModelId];
  const midImage   = activeScene.images[midModelId];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-end gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-inter font-bold text-foreground mb-1">
            Model Comparison
          </h1>
          <p className="text-sm text-muted-foreground max-w-xl">
            Compare restoration outputs side-by-side. Switch between 2-way slider and 3-way split view.
          </p>
        </div>

        {/* Mode toggle */}
        <div className="flex items-center gap-1 bg-muted rounded-xl p-1 shrink-0">
          <button
            onClick={() => setMode("2way")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-inter font-medium transition-all",
              mode === "2way" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <ArrowLeftRight className="w-3.5 h-3.5" />
            2-Way Slider
          </button>
          <button
            onClick={() => setMode("3way")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-inter font-medium transition-all",
              mode === "3way" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Columns3 className="w-3.5 h-3.5" />
            3-Way Split
          </button>
        </div>
      </div>

      {/* Scene selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {scenes.map((scene) => (
          <button
            key={scene.id}
            onClick={() => setActiveScene(scene)}
            className={cn(
              "flex flex-col items-start px-4 py-2.5 rounded-xl border text-left transition-all duration-200",
              activeScene.id === scene.id
                ? "bg-primary/10 border-primary"
                : "bg-card border-border hover:border-primary/30"
            )}
          >
            <span className={cn("text-xs font-inter font-semibold", activeScene.id === scene.id ? "text-primary" : "text-foreground")}>
              {scene.label}
            </span>
            <span className="text-[10px] text-muted-foreground font-mono">{scene.degradation}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main view */}
        <div className="xl:col-span-2 space-y-4">
          {/* Model pickers */}
          <Card className="border border-border bg-card">
            <CardContent className="p-4 space-y-3">
              {mode === "2way" ? (
                <>
                  <ModelPicker label="A (Left)"  dotColor={modelColors[0].dot} borderColor={modelColors[0].border} selectedId={leftModelId}  onChange={setLeftModelId}  excludeIds={[rightModelId]} />
                  <ModelPicker label="B (Right)" dotColor={modelColors[1].dot} borderColor={modelColors[1].border} selectedId={rightModelId} onChange={setRightModelId} excludeIds={[leftModelId]} />
                </>
              ) : (
                <>
                  <ModelPicker label="A (Left)"   dotColor={modelColors[0].dot} borderColor={modelColors[0].border} selectedId={leftModelId}  onChange={setLeftModelId}  excludeIds={[midModelId, rightModelId]} />
                  <ModelPicker label="B (Middle)" dotColor={modelColors[1].dot} borderColor={modelColors[1].border} selectedId={midModelId}   onChange={setMidModelId}   excludeIds={[leftModelId, rightModelId]} />
                  <ModelPicker label="C (Right)"  dotColor={modelColors[2].dot} borderColor={modelColors[2].border} selectedId={rightModelId} onChange={setRightModelId} excludeIds={[leftModelId, midModelId]} />
                </>
              )}
            </CardContent>
          </Card>

          {/* Image view */}
          <motion.div
            key={`${mode}-${activeScene.id}-${leftModelId}-${rightModelId}-${midModelId}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {mode === "2way" ? (
              <ImageSlider
                leftImage={leftImage}
                rightImage={rightImage}
                leftLabel={leftModel?.name}
                rightLabel={rightModel?.name}
              />
            ) : (
              <TripleSplitView
                images={[leftImage, midImage, rightImage]}
                labels={[leftModel?.name, midModel?.name, rightModel?.name]}
              />
            )}
          </motion.div>

          <p className="text-center text-xs text-muted-foreground flex items-center justify-center gap-1.5">
            {mode === "2way" ? (
              <><ArrowLeftRight className="w-3.5 h-3.5" /> Drag the handle or click anywhere to move the divider</>
            ) : (
              <><Columns3 className="w-3.5 h-3.5" /> Drag either handle to resize the three panels</>
            )}
          </p>
        </div>

        {/* Right panel */}
        <div className="space-y-4">
          {/* Model info cards */}
          {(mode === "2way"
            ? [{ model: leftModel, color: modelColors[0] }, { model: rightModel, color: modelColors[1] }]
            : [{ model: leftModel, color: modelColors[0] }, { model: midModel, color: modelColors[1] }, { model: rightModel, color: modelColors[2] }]
          ).map(({ model, color }) => (
            <Card key={model.id} className={cn("border bg-card", color.border)}>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={cn("w-2.5 h-2.5 rounded-full shrink-0", color.dot)} />
                  <span className="font-inter font-semibold text-sm text-foreground">{model.name}</span>
                  {model.badge && (
                    <Badge className="text-[9px] font-mono bg-chart-3/10 text-chart-3 border border-chart-3/20">
                      {model.badge}
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{model.description}</p>
              </CardContent>
            </Card>
          ))}

          {/* Metrics table (2-way only — comparing 3 in one table is too cramped) */}
          {mode === "2way" && <MetricsTable leftModel={leftModel} rightModel={rightModel} />}

          {/* 3-way quick metrics */}
          {mode === "3way" && (
            <Card className="border border-border bg-card">
              <div className="px-4 py-3 border-b border-border">
                <p className="text-xs font-inter font-semibold text-foreground">Key Metrics</p>
              </div>
              <CardContent className="p-4">
                <div className="space-y-3">
                  {["psnr", "ssim", "lpips"].map((metric) => (
                    <div key={metric}>
                      <p className="text-[10px] font-mono text-muted-foreground uppercase mb-1">{metric}</p>
                      <div className="space-y-1">
                        {[{ model: leftModel, color: modelColors[0] }, { model: midModel, color: modelColors[1] }, { model: rightModel, color: modelColors[2] }].map(({ model, color }) => (
                          <div key={model.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                              <span className={cn("w-1.5 h-1.5 rounded-full", color.dot)} />
                              <span className="text-[10px] text-muted-foreground">{model.name}</span>
                            </div>
                            <span className="text-[10px] font-mono text-foreground">{model.metrics[metric]}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}