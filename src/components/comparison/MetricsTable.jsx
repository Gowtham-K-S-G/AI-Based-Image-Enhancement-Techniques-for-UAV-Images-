import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus, TableProperties, Radar, BarChart2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  RadarChart, Radar as ReRadar, PolarGrid, PolarAngleAxis,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from "recharts";

// ── Colours ──────────────────────────────────────────────────────────────────
const COLORS = ["hsl(199,89%,48%)", "hsl(172,66%,50%)", "hsl(262,83%,58%)"];

// ── Helpers ───────────────────────────────────────────────────────────────────
function DeltaBadge({ left, right, higherBetter = true }) {
  const delta = right - left;
  const better = higherBetter ? delta > 0 : delta < 0;
  const equal = Math.abs(delta) < 0.01;
  if (equal) return <Minus className="w-3.5 h-3.5 text-muted-foreground" />;
  return (
    <span className={`flex items-center gap-0.5 text-[10px] font-mono ${better ? "text-accent" : "text-destructive"}`}>
      {better ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
      {delta > 0 ? "+" : ""}{delta.toFixed(2)}
    </span>
  );
}

// Normalise a value 0-100 for radar display
function norm(val, min, max) {
  if (isNaN(val)) return 0;
  return Math.round(((val - min) / (max - min)) * 100);
}

// Radar data: each axis is a quality/speed dimension, higher = better always
function buildRadarData(models) {
  // Pre-defined normalisation ranges per metric dimension
  const dims = [
    { label: "PSNR",    key: "psnr",   min: 18, max: 36, higherBetter: true },
    { label: "SSIM",    key: "ssim",   min: 0.6, max: 1.0, higherBetter: true },
    { label: "Sharpness\n(LPIPS↑)", key: "lpips", min: 0, max: 0.5, higherBetter: false },
    { label: "Speed\n(FPS)",  key: "fps",   min: 0, max: 130, higherBetter: true },
    { label: "Efficiency\n(GFLOPs↓)", key: "flops", min: 0, max: 170, higherBetter: false },
    { label: "Compact\n(Params↓)", key: "params", min: 0, max: 45, higherBetter: false },
  ];

  return dims.map(({ label, key, min, max, higherBetter }) => {
    const entry = { metric: label };
    models.forEach((m) => {
      const raw = parseFloat(m.metrics[key]);
      const normalised = higherBetter
        ? norm(raw, min, max)
        : norm(max - (raw - min), min, max); // invert so higher is always better
      entry[m.name] = isNaN(normalised) ? 0 : normalised;
    });
    return entry;
  });
}

// Bar data: quality vs speed axes
const BAR_GROUPS = [
  { label: "Quality", metrics: [
    { key: "psnr",  display: "PSNR" },
    { key: "ssim",  display: "SSIM ×40" },
  ]},
  { label: "Speed vs Size", metrics: [
    { key: "fps",    display: "FPS" },
    { key: "flops",  display: "GFLOPs" },
    { key: "params", display: "Params (M)" },
  ]},
];

function buildBarData(group, models) {
  return group.metrics.map(({ key, display }) => {
    const entry = { name: display };
    models.forEach((m) => {
      let v = parseFloat(m.metrics[key]);
      if (key === "ssim") v = v * 40; // scale so it's visible next to PSNR
      entry[m.name] = isNaN(v) ? 0 : v;
    });
    return entry;
  });
}

// ── Sub-components ────────────────────────────────────────────────────────────
function TabButton({ active, onClick, icon: Icon, label }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-inter font-medium transition-all",
        active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"
      )}
    >
      <Icon className="w-3 h-3" />
      {label}
    </button>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function MetricsTable({ leftModel, rightModel, midModel }) {
  const [tab, setTab] = useState("table");
  const [barGroup, setBarGroup] = useState(0);

  if (!leftModel || !rightModel) return null;

  const models = midModel
    ? [leftModel, midModel, rightModel]
    : [leftModel, rightModel];

  const radarData = buildRadarData(models);
  const barData   = buildBarData(BAR_GROUPS[barGroup], models);

  const allMetrics = [
    { key: "psnr",   label: "PSNR (dB)",   higherBetter: true },
    { key: "ssim",   label: "SSIM",         higherBetter: true },
    { key: "lpips",  label: "LPIPS ↓",      higherBetter: false },
    { key: "params", label: "Params (M)",   higherBetter: false },
    { key: "fps",    label: "FPS",          higherBetter: true },
    { key: "flops",  label: "GFLOPs",       higherBetter: false },
  ];

  return (
    <Card className="border border-border bg-card">
      {/* Header */}
      <CardHeader className="pb-0 pt-3 px-4">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Metric Comparison</p>
          <div className="flex items-center gap-1">
            <TabButton active={tab === "table"} onClick={() => setTab("table")} icon={TableProperties} label="Table" />
            <TabButton active={tab === "radar"} onClick={() => setTab("radar")} icon={Radar}           label="Radar" />
            <TabButton active={tab === "bar"}   onClick={() => setTab("bar")}   icon={BarChart2}       label="Bar" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-4 pb-4 pt-3">

        {/* ── TABLE ── */}
        {tab === "table" && (
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border text-[10px] font-mono text-muted-foreground">
                <th className="text-left pb-2">Metric</th>
                {models.map((m, i) => (
                  <th key={m.id} className="text-right pb-2" style={{ color: COLORS[i] }}>{m.name}</th>
                ))}
                {models.length === 2 && <th className="text-right pb-2">Δ</th>}
              </tr>
            </thead>
            <tbody>
              {allMetrics.map((m) => (
                <tr key={m.key} className="border-b border-border/40 last:border-0">
                  <td className="py-2 text-muted-foreground">{m.label}</td>
                  {models.map((model, i) => (
                    <td key={model.id} className="py-2 text-right font-mono font-medium" style={{ color: COLORS[i] }}>
                      {model.metrics[m.key]}
                    </td>
                  ))}
                  {models.length === 2 && (
                    <td className="py-2 text-right">
                      <DeltaBadge
                        left={parseFloat(leftModel.metrics[m.key])}
                        right={parseFloat(rightModel.metrics[m.key])}
                        higherBetter={m.higherBetter}
                      />
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* ── RADAR ── */}
        {tab === "radar" && (
          <div>
            <p className="text-[10px] text-muted-foreground font-mono mb-3">
              All axes normalised 0–100. Higher = better on every dimension.
            </p>
            <ResponsiveContainer width="100%" height={230}>
              <RadarChart data={radarData} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis
                  dataKey="metric"
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 9, fontFamily: "monospace" }}
                />
                {models.map((m, i) => (
                  <ReRadar
                    key={m.id}
                    name={m.name}
                    dataKey={m.name}
                    stroke={COLORS[i]}
                    fill={COLORS[i]}
                    fillOpacity={0.12}
                    strokeWidth={2}
                    dot={{ r: 2, fill: COLORS[i] }}
                  />
                ))}
                <Legend
                  wrapperStyle={{ fontSize: 10, fontFamily: "monospace", paddingTop: 8 }}
                  formatter={(v, entry) => <span style={{ color: entry.color }}>{v}</span>}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* ── BAR ── */}
        {tab === "bar" && (
          <div>
            {/* Group toggle */}
            <div className="flex items-center gap-1 mb-3">
              {BAR_GROUPS.map((g, i) => (
                <button
                  key={g.label}
                  onClick={() => setBarGroup(i)}
                  className={cn(
                    "px-2.5 py-1 rounded-lg border text-[10px] font-mono transition-all",
                    barGroup === i
                      ? "bg-primary/10 border-primary text-primary"
                      : "border-border text-muted-foreground hover:text-foreground"
                  )}
                >
                  {g.label}
                </button>
              ))}
            </div>

            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={barData} margin={{ top: 5, right: 10, bottom: 5, left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 9, fontFamily: "monospace" }}
                  axisLine={false} tickLine={false}
                />
                <YAxis
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 9, fontFamily: "monospace" }}
                  axisLine={false} tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 8,
                    fontSize: 10,
                    fontFamily: "monospace",
                  }}
                  cursor={{ fill: "hsl(var(--muted))", opacity: 0.4 }}
                />
                <Legend
                  wrapperStyle={{ fontSize: 10, fontFamily: "monospace" }}
                  formatter={(v, entry) => <span style={{ color: entry.color }}>{v}</span>}
                />
                {models.map((m, i) => (
                  <Bar key={m.id} dataKey={m.name} fill={COLORS[i]} radius={[3, 3, 0, 0]} maxBarSize={32} />
                ))}
              </BarChart>
            </ResponsiveContainer>

            {barGroup === 0 && (
              <p className="text-[9px] text-muted-foreground font-mono mt-1">* SSIM multiplied ×40 for scale alignment</p>
            )}
          </div>
        )}

      </CardContent>
    </Card>
  );
}