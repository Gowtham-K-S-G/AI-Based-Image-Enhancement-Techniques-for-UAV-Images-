import React from "react";
import { motion } from "framer-motion";
import { Plane, ArrowRight, Zap, Eye, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-sidebar via-sidebar/95 to-sidebar/90 p-8 md:p-12">
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(hsl(var(--primary)/0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)/0.3) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Glowing orb */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-accent/15 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono mb-6">
            <Zap className="w-3 h-3" />
            AI-Powered UAV Image Enhancement
          </div>

          <h1 className="text-3xl md:text-5xl font-inter font-bold text-white leading-tight mb-4">
            AI Based Image
            <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Enhancement Techniques
            </span>
            <br />
            for UAV Images
          </h1>

          <p className="text-white/50 text-sm md:text-base max-w-xl mb-8 leading-relaxed">
            A unified deep learning framework that simultaneously handles motion blur, 
            shadow removal, and illumination correction in UAV-acquired imagery — 
            delivering real-time restoration for operational efficiency.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link to="/enhance">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium gap-2">
                Try Enhancement <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/pipeline">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 font-medium gap-2">
                View Pipeline <Cpu className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-8 mt-10 pt-8 border-t border-white/10"
        >
          {[
            { label: "Degradation Types", value: "3", sub: "Blur · Shadow · Light" },
            { label: "Pipeline Stages", value: "4", sub: "Sequential Processing" },
            { label: "Architecture", value: "Transformer", sub: "PromptIR / AirNet" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-2xl font-bold text-white font-mono">{stat.value}</p>
              <p className="text-xs text-white/40 mt-0.5">{stat.label}</p>
              <p className="text-[10px] text-primary/60 font-mono">{stat.sub}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
