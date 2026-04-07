import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, ZoomIn, ArrowLeftRight } from "lucide-react";
import { cn } from "@/lib/utils";

function ImagePairCard({ sample, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      layout
    >
      <Card
        onClick={() => onClick(sample)}
        className="border border-border bg-card overflow-hidden cursor-pointer hover:border-primary/40 transition-all duration-200 group"
      >
        <div className="grid grid-cols-2 gap-0.5 bg-border">
          {/* Raw */}
          <div className="relative">
            <img
              src={sample.raw}
              alt="Raw"
              className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <span className="absolute top-1.5 left-1.5 bg-destructive/80 text-white text-[9px] font-mono px-1.5 py-0.5 rounded">
              RAW
            </span>
          </div>
          {/* Ground Truth */}
          <div className="relative">
            <img
              src={sample.gt}
              alt="Ground Truth"
              className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <span className="absolute top-1.5 left-1.5 bg-accent/80 text-accent-foreground text-[9px] font-mono px-1.5 py-0.5 rounded">
              GT
            </span>
          </div>
        </div>
        <CardContent className="p-3">
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="text-xs font-inter font-semibold text-foreground truncate">{sample.scene}</p>
              <p className="text-[10px] text-muted-foreground font-mono">{sample.altitude}</p>
            </div>
            <Badge variant="outline" className="text-[10px] font-mono shrink-0">
              {sample.degradation}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function LightboxModal({ sample, onClose }) {
  const [view, setView] = useState("split");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.93, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.93, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-card border border-border rounded-2xl overflow-hidden max-w-3xl w-full"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div>
            <p className="font-inter font-semibold text-foreground">{sample.scene}</p>
            <p className="text-xs text-muted-foreground font-mono">
              {sample.degradation} · {sample.altitude}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {["split", "raw", "gt"].map((v) => (
              <Button
                key={v}
                size="sm"
                variant={view === v ? "default" : "outline"}
                onClick={() => setView(v)}
                className="text-xs uppercase font-mono"
              >
                {v === "split" ? <ArrowLeftRight className="w-3 h-3" /> : v}
              </Button>
            ))}
            <Button size="icon" variant="ghost" onClick={onClose} className="w-8 h-8">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Images */}
        <div className="p-4">
          {view === "split" && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="w-2 h-2 rounded-full bg-destructive" />
                  <span className="text-xs font-mono text-muted-foreground">Raw / Degraded</span>
                </div>
                <img src={sample.raw} alt="Raw" className="w-full rounded-lg object-cover" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  <span className="text-xs font-mono text-muted-foreground">Ground Truth</span>
                </div>
                <img src={sample.gt} alt="Ground Truth" className="w-full rounded-lg object-cover" />
              </div>
            </div>
          )}
          {view === "raw" && (
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <span className="w-2 h-2 rounded-full bg-destructive" />
                <span className="text-xs font-mono text-muted-foreground">Raw / Degraded Input</span>
              </div>
              <img src={sample.raw} alt="Raw" className="w-full rounded-lg object-cover max-h-96" />
            </div>
          )}
          {view === "gt" && (
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <span className="w-2 h-2 rounded-full bg-accent" />
                <span className="text-xs font-mono text-muted-foreground">Ground Truth</span>
              </div>
              <img src={sample.gt} alt="Ground Truth" className="w-full rounded-lg object-cover max-h-96" />
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function DatasetGallery({ dataset, filteredSamples, filterDeg, setFilterDeg }) {
  const [lightboxSample, setLightboxSample] = useState(null);
  const allDegradations = ["All", ...dataset.degradations];

  return (
    <div>
      {/* Filter pills */}
      <div className="flex items-center gap-2 flex-wrap mb-5">
        <span className="text-xs text-muted-foreground font-mono mr-1">Filter:</span>
        {allDegradations.map((d) => (
          <button
            key={d}
            onClick={() => setFilterDeg(d)}
            className={cn(
              "px-3 py-1 rounded-full text-xs font-mono border transition-colors",
              filterDeg === d
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
            )}
          >
            {d}
          </button>
        ))}
        <span className="ml-auto text-xs font-mono text-muted-foreground">
          {filteredSamples.length} pairs
        </span>
      </div>

      {/* Gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <AnimatePresence>
          {filteredSamples.map((sample) => (
            <ImagePairCard
              key={`${dataset.name}-${sample.id}`}
              sample={sample}
              onClick={setLightboxSample}
            />
          ))}
        </AnimatePresence>
      </div>

      {filteredSamples.length === 0 && (
        <div className="text-center py-16 text-muted-foreground text-sm">
          No samples match the selected degradation filter.
        </div>
      )}

      {/* Click hint */}
      <p className="text-center text-xs text-muted-foreground mt-4 flex items-center justify-center gap-1">
        <ZoomIn className="w-3 h-3" /> Click any pair to open full view
      </p>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxSample && (
          <LightboxModal sample={lightboxSample} onClose={() => setLightboxSample(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}