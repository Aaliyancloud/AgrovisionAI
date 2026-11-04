import React, { useState } from 'react';
import { Leaf, Menu, X, Sparkles } from 'lucide-react';

interface NavbarProps {
  onScanClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onScanClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#040907]/90 backdrop-blur-md border-b border-emerald-950/70">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-3.5">
        {/* Zone 1: Brand Wordmark */}
        <a href="#" className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 group">
          <div className="w-8 h-8 rounded-lg bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-900/80 transition-colors">
            <Leaf className="w-4 h-4" />
          </div>
          <span className="font-display tracking-tight text-emerald-50 text-xl font-bold">
            AgroVision <span className="text-emerald-400">AI</span>
          </span>
        </a>

        {/* Zone 2: 4-5 Clean Single-Line Text Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-emerald-100/70">
          <a href="#problem-impact" className="hover:text-emerald-300 transition-colors whitespace-nowrap shrink-0">
            Impact
          </a>
          <a href="#3d-anatomy" className="hover:text-emerald-300 transition-colors whitespace-nowrap shrink-0">
            3D Leaf Anatomy
          </a>
          <a href="#diagnostic" className="hover:text-emerald-300 transition-colors whitespace-nowrap shrink-0 text-emerald-400 font-semibold">
            AI Diagnostic Studio
          </a>
          <a href="#technology" className="hover:text-emerald-300 transition-colors whitespace-nowrap shrink-0">
            Neural Pipeline
          </a>
          <a href="#care-library" className="hover:text-emerald-300 transition-colors whitespace-nowrap shrink-0">
            Disease Encyclopedia
          </a>
          <a href="#exhibition-hub" className="hover:text-emerald-300 transition-colors whitespace-nowrap shrink-0">
            STEAM Hub
          </a>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onScanClick}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-black bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-300 hover:to-emerald-400 rounded-lg transition-all shadow-lg shadow-emerald-950/50 whitespace-nowrap shrink-0 active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Scan Tomato Leaf</span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-emerald-400 hover:text-white transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-emerald-900/60 bg-[#07150f] px-6 py-4 flex flex-col gap-3 text-sm">
          <a
            href="#problem-impact"
            onClick={() => setMobileMenuOpen(false)}
            className="text-emerald-200/80 hover:text-white py-1.5"
          >
            Impact
          </a>
          <a
            href="#3d-anatomy"
            onClick={() => setMobileMenuOpen(false)}
            className="text-emerald-200/80 hover:text-white py-1.5"
          >
            3D Leaf Anatomy
          </a>
          <a
            href="#diagnostic"
            onClick={() => setMobileMenuOpen(false)}
            className="text-emerald-300 font-semibold py-1.5"
          >
            AI Diagnostic Studio
          </a>
          <a
            href="#technology"
            onClick={() => setMobileMenuOpen(false)}
            className="text-emerald-200/80 hover:text-white py-1.5"
          >
            Neural Pipeline
          </a>
          <a
            href="#care-library"
            onClick={() => setMobileMenuOpen(false)}
            className="text-emerald-200/80 hover:text-white py-1.5"
          >
            Disease Encyclopedia
          </a>
          <a
            href="#exhibition-hub"
            onClick={() => setMobileMenuOpen(false)}
            className="text-emerald-200/80 hover:text-white py-1.5"
          >
            STEAM Exhibition Hub
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onScanClick();
            }}
            className="w-full mt-2 py-2.5 text-center text-xs font-semibold text-black bg-emerald-400 rounded-lg hover:bg-emerald-300"
          >
            Scan Tomato Leaf Now
          </button>
        </div>
      )}
    </header>
  );
};
