import React, { useState, useRef, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";
import { GripVertical } from "lucide-react";

/**
 * Three-panel split view with two draggable dividers.
 * Left panel   → [0, div1]
 * Middle panel → [div1, div2]
 * Right panel  → [div2, 100]
 */
export default function TripleSplitView({ images, labels }) {
  // div1 and div2 as percentages of container width
  const [div1, setDiv1] = useState(33);
  const [div2, setDiv2] = useState(66);
  const [dragging, setDragging] = useState(null); // null | 1 | 2
  const containerRef = useRef(null);

  const updateDivider = useCallback((clientX, which) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
    if (which === 1) {
      setDiv1(Math.min(pct, div2 - 5));
    } else {
      setDiv2(Math.max(pct, div1 + 5));
    }
  }, [div1, div2]);

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e) => {
      const x = e.clientX ?? e.touches?.[0]?.clientX;
      updateDivider(x, dragging);
    };
    const onUp = () => setDragging(null);
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
  }, [dragging, updateDivider]);

  const [img0, img1, img2] = images;
  const [lbl0, lbl1, lbl2] = labels;

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-video overflow-hidden rounded-xl select-none bg-muted"
    >
      {/* Panel 0 — leftmost, clipped at div1 */}
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${div1}%` }}>
        <img
          src={img0}
          alt={lbl0}
          className="absolute inset-0 h-full object-cover"
          style={{ width: `${100 / (div1 / 100)}%`, maxWidth: "none" }}
          draggable={false}
        />
        <div className="absolute bottom-3 left-3 pointer-events-none">
          <span className="px-2 py-1 rounded-md bg-black/60 text-white text-[10px] font-mono backdrop-blur-sm">{lbl0}</span>
        </div>
      </div>

      {/* Panel 1 — middle, clipped between div1 and div2 */}
      <div className="absolute inset-0 overflow-hidden" style={{ left: `${div1}%`, width: `${div2 - div1}%` }}>
        <img
          src={img1}
          alt={lbl1}
          className="absolute top-0 bottom-0 h-full object-cover"
          style={{ width: `${containerRef.current?.offsetWidth ?? 800}px`, left: `-${div1}%` }}
          draggable={false}
        />
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none">
          <span className="px-2 py-1 rounded-md bg-black/60 text-white text-[10px] font-mono backdrop-blur-sm whitespace-nowrap">{lbl1}</span>
        </div>
      </div>

      {/* Panel 2 — rightmost */}
      <img
        src={img2}
        alt={lbl2}
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
        style={{ zIndex: -1 }}
      />
      <div className="absolute bottom-3 right-3 pointer-events-none z-10">
        <span className="px-2 py-1 rounded-md bg-black/60 text-white text-[10px] font-mono backdrop-blur-sm">{lbl2}</span>
      </div>

      {/* Divider 1 */}
      <div className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-20" style={{ left: `${div1}%` }} />
      <DividerHandle pos={div1} onMouseDown={() => setDragging(1)} />

      {/* Divider 2 */}
      <div className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-20" style={{ left: `${div2}%` }} />
      <DividerHandle pos={div2} onMouseDown={() => setDragging(2)} />

      {/* Pct labels */}
      <div className="absolute top-3 z-20 pointer-events-none -translate-x-1/2" style={{ left: `${div1}%` }}>
        <span className="px-1.5 py-0.5 rounded bg-primary text-primary-foreground text-[9px] font-mono">{Math.round(div1)}%</span>
      </div>
      <div className="absolute top-3 z-20 pointer-events-none -translate-x-1/2" style={{ left: `${div2}%` }}>
        <span className="px-1.5 py-0.5 rounded bg-primary text-primary-foreground text-[9px] font-mono">{Math.round(div2)}%</span>
      </div>
    </div>
  );
}

function DividerHandle({ pos, onMouseDown }) {
  return (
    <div
      onMouseDown={(e) => { e.preventDefault(); onMouseDown(); }}
      onTouchStart={onMouseDown}
      className={cn(
        "absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-30",
        "w-9 h-9 rounded-full bg-white shadow-xl border-2 border-primary/30",
        "flex items-center justify-center cursor-grab active:cursor-grabbing",
        "hover:scale-110 transition-transform"
      )}
      style={{ left: `${pos}%` }}
    >
      <GripVertical className="w-4 h-4 text-primary" />
    </div>
  );
}