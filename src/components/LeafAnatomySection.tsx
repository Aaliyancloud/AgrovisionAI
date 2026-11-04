import React, { useState } from 'react';
import { LeafScannerCanvas, LeafConditionMode } from './3d/LeafScannerCanvas';
import { Layers, Scan, Bug, Shield, Activity, HelpCircle } from 'lucide-react';

export const LeafAnatomySection: React.FC = () => {
  const [selectedCondition, setSelectedCondition] = useState<LeafConditionMode>('early_blight');
  const [activeLayer, setActiveLayer] = useState<'cuticle' | 'mesophyll' | 'vascular' | 'stomata'>('mesophyll');

  const anatomicalLayers = {
    cuticle: {
      title: 'Waxy Epicuticular Layer',
      role: 'First Line of Defense',
      description: 'A hydrophobic, lipidic film preventing water droplets from adhering. Spores of Alternaria and Phytophthora produce specialized cutinases and appressoria to pierce this physical shield.',
      thickness: '1.2 - 2.8 µm',
      vulnerability: 'Damaged by abrasion, high UV, or pesticide surfactant over-concentration.'
    },
    mesophyll: {
      title: 'Palisade & Spongy Mesophyll',
      role: 'Photosynthetic Core',
      description: 'Densely packed chloroplast-rich cells where solar energy is converted to sucrose. Pathogens secrete necrotic toxins that break down cell membranes, causing the classic target-ring necrosis.',
      thickness: '140 - 220 µm',
      vulnerability: 'Primary site of chlorosis where chlorophyll-a degrades into brown pheophytin.'
    },
    vascular: {
      title: 'Xylem & Phloem Bundles',
      role: 'Fluid & Nutrient Highway',
      description: 'Lignified vascular conduits transporting sap. Fungal hyphae and bacterial biofilms colonize xylem vessels, inducing water occlusion and systemic wilt.',
      thickness: '40 - 90 µm diameter',
      vulnerability: 'Whitefly vectors inject viral RNA (like TYLCV) directly into phloem sieve elements.'
    },
    stomata: {
      title: 'Stomatal Guard Cells',
      role: 'Gas Exchange Gateways',
      description: 'Microscopic pores regulating CO2 uptake and water transpiration. Bacterial pathogens like Xanthomonas campestris bypass the cuticle entirely by swimming through open stomatal apertures.',
      thickness: '18 - 24 µm pore length',
      vulnerability: 'Dew condensation creates liquid micro-bridges that facilitate flagellar bacterial motility.'
    }
  };

  const currentLayerData = anatomicalLayers[activeLayer];

  return (
    <section id="3d-anatomy" className="relative w-full py-24 bg-[#050e09] border-t border-emerald-950/70">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-2">
            3D Botanical Simulation
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight text-balance">
            Interactive Leaf Anatomy &amp; Pathology
          </h2>
          <p className="mt-4 text-emerald-100/70 text-base sm:text-lg leading-relaxed">
            Examine how plant diseases alter cellular morphology. Toggle between pathology modes to inspect lesion topologies and active 532nm laser scanning.
          </p>
        </div>

        {/* 2-Column Layout: 3D Leaf Inspector + Anatomical Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: 3D Leaf Canvas */}
          <div className="lg:col-span-7 bg-[#07150f] border border-emerald-900/50 rounded-2xl overflow-hidden flex flex-col justify-between shadow-2xl relative">
            <div className="relative w-full h-[500px] lg:h-[580px]">
              <LeafScannerCanvas initialCondition={selectedCondition} isScanningActive={true} />
            </div>
          </div>

          {/* Right Column: Interactive Anatomical Layers & Pathology Guide */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            {/* Cellular Anatomy Selector */}
            <div className="bg-[#07150f] border border-emerald-900/40 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-white">
                  <Layers className="w-4 h-4 text-emerald-400" />
                  <span>Cellular Tissue Layers</span>
                </div>
                <span className="text-xs font-mono text-emerald-400/80">Interactive Guide</span>
              </div>

              {/* Layer Selection Buttons */}
              <div className="grid grid-cols-2 gap-2 mb-5">
                {(['cuticle', 'mesophyll', 'vascular', 'stomata'] as const).map((lKey) => (
                  <button
                    key={lKey}
                    onClick={() => setActiveLayer(lKey)}
                    className={`px-3 py-2 text-xs font-medium rounded-lg text-left transition-all ${
                      activeLayer === lKey
                        ? 'bg-emerald-600/30 border border-emerald-500 text-white shadow-sm'
                        : 'bg-black/30 border border-emerald-900/40 text-emerald-300 hover:border-emerald-700'
                    }`}
                  >
                    {anatomicalLayers[lKey].title.split(' ')[0]} Layer
                  </button>
                ))}
              </div>

              {/* Layer Explanatory Card */}
              <div className="bg-black/40 border border-emerald-950 p-4 rounded-xl">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-base font-bold text-white">
                    {currentLayerData.title}
                  </h3>
                  <span className="text-xs font-mono text-emerald-400">
                    {currentLayerData.thickness}
                  </span>
                </div>
                <div className="text-xs text-emerald-400/90 font-mono mt-0.5">
                  Role: {currentLayerData.role}
                </div>
                <p className="text-xs text-emerald-200/75 mt-3 leading-relaxed">
                  {currentLayerData.description}
                </p>
                <div className="mt-3 pt-3 border-t border-emerald-900/40 text-xs text-amber-300/80">
                  <strong className="text-amber-400">Pathology Vector:</strong> {currentLayerData.vulnerability}
                </div>
              </div>
            </div>

            {/* Pathological Disease Signatures Reference */}
            <div className="bg-[#07150f] border border-emerald-900/40 rounded-2xl p-6">
              <div className="flex items-center gap-2 text-sm font-semibold text-white mb-4">
                <Activity className="w-4 h-4 text-emerald-400" />
                <span>Pathogen Diagnostic Profile</span>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-black/30 rounded-xl border border-emerald-900/30">
                  <div className="w-7 h-7 rounded-lg bg-emerald-950 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                    <Scan className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">532nm Multispectral Laser Alignment</div>
                    <div className="text-[11px] text-emerald-200/70 mt-0.5">
                      Measures leaf reflectance shifts at green (550nm) and red-edge (705nm) wavelengths to compute normalized photochemical indices.
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-black/30 rounded-xl border border-emerald-900/30">
                  <div className="w-7 h-7 rounded-lg bg-emerald-950 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                    <Shield className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">Necrotic Halo Boundary Extraction</div>
                    <div className="text-[11px] text-emerald-200/70 mt-0.5">
                      Convolutional kernels trace concentric ring topography to distinguish fungal Early Blight from bacterial spot and nutrient deficiency.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
