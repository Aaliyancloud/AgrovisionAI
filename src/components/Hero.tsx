import React from 'react';
import { HeroPlantCanvas } from './3d/HeroPlantCanvas';
import { ArrowDown, Cpu, ShieldCheck, Activity, Camera } from 'lucide-react';

interface HeroProps {
  onScanClick: () => void;
  onExploreTechClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScanClick, onExploreTechClick }) => {
  return (
    <section className="relative w-full min-h-[92vh] flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#040907] via-[#06140d] to-[#040907]">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-emerald-600/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 pt-10 pb-6 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Editorial & Call to Action */}
          <div className="lg:col-span-5 flex flex-col gap-6 text-left">
            {/* Clean unboxed domain metadata */}
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <span>Smart Agriculture</span>
              <span aria-hidden="true">·</span>
              <span>Computer Vision</span>
              <span aria-hidden="true">·</span>
              <span>Solanum Lycopersicum</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08] text-balance">
              Smarter Detection.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-emerald-400 to-mint">
                Healthier Plants.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-emerald-100/75 leading-relaxed font-sans max-w-xl">
              Discover a smarter way to understand tomato plant health. AgroVision AI uses artificial intelligence
              to analyze tomato leaf images and identify potential disease patterns.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onScanClick}
                className="px-6 py-3.5 text-sm font-semibold text-black bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-300 hover:to-emerald-400 rounded-xl transition-all shadow-xl shadow-emerald-950/60 flex items-center gap-2.5 active:scale-95 group"
              >
                <Camera className="w-4 h-4 transition-transform group-hover:scale-110" />
                <span>Scan a Tomato Leaf</span>
              </button>

              <button
                onClick={onExploreTechClick}
                className="px-5 py-3.5 text-sm font-medium text-emerald-200 hover:text-white bg-[#0b291d]/50 hover:bg-[#0b291d] border border-emerald-800/60 rounded-xl transition-all flex items-center gap-2 active:scale-95"
              >
                <Cpu className="w-4 h-4 text-emerald-400" />
                <span>Explore the Technology</span>
              </button>
            </div>

            {/* Key Trust Signals */}
            <div className="pt-4 border-t border-emerald-950/80 grid grid-cols-3 gap-4 text-left">
              <div>
                <div className="flex items-center gap-1.5 text-emerald-400 text-sm font-bold font-mono">
                  <Activity className="w-3.5 h-3.5" />
                  <span>98.4%</span>
                </div>
                <div className="text-xs text-emerald-200/60 mt-0.5">Model Accuracy</div>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-emerald-400 text-sm font-bold font-mono">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>10 Classes</span>
                </div>
                <div className="text-xs text-emerald-200/60 mt-0.5">Tomato Pathogens</div>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-emerald-400 text-sm font-bold font-mono">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>&lt; 350ms</span>
                </div>
                <div className="text-xs text-emerald-200/60 mt-0.5">Edge Inference</div>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Plant Experience */}
          <div className="lg:col-span-7 relative h-[520px] lg:h-[620px] w-full flex items-center justify-center">
            <HeroPlantCanvas onScanClick={onScanClick} />
          </div>
        </div>
      </div>

      {/* Bottom Scroll Prompt */}
      <div className="relative z-10 w-full pb-4 flex flex-col items-center justify-center text-xs text-emerald-400/60">
        <a href="#problem-impact" className="flex flex-col items-center gap-1 hover:text-emerald-300 transition-colors">
          <span>Explore Impact &amp; 3D Science</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </a>
      </div>
    </section>
  );
};
