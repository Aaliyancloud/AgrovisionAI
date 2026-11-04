import React from 'react';
import { Leaf, Heart, ExternalLink, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#030705] border-t border-emerald-950/80 py-12 text-xs text-emerald-200/60">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand Lockup */}
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Leaf className="w-3.5 h-3.5" />
          </div>
          <span className="font-display font-bold text-white text-base">
            AgroVision <span className="text-emerald-400">AI</span>
          </span>
          <span className="text-emerald-800">·</span>
          <span>Smarter Detection. Healthier Plants.</span>
        </div>

        {/* Academic and Benchmark References */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-[11px] font-mono">
          <span>PlantVillage Dataset (10 Classes)</span>
          <span className="text-emerald-800">·</span>
          <span>UN SDG #2: Zero Hunger</span>
          <span className="text-emerald-800">·</span>
          <span>STEAM Exhibition 2026</span>
        </div>

        {/* Quiet copyright */}
        <div className="text-[11px] text-emerald-400/60">
          Built for high-precision botanical pathology research.
        </div>
      </div>
    </footer>
  );
};
