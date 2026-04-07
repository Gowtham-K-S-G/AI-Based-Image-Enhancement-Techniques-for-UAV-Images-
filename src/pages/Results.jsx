import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, LineChart, Line, Legend } from "recharts";

const psnrData = [
  { model: "GLFFNet", blur: 24.5, shadow: 28.1, light: 22.3 },
  { model: "SSRNet", blur: 23.8, shadow: 30.2, light: 25.1 },
  { model: "NAFNet", blur: 33.7, shadow: 26.4, light: 24.8 },
  { model: "Restormer", blur: 34.1, shadow: 27.2, light: 26.3 },
  { model: "PromptIR", blur: 33.2, shadow: 31.5, light: 30.8 },
  { model: "Proposed", blur: 34.8, shadow: 32.9, light: 31.5 },
];

const radarData = [
  { metric: "PSNR", proposed: 95, nafnet: 82, promptir: 88, ssrnet: 65 },
  { metric: "SSIM", proposed: 93, nafnet: 85, promptir: 87, ssrnet: 70 },
  { metric: "Speed", proposed: 88, nafnet: 90, promptir: 75, ssrnet: 72 },
  { metric: "Multi-task", proposed: 96, nafnet: 45, promptir: 85, ssrnet: 50 },
  { metric: "Real-time", proposed: 85, nafnet: 88, promptir: 70, ssrnet: 68 },
  { metric: "Robustness", proposed: 92, nafnet: 78, promptir: 82, ssrnet: 60 },
];

const efficiencyData = [
  { model: "Separate Pipeline", params: 145, flops: 320, psnr: 29.2 },
  { model: "GLFFNet + NAFNet", params: 98, flops: 210, psnr: 30.5 },
  { model: "PromptIR", params: 35, flops: 85, psnr: 31.8 },
  { model: "Proposed Unified", params: 42, flops: 95, psnr: 33.1 },
];

export default function Results() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-inter font-bold text-foreground mb-2">
          Results & Evaluation
        </h1>
        <p className="text-sm text-muted-foreground max-w-xl">
          Comparative analysis of the proposed unified framework against existing methods 
          across multiple quality metrics.
        </p>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "PSNR (dB)", value: "34.8", delta: "+1.6", color: "text-primary" },
          { label: "SSIM", value: "0.962", delta: "+0.031", color: "text-accent" },
          { label: "Parameters", value: "42M", delta: "-71%", color: "text-chart-3" },
          { label: "Inference", value: "28ms", delta: "Real-time", color: "text-chart-4" },
        ].map((metric, i) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Card className="bg-card border border-border">
              <CardContent className="p-4">
                <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-1">{metric.label}</p>
                <p className={`text-2xl font-bold font-mono ${metric.color}`}>{metric.value}</p>
                <Badge variant="outline" className="text-[10px] font-mono mt-1">{metric.delta}</Badge>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* PSNR Comparison */}
        <Card className="border border-border bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-inter">PSNR by Degradation Type (dB)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={psnrData} barGap={2}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="model" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} domain={[20, 36]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="blur" name="Blur" fill="hsl(var(--chart-1))" radius={[3, 3, 0, 0]} />
                <Bar dataKey="shadow" name="Shadow" fill="hsl(var(--chart-3))" radius={[3, 3, 0, 0]} />
                <Bar dataKey="light" name="Illumination" fill="hsl(var(--chart-4))" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Radar Chart */}
        <Card className="border border-border bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-inter">Multi-Metric Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="metric" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                <Radar name="Proposed" dataKey="proposed" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.2} />
                <Radar name="NAFNet" dataKey="nafnet" stroke="hsl(var(--chart-4))" fill="hsl(var(--chart-4))" fillOpacity={0.1} />
                <Radar name="PromptIR" dataKey="promptir" stroke="hsl(var(--chart-3))" fill="hsl(var(--chart-3))" fillOpacity={0.1} />
                <Legend wrapperStyle={{ fontSize: "10px" }} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Efficiency Chart */}
        <Card className="border border-border bg-card lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-inter">Model Efficiency: Parameters vs Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-3 font-mono text-muted-foreground">Model</th>
                    <th className="text-right py-2 px-3 font-mono text-muted-foreground">Params (M)</th>
                    <th className="text-right py-2 px-3 font-mono text-muted-foreground">GFLOPs</th>
                    <th className="text-right py-2 px-3 font-mono text-muted-foreground">PSNR (dB)</th>
                    <th className="text-right py-2 px-3 font-mono text-muted-foreground">Efficiency</th>
                  </tr>
                </thead>
                <tbody>
                  {efficiencyData.map((row, i) => (
                    <tr key={row.model} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-2.5 px-3 font-medium text-foreground">{row.model}</td>
                      <td className="py-2.5 px-3 text-right font-mono text-muted-foreground">{row.params}</td>
                      <td className="py-2.5 px-3 text-right font-mono text-muted-foreground">{row.flops}</td>
                      <td className="py-2.5 px-3 text-right font-mono text-primary font-semibold">{row.psnr}</td>
                      <td className="py-2.5 px-3 text-right">
                        <Badge
                          className={`text-[10px] font-mono ${
                            i === efficiencyData.length - 1
                              ? "bg-accent/10 text-accent border-accent/20"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {(row.psnr / row.params * 10).toFixed(1)} PSNR/M
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}