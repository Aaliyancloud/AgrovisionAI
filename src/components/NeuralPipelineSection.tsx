import React, { useState } from 'react';
import { Cpu, Eye, Network, BarChart3, Scan, ArrowRight } from 'lucide-react';

export const NeuralPipelineSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const pipelineSteps = [
    {
      step: 1,
      title: 'Multispectral Preprocessing',
      tag: 'Step 01 / Optical Normalization',
      icon: Scan,
      description: 'The raw RGB leaf image is transformed into CIE-L*a*b* and HSV color spaces. A Otsu thresholding mask isolates plant tissue from background soil, greenhouse rails, or human fingers.',
      metrics: ['Resolution: 256×256 px', 'Color Space: CIELAB + HSV', 'Artifact Rejection: 99.2%']
    },
    {
      step: 2,
      title: 'Convolutional Feature Extraction',
      tag: 'Step 02 / Spatial Convolutions',
      icon: Cpu,
      description: 'Hierarchical convolutional kernels extract low-level edges, intermediate leaf vein bifurcations, and high-level irregular lesion contours across depthwise-separable layers.',
      metrics: ['Kernels: 3×3 & 5×5 Dilated', 'Channels: 64 → 512', 'Receptive Field: Full Canopy']
    },
    {
      step: 3,
      title: 'Lesion Spatial Attention',
      tag: 'Step 03 / Visual Attention',
      icon: Eye,
      description: 'A spatial self-attention head focuses computational weight on symptomatic regions—weighing concentric target rings against healthy surrounding green leaf tissue.',
      metrics: ['Attention Heads: 8 Cross-Heads', 'Lesion Salience: > 0.85', 'Noise Suppressed: High']
    },
    {
      step: 4,
      title: 'Pathogen Softmax Categorization',
      tag: 'Step 04 / Diagnostic Classification',
      icon: Network,
      description: 'The dense classification head generates probability distributions across all 10 tomato plant disease categories, mapped directly to Integrated Pest Management (IPM) protocols.',
      metrics: ['Classes: 10 Tomato Conditions', 'Benchmark Accuracy: 98.4%', 'Edge Latency: < 350ms']
    }
  ];

  const currentStep = pipelineSteps[activeStep - 1];

  return (
    <section id="technology" className="relative w-full py-24 bg-[#050e09] border-t border-emerald-950/70">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-2">
            Artificial Intelligence Architecture
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight text-balance">
            How AgroVision AI Decodes Plant Pathology
          </h2>
          <p className="mt-4 text-emerald-100/70 text-base sm:text-lg leading-relaxed">
            From raw photographic pixels to actionable biological remedies: explore our four-stage computer vision and neural feature extraction pipeline.
          </p>
        </div>

        {/* Pipeline Stepper Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {pipelineSteps.map((s) => {
            const Icon = s.icon;
            const isSelected = activeStep === s.step;
            return (
              <button
                key={s.step}
                onClick={() => setActiveStep(s.step)}
                className={`p-5 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'border-emerald-400 bg-[#0b291d] shadow-lg shadow-emerald-950'
                    : 'border-emerald-900/40 bg-[#07150f] hover:border-emerald-700/60'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      isSelected ? 'bg-emerald-500 text-black' : 'bg-black/40 text-emerald-400'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-mono text-emerald-400/80">0{s.step}</span>
                </div>
                <div className="font-display text-sm font-bold text-white mb-1">
                  {s.title}
                </div>
                <div className="text-xs text-emerald-200/60 line-clamp-2">
                  {s.tag}
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Active Step Showcase */}
        <div className="bg-[#07150f] border border-emerald-900/50 rounded-3xl p-8 lg:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Descriptive Content */}
            <div className="lg:col-span-7 flex flex-col gap-4 text-left">
              <div className="text-xs font-mono text-emerald-400">
                {currentStep.tag}
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                {currentStep.title}
              </h3>
              <p className="text-base text-emerald-100/80 leading-relaxed font-sans">
                {currentStep.description}
              </p>

              {/* Technical Specifications */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-emerald-950/80">
                {currentStep.metrics.map((m, i) => (
                  <div key={i} className="p-3 rounded-xl bg-black/40 border border-emerald-900/40 text-xs">
                    <span className="text-emerald-300 font-mono font-medium">{m}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Visual Simulated Feature Map */}
            <div className="lg:col-span-5 bg-black/60 rounded-2xl border border-emerald-900/50 p-6 flex flex-col items-center justify-center min-h-[260px] text-center">
              <div className="w-16 h-16 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-4">
                <BarChart3 className="w-8 h-8" />
              </div>
              <div className="font-display text-sm font-semibold text-white">
                Neural Activation Matrix
              </div>
              <div className="text-xs text-emerald-300/60 max-w-xs mt-1">
                Visualizing convolutional layer activations and spatial lesion feature maps for class discrimination.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
