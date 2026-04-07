import React, { useState, useRef, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";
import { GripVertical } from "lucide-react";

export default function ImageSlider({ leftImage, rightImage, leftLabel, rightLabel }) {
  const [sliderPos, setSliderPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef(null);

  const updateSlider = useCallback((clientX) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
    setSliderPos(pct);
  }, []);

  const onMouseDown = (e) => { e.preventDefault(); setDragging(true); };
  const onTouchStart = () => setDragging(true);

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e) => updateSlider(e.clientX ?? e.touches?.[0]?.clientX);
    const onUp = () => setDragging(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
  }, [dragging, updateSlider]);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-video overflow-hidden rounded-xl select-none cursor-col-resize bg-muted"
      onClick={(e) => updateSlider(e.clientX)}
    >
      {/* Right image (full) */}
      <img
        src={rightImage}
        alt={rightLabel}
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />

      {/* Left image (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPos}%` }}
      >
        <img
          src={leftImage}
          alt={leftLabel}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ width: `${100 / (sliderPos / 100)}%`, maxWidth: "none" }}
          draggable={false}
        />
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-10"
        style={{ left: `${sliderPos}%` }}
      />

      {/* Handle */}
      <div
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        className={cn(
          "absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20",
          "w-9 h-9 rounded-full bg-white shadow-xl border-2 border-primary/30",
          "flex items-center justify-center cursor-grab active:cursor-grabbing",
          "transition-transform hover:scale-110",
          dragging && "scale-110"
        )}
        style={{ left: `${sliderPos}%` }}
      >
        <GripVertical className="w-4 h-4 text-primary" />
      </div>

      {/* Labels */}
      <div className="absolute bottom-3 left-3 z-10 pointer-events-none">
        <span className="px-2 py-1 rounded-md bg-black/60 text-white text-[10px] font-mono backdrop-blur-sm">
          {leftLabel}
        </span>
      </div>
      <div className="absolute bottom-3 right-3 z-10 pointer-events-none">
        <span className="px-2 py-1 rounded-md bg-black/60 text-white text-[10px] font-mono backdrop-blur-sm">
          {rightLabel}
        </span>
      </div>

      {/* Slider pct hint */}
      <div
        className="absolute top-3 z-10 pointer-events-none -translate-x-1/2 transition-all"
        style={{ left: `${sliderPos}%` }}
      >
        <span className="px-2 py-0.5 rounded bg-primary text-primary-foreground text-[10px] font-mono">
          {Math.round(sliderPos)}%
        </span>
      </div>
    </div>
  );
}