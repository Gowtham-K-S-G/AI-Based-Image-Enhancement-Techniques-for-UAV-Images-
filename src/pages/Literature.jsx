import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const papers = [
  { id: 1, name: "GLFFNet / USFNet", technique: "Two-stage shadow detection using LAB color space", problem: "Shadow detection & removal", advantages: "Good feature extraction", limitations: "Poor generalization, not real-time", category: "shadow" },
  { id: 2, name: "SSRNet", technique: "GAN-based illumination modeling", problem: "Shadow removal & illumination correction", advantages: "Uses physical models", limitations: "Produces artifacts, depends on synthetic data", category: "shadow" },
  { id: 3, name: "Shadow Removal Survey", technique: "Transformer & diffusion models", problem: "Shadow removal", advantages: "Covers modern approaches", limitations: "No proper benchmarking", category: "shadow" },
  { id: 4, name: "Blur2Seq", technique: "Camera motion trajectory modeling", problem: "Motion blur removal", advantages: "Accurate blur modeling", limitations: "High computational cost", category: "blur" },
  { id: 5, name: "Flow-DCN", technique: "Optical flow-guided deblurring", problem: "Motion blur removal", advantages: "Uses motion information", limitations: "Depends on accurate flow estimation", category: "blur" },
  { id: 6, name: "DeMoE", technique: "Multi-branch expert network", problem: "Different types of blur", advantages: "Handles multiple blur types", limitations: "Router misclassification issue", category: "blur" },
  { id: 7, name: "PDE-Based Models", technique: "Physics-based equations", problem: "Image restoration", advantages: "Strong theoretical base", limitations: "Complex training", category: "unified" },
  { id: 8, name: "JFD³", technique: "Infrared image deblurring", problem: "UAV infrared images", advantages: "Good for IR data", limitations: "Not suitable for RGB images", category: "blur" },
  { id: 9, name: "LANGO", technique: "Language-guided learning", problem: "Adaptive image processing", advantages: "Context-aware", limitations: "High memory usage", category: "unified" },
  { id: 10, name: "LL-YOLO + EnlightenGAN", technique: "Two-stage enhancement + detection", problem: "Low-light UAV images", advantages: "Improves detection accuracy", limitations: "Pipeline complexity, artifacts", category: "illumination" },
];

const categories = [
  { value: "all", label: "All" },
  { value: "shadow", label: "Shadow" },
  { value: "blur", label: "Blur" },
  { value: "illumination", label: "Illumination" },
  { value: "unified", label: "Unified" },
];

const categoryColors = {
  shadow: "bg-chart-3/10 text-chart-3 border-chart-3/20",
  blur: "bg-chart-1/10 text-chart-1 border-chart-1/20",
  illumination: "bg-chart-4/10 text-chart-4 border-chart-4/20",
  unified: "bg-accent/10 text-accent border-accent/20",
};

export default function Literature() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedId, setExpandedId] = useState(null);

  const filtered = papers.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.technique.toLowerCase().includes(search.toLowerCase());
    const matchCat = selectedCategory === "all" || p.category === selectedCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-inter font-bold text-foreground mb-2">
          Literature Review
        </h1>
        <p className="text-sm text-muted-foreground max-w-xl">
          Comprehensive survey of 10 key papers spanning shadow removal, deblurring, 
          illumination correction, and unified restoration approaches.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search papers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <Button
              key={cat.value}
              size="sm"
              variant={selectedCategory === cat.value ? "default" : "outline"}
              onClick={() => setSelectedCategory(cat.value)}
              className="text-xs"
            >
              {cat.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Papers grid */}
      <div className="space-y-3">
        {filtered.map((paper, i) => (
          <motion.div
            key={paper.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
          >
            <Card className="border border-border bg-card hover:border-primary/20 transition-colors">
              <CardContent className="p-0">
                <button
                  onClick={() => setExpandedId(expandedId === paper.id ? null : paper.id)}
                  className="w-full text-left p-4 flex items-start justify-between gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1.5">
                      <span className="font-mono text-xs text-muted-foreground">#{paper.id}</span>
                      <h3 className="font-inter font-semibold text-sm text-foreground">{paper.name}</h3>
                      <Badge className={`text-[10px] border ${categoryColors[paper.category]}`}>
                        {paper.category}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{paper.technique}</p>
                  </div>
                  {expandedId === paper.id ? (
                    <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0 mt-1" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0 mt-1" />
                  )}
                </button>

                {expandedId === paper.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    className="px-4 pb-4 border-t border-border"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                      <div>
                        <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-1">Problem Addressed</p>
                        <p className="text-xs text-foreground">{paper.problem}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-mono uppercase tracking-wider text-accent mb-1">Advantages</p>
                        <p className="text-xs text-foreground">{paper.advantages}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-mono uppercase tracking-wider text-destructive mb-1">Limitations</p>
                        <p className="text-xs text-foreground">{paper.limitations}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted-foreground text-sm">
          No papers match your search criteria.
        </div>
      )}
    </div>
  );
}