import React, { useState } from "react";
import { Sun, Eclipse, Focus, Sparkles } from "lucide-react";
import PipelineStage from "../components/pipeline/PipelineStage";
import StageDetail from "../components/pipeline/StageDetail";

const stages = [
  {
    icon: Sun,
    title: "Illumination Enhancement",
    technique: "Zero-DCE / EnlightenGAN",
    description: "Normalize brightness and improve visibility across the UAV image.",
    detail: "The first stage applies curve estimation networks (Zero-DCE) or GAN-based models to adaptively enhance low-light regions and normalize exposure. This handles uneven lighting caused by cloud cover, time-of-day variations, and altitude changes common in UAV operations.",
    models: ["Zero-DCE", "EnlightenGAN"],
    operations: [
      "Adaptive brightness normalization",
      "Curve estimation for light enhancement",
      "Exposure correction across regions",
      "Detail preservation in dark areas",
    ],
  },
  {
    icon: Eclipse,
    title: "Shadow Detection & Removal",
    technique: "Retinex-Based Decomposition",
    description: "Separate illumination and reflectance components to remove shadows while preserving texture.",
    detail: "Using Retinex theory, the image is decomposed into illumination and reflectance maps. Shadows are identified through illumination analysis, then removed by adjusting the illumination component while keeping the reflectance (texture) intact, ensuring no detail loss in shadow regions.",
    models: ["Retinex Model", "LAB Decomposition"],
    operations: [
      "Retinex-based image decomposition",
      "Shadow mask generation",
      "Illumination map correction",
      "Texture detail preservation",
    ],
  },
  {
    icon: Focus,
    title: "Blur Removal",
    technique: "NAFNet / Restormer",
    description: "Restore sharp edges and reduce motion and vibration blur from drone movement.",
    detail: "Advanced neural architectures process the image to reverse blur degradation caused by drone vibration, rapid movement, and wind turbulence. NAFNet uses simplified non-linear activation free blocks, while Restormer leverages multi-head transposed attention for efficient high-resolution deblurring.",
    models: ["NAFNet", "Restormer"],
    operations: [
      "Motion blur kernel estimation",
      "Edge restoration and sharpening",
      "Vibration artifact removal",
      "High-frequency detail recovery",
    ],
  },
  {
    icon: Sparkles,
    title: "Unified Transformer Processing",
    technique: "PromptIR / AirNet",
    description: "Automatically identify degradation types and perform joint multi-task restoration.",
    detail: "The final stage uses prompt-based transformers that learn degradation-specific representations. PromptIR and AirNet automatically detect what types of degradation remain and apply targeted restoration — acting as an intelligent quality assurance step that refines the combined output into a clean final image.",
    models: ["PromptIR", "AirNet"],
    operations: [
      "Automatic degradation detection",
      "Prompt-based adaptive restoration",
      "Multi-task joint optimization",
      "Final quality refinement",
    ],
  },
];

export default function Pipeline() {
  const [activeStage, setActiveStage] = useState(0);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-inter font-bold text-foreground mb-2">
          Restoration Pipeline
        </h1>
        <p className="text-sm text-muted-foreground max-w-xl">
          Four-stage sequential processing pipeline for unified UAV image restoration. 
          Click each stage to explore its details.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Stages list */}
        <div className="space-y-5">
          {stages.map((stage, i) => (
            <PipelineStage
              key={stage.title}
              stage={stage}
              index={i}
              total={stages.length}
              isActive={activeStage === i}
              onClick={() => setActiveStage(i)}
            />
          ))}
        </div>

        {/* Detail panel */}
        <div className="lg:sticky lg:top-8 h-fit">
          <StageDetail stage={stages[activeStage]} />
        </div>
      </div>
    </div>
  );
}