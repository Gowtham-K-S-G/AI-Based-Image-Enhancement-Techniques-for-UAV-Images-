import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Image, Sparkles, Loader2, Download, RotateCcw, Sun, Eclipse, Focus, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { base44 } from "@/api/base44Client";
import PipelineSettings, { defaultSettings } from "@/components/enhance/PipelineSettings";

const allStages = [
  { key: "illumination", label: "Illumination Enhancement", icon: Sun,     duration: 2500 },
  { key: "shadow",       label: "Shadow Removal",           icon: Eclipse,  duration: 2000 },
  { key: "blur",         label: "Blur Correction",          icon: Focus,    duration: 2500 },
  { key: "refinement",   label: "Unified Refinement",       icon: Sparkles, duration: 2000 },
];

export default function Enhance() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedUrl, setUploadedUrl]     = useState(null);
  const [enhancedUrl, setEnhancedUrl]     = useState(null);
  const [isProcessing, setIsProcessing]   = useState(false);
  const [currentStage, setCurrentStage]   = useState(-1);
  const [progress, setProgress]           = useState(0);
  const [pipelineSettings, setPipelineSettings] = useState(defaultSettings);
  const fileInputRef = useRef(null);

  const activeStages = allStages.filter((s) => pipelineSettings[s.key]?.enabled);

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setUploadedImage(ev.target.result);
    reader.readAsDataURL(file);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    setUploadedUrl(file_url);
    setEnhancedUrl(null);
    setCurrentStage(-1);
    setProgress(0);
  };

  const handleEnhance = async () => {
    if (!uploadedUrl) return;
    setIsProcessing(true);
    setProgress(0);
    setEnhancedUrl(null);

    const stageShare = activeStages.length > 0 ? 100 / activeStages.length : 100;

    for (let i = 0; i < activeStages.length; i++) {
      setCurrentStage(i);
      const stageDuration = activeStages[i].duration *
        (pipelineSettings[activeStages[i].key]?.intensity ?? 100) / 100;
      const steps = 20;
      for (let s = 0; s <= steps; s++) {
        await new Promise((r) => setTimeout(r, stageDuration / steps));
        setProgress(i * stageShare + (s / steps) * stageShare);
      }
    }

    // Build prompt from active stages & intensities
    const stageDescriptions = activeStages.map((s) => {
      const intensity = pipelineSettings[s.key]?.intensity ?? 100;
      const level = intensity >= 80 ? "strongly" : intensity >= 50 ? "moderately" : "lightly";
      const descriptions = {
        illumination: `${level} correct illumination and normalise brightness`,
        shadow:       `${level} remove shadows`,
        blur:         `${level} correct blur and sharpen details`,
        refinement:   `${level} apply unified refinement for a photorealistic finish`,
      };
      return descriptions[s.key];
    });

    const prompt = activeStages.length > 0
      ? `Enhance this UAV aerial image: ${stageDescriptions.join(", ")}. Keep the result photorealistic and professionally processed.`
      : "Return this UAV aerial image with minimal changes.";

    const result = await base44.integrations.Core.GenerateImage({
      prompt,
      existing_image_urls: [uploadedUrl],
    });

    setEnhancedUrl(result.url);
    setProgress(100);
    setCurrentStage(-1);
    setIsProcessing(false);
  };

  const handleReset = () => {
    setUploadedImage(null);
    setUploadedUrl(null);
    setEnhancedUrl(null);
    setIsProcessing(false);
    setCurrentStage(-1);
    setProgress(0);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-inter font-bold text-foreground mb-2">
          Image Enhancement
        </h1>
        <p className="text-sm text-muted-foreground max-w-xl">
          Upload a UAV image and experience the AI-powered restoration pipeline in action.
        </p>
      </div>

      {/* Upload area */}
      {!uploadedImage && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <Card
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-border hover:border-primary/40 bg-card/50 cursor-pointer transition-all duration-300 group"
          >
            <CardContent className="flex flex-col items-center justify-center py-20">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Upload className="w-7 h-7 text-primary" />
              </div>
              <p className="font-inter font-semibold text-foreground mb-1">Upload UAV Image</p>
              <p className="text-xs text-muted-foreground">Click to select · PNG, JPG up to 10MB</p>
            </CardContent>
          </Card>
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileSelect} />

          {/* Settings panel visible before upload too */}
          <PipelineSettings settings={pipelineSettings} onChange={setPipelineSettings} />
        </motion.div>
      )}

      {/* Processing view */}
      {uploadedImage && (
        <div className="space-y-4">
          {/* Custom Settings panel */}
          {!isProcessing && (
            <PipelineSettings settings={pipelineSettings} onChange={setPipelineSettings} />
          )}

          {/* Controls */}
          <div className="flex items-center gap-3">
            <Button
              onClick={handleEnhance}
              disabled={isProcessing || !!enhancedUrl || activeStages.length === 0}
              className="bg-primary hover:bg-primary/90 gap-2"
            >
              {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
              {isProcessing ? "Processing..." : `Enhance Image`}
            </Button>
            {activeStages.length < allStages.length && !isProcessing && (
              <Badge variant="outline" className="text-[10px] font-mono">
                {activeStages.length} of 4 stages active
              </Badge>
            )}
            <Button variant="outline" onClick={handleReset} className="gap-2">
              <RotateCcw className="w-4 h-4" /> Reset
            </Button>
          </div>

          {/* Progress bar */}
          {isProcessing && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Card className="border border-border bg-card">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-mono text-muted-foreground">Processing Pipeline</p>
                    <p className="text-xs font-mono text-primary">{Math.round(progress)}%</p>
                  </div>
                  <Progress value={progress} className="h-1.5 mb-4" />
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {allStages.map((stage, i) => {
                      const activeIdx = activeStages.findIndex((s) => s.key === stage.key);
                      const isActive  = activeIdx === currentStage;
                      const isDone    = activeIdx !== -1 && activeIdx < currentStage;
                      const isSkipped = !pipelineSettings[stage.key]?.enabled;
                      return (
                        <div
                          key={stage.key}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-colors ${
                            isSkipped
                              ? "bg-muted/40 text-muted-foreground/50 line-through"
                              : isActive
                              ? "bg-primary/10 text-primary"
                              : isDone || progress === 100
                              ? "bg-accent/10 text-accent"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          <stage.icon className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{stage.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Image comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border border-border bg-card overflow-hidden">
              <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Image className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs font-semibold text-foreground">Original</span>
                </div>
                <Badge variant="outline" className="text-[10px] font-mono">Input</Badge>
              </div>
              <CardContent className="p-0">
                <img src={uploadedImage} alt="Original UAV" className="w-full h-64 md:h-80 object-cover" />
              </CardContent>
            </Card>

            <Card className="border border-border bg-card overflow-hidden">
              <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-xs font-semibold text-foreground">Enhanced</span>
                </div>
                <Badge className="bg-primary/10 text-primary border border-primary/20 text-[10px] font-mono">Output</Badge>
              </div>
              <CardContent className="p-0">
                {enhancedUrl ? (
                  <img src={enhancedUrl} alt="Enhanced UAV" className="w-full h-64 md:h-80 object-cover" />
                ) : (
                  <div className="w-full h-64 md:h-80 flex items-center justify-center bg-muted/30">
                    {isProcessing ? (
                      <div className="flex flex-col items-center gap-3">
                        <Loader2 className="w-8 h-8 text-primary animate-spin" />
                        <p className="text-xs text-muted-foreground font-mono">Enhancing...</p>
                      </div>
                    ) : (
                      <p className="text-xs text-muted-foreground">Click "Enhance Image" to begin</p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Download */}
          {enhancedUrl && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <a href={enhancedUrl} target="_blank" rel="noopener noreferrer">
                <Button className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Download className="w-4 h-4" /> Download Enhanced Image
                </Button>
              </a>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}