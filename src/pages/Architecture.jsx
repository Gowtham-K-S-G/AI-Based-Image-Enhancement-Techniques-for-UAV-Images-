import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Camera, Sun, Eclipse, Focus, Sparkles, ArrowDown, 
  CheckCircle2, Cpu, Database, Layers 
} from "lucide-react";

const architectureLayers = [
  {
    icon: Camera,
    label: "Input Layer",
    description: "UAV image with mixed degradations",
    color: "border-chart-5",
    bg: "bg-chart-5/10",
    textColor: "text-chart-5",
    details: ["Raw UAV imagery", "Resolution: Variable", "Degradations: Blur + Shadow + Light"],
  },
  {
    icon: Sun,
    label: "Illumination Module",
    description: "Zero-DCE / EnlightenGAN",
    color: "border-chart-4",
    bg: "bg-chart-4/10",
    textColor: "text-chart-4",
    details: ["Curve estimation network", "8 iterations of light enhancement", "Preserves color fidelity"],
  },
  {
    icon: Eclipse,
    label: "Shadow Module",
    description: "Retinex Decomposition",
    color: "border-chart-3",
    bg: "bg-chart-3/10",
    textColor: "text-chart-3",
    details: ["Reflectance-illumination separation", "Shadow mask generation", "Guided texture recovery"],
  },
  {
    icon: Focus,
    label: "Deblurring Module",
    description: "NAFNet / Restormer",
    color: "border-chart-1",
    bg: "bg-chart-1/10",
    textColor: "text-chart-1",
    details: ["Non-linear activation free blocks", "Multi-head transposed attention", "Progressive multi-scale fusion"],
  },
  {
    icon: Sparkles,
    label: "Unified Refinement",
    description: "PromptIR / AirNet",
    color: "border-primary",
    bg: "bg-primary/10",
    textColor: "text-primary",
    details: ["Degradation-aware prompts", "Cross-attention fusion", "Joint multi-task optimization"],
  },
  {
    icon: CheckCircle2,
    label: "Output Layer",
    description: "Clean enhanced UAV image",
    color: "border-accent",
    bg: "bg-accent/10",
    textColor: "text-accent",
    details: ["High-quality restored image", "Suitable for object detection", "Real-time inference capable"],
  },
];

const references = [
  { id: 1, authors: "L. Guo et al.", title: "Single-Image Shadow Removal Using Deep Learning: A Comprehensive Survey", year: 2024 },
  { id: 2, authors: "Z. Li et al.", title: "A Two-Stage Shadow Removal Method with Multi-Channel Multi-Scale Feature Fusion", year: 2025 },
  { id: 3, authors: "C. Shao et al.", title: "From Synthesis to Removal: Deep Learning Framework for Shadow Removal in Remote Sensing", year: 2024 },
  { id: 4, authors: "J. Ma et al.", title: "Efficient Detection Model of UAVs under Low-Light Conditions Based on LL-YOLO", year: 2025 },
  { id: 5, authors: "D. Feijoo et al.", title: "Towards Unified Image Deblurring Using a Mixture-of-Experts Decoder", year: 2025 },
  { id: 6, authors: "S. Park et al.", title: "Language-Guided Learning for Object Detection in Aerial Images", year: 2025 },
  { id: 7, authors: "X. Wang et al.", title: "Blur-Robust Detection via Feature Restoration for IR UAV Target Detection", year: 2025 },
  { id: 8, authors: "S. Likhite et al.", title: "Physics-Informed Image Restoration via Progressive PDE Integration", year: 2025 },
  { id: 9, authors: "G. Carbajal et al.", title: "Blur2Seq: Blind Deblurring and Camera Trajectory Estimation", year: 2025 },
  { id: 10, authors: "L. O'Connor & C. Dubois", title: "High-Speed UAV Image Deblurring via Optical Flow Estimation", year: 2026 },
];

export default function Architecture() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-inter font-bold text-foreground mb-2">
          System Architecture
        </h1>
        <p className="text-sm text-muted-foreground max-w-xl">
          Visual overview of the unified restoration model architecture and references.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Architecture diagram */}
        <div className="lg:col-span-2 space-y-0">
          {architectureLayers.map((layer, i) => (
            <div key={layer.label}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className={`border ${layer.color} bg-card relative`}>
                  <CardContent className="p-4 flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-xl ${layer.bg} flex items-center justify-center shrink-0`}>
                      <layer.icon className={`w-5 h-5 ${layer.textColor}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-inter font-semibold text-sm text-foreground">{layer.label}</h3>
                        <Badge variant="outline" className="text-[10px] font-mono">{layer.description}</Badge>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {layer.details.map((detail, j) => (
                          <span key={j} className="text-[10px] px-2 py-0.5 rounded-md bg-muted text-muted-foreground font-mono">
                            {detail}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {i < architectureLayers.length - 1 && (
                <div className="flex justify-center py-1">
                  <ArrowDown className="w-4 h-4 text-border" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* References */}
        <div>
          <Card className="border border-border bg-card sticky top-8">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-inter flex items-center gap-2">
                <Database className="w-4 h-4 text-primary" />
                References
              </CardTitle>
            </CardHeader>
            <CardContent className="max-h-[600px] overflow-y-auto space-y-3">
              {references.map((ref) => (
                <div key={ref.id} className="pb-3 border-b border-border/50 last:border-0">
                  <div className="flex items-start gap-2">
                    <span className="text-[10px] font-mono text-primary shrink-0 mt-0.5">[{ref.id}]</span>
                    <div>
                      <p className="text-xs text-foreground leading-relaxed">{ref.title}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">
                        {ref.authors} · {ref.year}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}