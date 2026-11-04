import React from 'react';
import smartGreenhouseImageUrl from '../assets/images/smart_greenhouse_tech_1793801738048.jpg';
import precisionSensorImageUrl from '../assets/images/precision_agri_sensor_1793801737432.jpg';
import { TrendingDown, Clock, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';

export const AgriculturalImpact: React.FC = () => {
  return (
    <section id="problem-impact" className="relative w-full py-24 bg-[#040907] border-t border-emerald-950/60">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-2">
            The Agricultural Challenge
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight text-balance">
            Why Every Hour Counts in Foliar Disease Management
          </h2>
          <p className="mt-4 text-emerald-100/70 text-base sm:text-lg leading-relaxed">
            Tomatoes (<span className="italic">Solanum lycopersicum</span>) represent over 180 million tonnes of annual global harvest.
            Yet microscopic fungal spores and viral vectors can compromise entire greenhouses within 7 to 10 days if unaddressed.
          </p>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          {/* Card 1: Crop Loss Stat */}
          <div className="md:col-span-4 bg-[#07150f] border border-emerald-900/40 rounded-2xl p-7 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-rose-950/50 border border-rose-800/40 flex items-center justify-center text-rose-400 mb-6">
                <TrendingDown className="w-5 h-5" />
              </div>
              <div className="font-mono text-4xl sm:text-5xl font-extrabold text-rose-400 tracking-tight">
                35.4%
              </div>
              <h3 className="font-display text-xl font-semibold text-white mt-2">
                Average Global Yield Loss
              </h3>
              <p className="text-sm text-emerald-200/60 mt-3 leading-relaxed">
                Untreated Early Blight, Late Blight, and TYLCV outbreaks consistently decimate more than a third of regional tomato production.
              </p>
            </div>

            <div className="pt-6 border-t border-emerald-950/80 text-xs font-mono text-emerald-400/80">
              Source: FAO &amp; International Horticultural Society
            </div>
          </div>

          {/* Card 2: 48-Hour Window */}
          <div className="md:col-span-8 bg-[#07150f] border border-emerald-900/40 rounded-2xl p-7 flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10">
              <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-6">
                <Clock className="w-5 h-5" />
              </div>
              <div className="font-mono text-3xl sm:text-4xl font-bold text-white tracking-tight">
                The 48-Hour Recovery Window
              </div>
              <h3 className="font-display text-lg text-emerald-300 font-medium mt-1">
                From Microscopic Spore Germination to Systemic Wilting
              </h3>
              <p className="text-sm text-emerald-200/70 mt-3 leading-relaxed max-w-2xl">
                When tomato leaf spotting is identified in its primary stage (chlorotic specks &lt; 2mm), targeted organic biological controls and bottom canopy pruning achieve an 85%+ containment rate, eliminating the need for blanket chemical pesticides.
              </p>
            </div>

            {/* Visual Process Bar */}
            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 mt-6 border-t border-emerald-950/80">
              <div className="bg-black/30 p-3.5 rounded-xl border border-emerald-900/40">
                <div className="text-xs font-mono text-emerald-400 font-semibold">STAGE 1: DAY 0-2</div>
                <div className="text-xs text-white font-medium mt-1">Spore Contact</div>
                <div className="text-[11px] text-emerald-300/60 mt-1">Pinpoint flecks · 95% recovery</div>
              </div>
              <div className="bg-black/30 p-3.5 rounded-xl border border-amber-900/40">
                <div className="text-xs font-mono text-amber-400 font-semibold">STAGE 2: DAY 3-5</div>
                <div className="text-xs text-white font-medium mt-1">Target Rings Form</div>
                <div className="text-[11px] text-amber-300/60 mt-1">Concentric necrosis · 70% recovery</div>
              </div>
              <div className="bg-black/30 p-3.5 rounded-xl border border-rose-900/40">
                <div className="text-xs font-mono text-rose-400 font-semibold">STAGE 3: DAY 6+</div>
                <div className="text-xs text-white font-medium mt-1">Vascular Collapse</div>
                <div className="text-[11px] text-rose-300/60 mt-1">Stem cankers · Critical yield drop</div>
              </div>
            </div>
          </div>

          {/* Card 3: Photographic Showcase - Smart Greenhouse */}
          <div className="md:col-span-7 bg-[#07150f] border border-emerald-900/40 rounded-2xl overflow-hidden flex flex-col justify-between">
            <div className="relative h-64 sm:h-72 w-full overflow-hidden">
              <img
                src={smartGreenhouseImageUrl}
                alt="Modern greenhouse with automated monitoring"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07150f] via-transparent to-black/20" />
              <div className="absolute bottom-4 left-6 right-6">
                <div className="text-xs font-mono text-emerald-300 uppercase tracking-wider">
                  Automated Crop Scouting
                </div>
                <div className="text-lg font-display font-semibold text-white">
                  Precision Protected Environments
                </div>
              </div>
            </div>
            <div className="p-6">
              <p className="text-sm text-emerald-200/70 leading-relaxed">
                Modern high-density greenhouses rely on rapid optical scouting. AgroVision AI provides the software brain that powers mobile scanners, handheld grower devices, and autonomous gantry cameras.
              </p>
            </div>
          </div>

          {/* Card 4: Sensor Rig Photo */}
          <div className="md:col-span-5 bg-[#07150f] border border-emerald-900/40 rounded-2xl overflow-hidden flex flex-col justify-between">
            <div className="relative h-64 sm:h-72 w-full overflow-hidden">
              <img
                src={precisionSensorImageUrl}
                alt="Precision agricultural sensor scanner"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07150f] via-transparent to-black/20" />
              <div className="absolute bottom-4 left-6 right-6">
                <div className="text-xs font-mono text-emerald-300 uppercase tracking-wider">
                  Multi-Spectral Edge Vision
                </div>
                <div className="text-lg font-display font-semibold text-white">
                  Instant Field Assessment
                </div>
              </div>
            </div>
            <div className="p-6">
              <p className="text-sm text-emerald-200/70 leading-relaxed">
                By processing directly on the device, growers and agronomists get real-time pathogen classifications in less than 350 milliseconds without requiring cloud latency.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
