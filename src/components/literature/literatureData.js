export const literaturePapers = [
  {
    id: 1,
    name: "GLFFNet / USFNet",
    technique: "Two-stage shadow detection using LAB color space",
    problem: "Shadow detection & removal",
    advantages: "Good feature extraction",
    limitations: "Poor generalization, not real-time",
    category: "shadow",
  },
  {
    id: 2,
    name: "SSRNet",
    technique: "GAN-based illumination modeling",
    problem: "Shadow removal & illumination correction",
    advantages: "Uses physical models",
    limitations: "Produces artifacts, depends on synthetic data",
    category: "shadow",
  },
  {
    id: 3,
    name: "Shadow Removal Survey",
    technique: "Transformer & diffusion models",
    problem: "Shadow removal",
    advantages: "Covers modern approaches",
    limitations: "No proper benchmarking",
    category: "shadow",
  },
  {
    id: 4,
    name: "Blur2Seq",
    technique: "Camera motion trajectory modeling",
    problem: "Motion blur removal",
    advantages: "Accurate blur modeling",
    limitations: "High computational cost",
    category: "blur",
  },
  {
    id: 5,
    name: "Flow-DCN",
    technique: "Optical flow-guided deblurring",
    problem: "Motion blur removal",
    advantages: "Uses motion information",
    limitations: "Depends on accurate flow estimation",
    category: "blur",
  },
  {
    id: 6,
    name: "DeMoE",
    technique: "Multi-branch expert network",
    problem: "Different types of blur",
    advantages: "Handles multiple blur types",
    limitations: "Router misclassification issue",
    category: "blur",
  },
  {
    id: 7,
    name: "PDE-Based Models",
    technique: "Physics-based equations",
    problem: "Image restoration",
    advantages: "Strong theoretical base",
    limitations: "Complex training",
    category: "unified",
  },
  {
    id: 8,
    name: "JFD³",
    technique: "Infrared image deblurring",
    problem: "UAV infrared images",
    advantages: "Good for IR data",
    limitations: "Not suitable for RGB images",
    category: "blur",
  },
  {
    id: 9,
    name: "LANGO",
    technique: "Language-guided learning",
    problem: "Adaptive image processing",
    advantages: "Context-aware",
    limitations: "High memory usage",
    category: "unified",
  },
  {
    id: 10,
    name: "LL-YOLO + EnlightenGAN",
    technique: "Two-stage enhancement + detection",
    problem: "Low-light UAV images",
    advantages: "Improves detection accuracy",
    limitations: "Pipeline complexity, artifacts",
    category: "illumination",
  },
];

export const literatureCategories = [
  { value: "all", label: "All" },
  { value: "shadow", label: "Shadow" },
  { value: "blur", label: "Blur" },
  { value: "illumination", label: "Illumination" },
  { value: "unified", label: "Unified" },
];

export const literatureCategoryColors = {
  shadow: "bg-chart-3/10 text-chart-3 border-chart-3/20",
  blur: "bg-chart-1/10 text-chart-1 border-chart-1/20",
  illumination: "bg-chart-4/10 text-chart-4 border-chart-4/20",
  unified: "bg-accent/10 text-accent border-accent/20",
};

export const literatureReviewMeta = {
  title: "Literature Review",
  description:
    "Comprehensive survey of 10 key papers spanning shadow removal, deblurring, illumination correction, and unified restoration approaches.",
};
