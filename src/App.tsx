import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AgriculturalImpact } from './components/AgriculturalImpact';
import { LeafAnatomySection } from './components/LeafAnatomySection';
import { DiagnosticStudio } from './components/DiagnosticStudio';
import { NeuralPipelineSection } from './components/NeuralPipelineSection';
import { DiseaseLibrary } from './components/DiseaseLibrary';
import { ExhibitionHub } from './components/ExhibitionHub';
import { Footer } from './components/Footer';

export default function App() {
  const scrollToDiagnostic = () => {
    const el = document.getElementById('diagnostic');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTechnology = () => {
    const el = document.getElementById('technology');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#040907] text-[#e8f5ed] flex flex-col font-sans selection:bg-emerald-500 selection:text-black">
      <Navbar onScanClick={scrollToDiagnostic} />

      <main className="flex-1">
        <Hero
          onScanClick={scrollToDiagnostic}
          onExploreTechClick={scrollToTechnology}
        />

        <AgriculturalImpact />

        <LeafAnatomySection />

        <DiagnosticStudio />

        <NeuralPipelineSection />

        <DiseaseLibrary onSelectForDiagnosis={scrollToDiagnostic} />

        <ExhibitionHub />
      </main>

      <Footer />
    </div>
  );
}
