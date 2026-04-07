import React, { useState } from "react";
import DatasetSelector from "../components/datasets/DatasetSelector";
import DatasetGallery from "../components/datasets/DatasetGallery";
import DatasetStats from "../components/datasets/DatasetStats";

const datasets = {
  "UAVIR-5D": {
    name: "UAVIR-5D",
    description:
      "A large-scale UAV image restoration dataset covering 5 degradation types: motion blur, shadow, illumination variation, haze, and noise. Captured across diverse aerial environments at varying altitudes and lighting conditions.",
    stats: {
      totalImages: 5000,
      imagePairs: 2500,
      resolution: "1920×1080",
      scenes: 50,
      splits: { train: 2000, val: 300, test: 200 },
    },
    degradations: ["Motion Blur", "Shadow", "Illumination", "Haze", "Noise"],
    color: "primary",
    samples: [
      {
        id: 1,
        scene: "Urban Area",
        degradation: "Motion Blur",
        altitude: "80m",
        raw: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&q=60&blur=3",
        gt: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&q=80",
      },
      {
        id: 2,
        scene: "Agricultural Field",
        degradation: "Shadow",
        altitude: "120m",
        raw: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&q=50",
        gt: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&q=85",
      },
      {
        id: 3,
        scene: "Forest Canopy",
        degradation: "Illumination",
        altitude: "60m",
        raw: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&q=45",
        gt: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&q=85",
      },
      {
        id: 4,
        scene: "Coastal Region",
        degradation: "Haze",
        altitude: "200m",
        raw: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=400&q=40",
        gt: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=400&q=85",
      },
      {
        id: 5,
        scene: "Road Network",
        degradation: "Motion Blur",
        altitude: "100m",
        raw: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&q=50",
        gt: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&q=85",
      },
      {
        id: 6,
        scene: "Residential Zone",
        degradation: "Shadow",
        altitude: "90m",
        raw: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=45",
        gt: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=85",
      },
      {
        id: 7,
        scene: "Industrial Site",
        degradation: "Noise",
        altitude: "150m",
        raw: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&q=40",
        gt: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&q=85",
      },
      {
        id: 8,
        scene: "Mountain Terrain",
        degradation: "Illumination",
        altitude: "300m",
        raw: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=45",
        gt: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=85",
      },
    ],
  },
  ISTD: {
    name: "ISTD",
    description:
      "The Image Shadow Triplet Dataset (ISTD) contains triplets of shadow images, shadow masks, and shadow-free ground truth images. A benchmark dataset widely used for evaluating shadow detection and removal algorithms.",
    stats: {
      totalImages: 1870,
      imagePairs: 1330,
      resolution: "640×480",
      scenes: 135,
      splits: { train: 1330, val: 270, test: 540 },
    },
    degradations: ["Hard Shadow", "Soft Shadow", "Self Shadow", "Cast Shadow"],
    color: "chart-3",
    samples: [
      {
        id: 1,
        scene: "Indoor Room",
        degradation: "Hard Shadow",
        altitude: "Ground",
        raw: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=45",
        gt: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=85",
      },
      {
        id: 2,
        scene: "Outdoor Pavement",
        degradation: "Cast Shadow",
        altitude: "Ground",
        raw: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=400&q=45",
        gt: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=400&q=85",
      },
      {
        id: 3,
        scene: "Garden Path",
        degradation: "Soft Shadow",
        altitude: "Ground",
        raw: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=40",
        gt: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=85",
      },
      {
        id: 4,
        scene: "Street Scene",
        degradation: "Self Shadow",
        altitude: "Ground",
        raw: "https://images.unsplash.com/photo-1473655408214-2bcd29e9e73e?w=400&q=40",
        gt: "https://images.unsplash.com/photo-1473655408214-2bcd29e9e73e?w=400&q=85",
      },
      {
        id: 5,
        scene: "Wall Surface",
        degradation: "Hard Shadow",
        altitude: "Ground",
        raw: "https://images.unsplash.com/photo-1490750967868-88df5691cc0b?w=400&q=40",
        gt: "https://images.unsplash.com/photo-1490750967868-88df5691cc0b?w=400&q=85",
      },
      {
        id: 6,
        scene: "Courtyard",
        degradation: "Cast Shadow",
        altitude: "Ground",
        raw: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=40",
        gt: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=85",
      },
    ],
  },
  SRD: {
    name: "SRD",
    description:
      "The Shadow Removal Dataset (SRD) consists of paired shadow and shadow-free images collected from real-world scenes. Designed to support training and evaluating deep learning-based shadow removal models with diverse shadow patterns.",
    stats: {
      totalImages: 3088,
      imagePairs: 2680,
      resolution: "800×600",
      scenes: 80,
      splits: { train: 2680, val: 0, test: 408 },
    },
    degradations: ["Complex Shadow", "Multi-Shadow", "Light Shadow", "Dark Shadow"],
    color: "chart-4",
    samples: [
      {
        id: 1,
        scene: "Natural Landscape",
        degradation: "Complex Shadow",
        altitude: "Ground",
        raw: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&q=40",
        gt: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&q=85",
      },
      {
        id: 2,
        scene: "Park Area",
        degradation: "Multi-Shadow",
        altitude: "Ground",
        raw: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=40",
        gt: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=85",
      },
      {
        id: 3,
        scene: "Building Facade",
        degradation: "Dark Shadow",
        altitude: "Ground",
        raw: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&q=40",
        gt: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&q=85",
      },
      {
        id: 4,
        scene: "Open Field",
        degradation: "Light Shadow",
        altitude: "Ground",
        raw: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&q=40",
        gt: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&q=85",
      },
      {
        id: 5,
        scene: "Forest Edge",
        degradation: "Complex Shadow",
        altitude: "Ground",
        raw: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&q=35",
        gt: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&q=85",
      },
      {
        id: 6,
        scene: "Urban Street",
        degradation: "Multi-Shadow",
        altitude: "Ground",
        raw: "https://images.unsplash.com/photo-1473655408214-2bcd29e9e73e?w=400&q=35",
        gt: "https://images.unsplash.com/photo-1473655408214-2bcd29e9e73e?w=400&q=85",
      },
    ],
  },
};

export default function Datasets() {
  const [activeDataset, setActiveDataset] = useState("UAVIR-5D");
  const [filterDeg, setFilterDeg] = useState("All");

  const dataset = datasets[activeDataset];

  const filteredSamples =
    filterDeg === "All"
      ? dataset.samples
      : dataset.samples.filter((s) => s.degradation === filterDeg);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-inter font-bold text-foreground mb-2">
          Training Datasets
        </h1>
        <p className="text-sm text-muted-foreground max-w-xl">
          Browse the raw and ground truth image pairs used to train the unified restoration model.
        </p>
      </div>

      <DatasetSelector
        datasets={Object.keys(datasets)}
        activeDataset={activeDataset}
        onSelect={(d) => { setActiveDataset(d); setFilterDeg("All"); }}
        datasetMeta={datasets}
      />

      <DatasetStats dataset={dataset} />

      <DatasetGallery
        dataset={dataset}
        filteredSamples={filteredSamples}
        filterDeg={filterDeg}
        setFilterDeg={setFilterDeg}
      />
    </div>
  );
}