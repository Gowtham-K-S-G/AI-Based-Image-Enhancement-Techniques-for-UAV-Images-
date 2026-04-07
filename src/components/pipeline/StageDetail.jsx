import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";

export default function StageDetail({ stage }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={stage.title}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="border border-primary/20 bg-gradient-to-br from-card to-primary/5 h-full">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <stage.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-inter font-bold text-lg text-foreground">{stage.title}</h3>
                <p className="text-xs text-muted-foreground font-mono">{stage.technique}</p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              {stage.detail}
            </p>

            <div className="space-y-2 mb-5">
              <p className="text-xs font-semibold text-foreground uppercase tracking-wider">Key Operations</p>
              {stage.operations.map((op, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                  <span className="text-xs text-muted-foreground">{op}</span>
                </div>
              ))}
            </div>

            <div>
              <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2">Models Used</p>
              <div className="flex flex-wrap gap-2">
                {stage.models.map((model) => (
                  <Badge key={model} className="bg-primary/10 text-primary border border-primary/20 text-xs font-mono">
                    {model}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}