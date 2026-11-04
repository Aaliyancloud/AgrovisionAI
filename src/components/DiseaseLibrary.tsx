import React, { useState } from 'react';
import { TOMATO_DISEASES } from '../data/tomatoDiseases';
import { DiseaseInfo, PathogenType } from '../types/disease';
import { Search, ShieldAlert, Sparkles, Droplets, Thermometer, Wind, Check, ChevronRight } from 'lucide-react';

interface DiseaseLibraryProps {
  onSelectForDiagnosis?: (diseaseId: string) => void;
}

export const DiseaseLibrary: React.FC<DiseaseLibraryProps> = ({ onSelectForDiagnosis }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'All' | PathogenType>('All');
  const [selectedDisease, setSelectedDisease] = useState<DiseaseInfo>(TOMATO_DISEASES[1]);

  const filteredDiseases = TOMATO_DISEASES.filter((d) => {
    const matchesFilter = selectedFilter === 'All' || d.pathogenType === selectedFilter;
    const matchesQuery =
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.scientificName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesQuery;
  });

  return (
    <section id="care-library" className="relative w-full py-24 bg-[#040907] border-t border-emerald-950/70">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-2">
            Agronomic Knowledge Base
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight text-balance">
            Tomato Disease &amp; Care Encyclopedia
          </h2>
          <p className="mt-4 text-emerald-100/70 text-base sm:text-lg leading-relaxed">
            Comprehensive botanical pathology, environmental risk factors, and Integrated Pest Management (IPM) guidelines for all 10 conditions.
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search diseases or pathogens..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#07150f] border border-emerald-900/60 text-xs text-white placeholder-emerald-400/40 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          {/* Pathogen Category Filter Tabs */}
          <div className="flex items-center gap-1 p-1 bg-[#07150f] rounded-xl border border-emerald-900/50 overflow-x-auto max-w-full">
            {(['All', 'Fungal', 'Bacterial', 'Viral', 'Pest', 'Healthy'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  selectedFilter === filter
                    ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                    : 'text-emerald-300/80 hover:text-white'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Catalog & Detail Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Disease List */}
          <div className="lg:col-span-5 space-y-3">
            {filteredDiseases.length === 0 ? (
              <div className="p-8 text-center bg-[#07150f] rounded-2xl border border-emerald-900/40 text-xs text-emerald-300/60">
                No matching plant diseases found. Try clearing your search query.
              </div>
            ) : (
              filteredDiseases.map((disease) => {
                const isSelected = selectedDisease.id === disease.id;
                return (
                  <button
                    key={disease.id}
                    onClick={() => setSelectedDisease(disease)}
                    className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-emerald-400 bg-[#0b291d] shadow-lg shadow-emerald-950/80'
                        : 'border-emerald-900/40 bg-[#07150f] hover:border-emerald-700/60'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2 text-[11px] font-mono mb-1">
                        <span
                          className={
                            disease.pathogenType === 'Healthy'
                              ? 'text-emerald-400'
                              : disease.pathogenType === 'Viral'
                              ? 'text-yellow-400'
                              : disease.pathogenType === 'Bacterial'
                              ? 'text-cyan-400'
                              : 'text-amber-400'
                          }
                        >
                          {disease.pathogenType}
                        </span>
                        <span className="text-emerald-800">·</span>
                        <span className="text-emerald-300/60 italic">{disease.scientificName}</span>
                      </div>
                      <div className="font-display text-sm font-bold text-white">
                        {disease.name}
                      </div>
                    </div>

                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${
                        isSelected ? 'text-emerald-400 translate-x-1' : 'text-emerald-700'
                      }`}
                    />
                  </button>
                );
              })
            )}
          </div>

          {/* Right Column: Detailed Disease Profile Inspector */}
          <div className="lg:col-span-7 bg-[#07150f] border border-emerald-900/50 rounded-3xl p-6 lg:p-8 shadow-2xl flex flex-col gap-6 text-left">
            <div>
              <div className="flex items-center justify-between gap-4 mb-2">
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                  <span className="uppercase">{selectedDisease.pathogenType} PATHOLOGY</span>
                  <span aria-hidden="true">·</span>
                  <span>RISK: {selectedDisease.contagionRisk}</span>
                </div>

                {onSelectForDiagnosis && (
                  <button
                    onClick={() => onSelectForDiagnosis(selectedDisease.id)}
                    className="px-3 py-1.5 text-xs font-semibold text-black bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-300 hover:to-emerald-400 rounded-lg transition-all flex items-center gap-1.5 shadow"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Test In Diagnostic Studio</span>
                  </button>
                )}
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                {selectedDisease.name}
              </h3>
              <div className="text-sm text-emerald-300/80 italic font-serif mt-0.5">
                {selectedDisease.scientificName}
              </div>

              <p className="text-sm text-emerald-100/80 leading-relaxed mt-4">
                {selectedDisease.description}
              </p>
            </div>

            {/* Environmental Conditions */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-black/40 border border-emerald-950 text-xs">
              <div>
                <div className="flex items-center gap-1.5 text-emerald-400 font-mono mb-1">
                  <Thermometer className="w-3.5 h-3.5" />
                  <span>Optimum Temp</span>
                </div>
                <div className="text-emerald-100/90 font-medium">
                  {selectedDisease.favorableConditions.temperature}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-emerald-400 font-mono mb-1">
                  <Droplets className="w-3.5 h-3.5" />
                  <span>Optimum Humidity</span>
                </div>
                <div className="text-emerald-100/90 font-medium">
                  {selectedDisease.favorableConditions.humidity}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-emerald-400 font-mono mb-1">
                  <Wind className="w-3.5 h-3.5" />
                  <span>Transmission</span>
                </div>
                <div className="text-emerald-100/90 font-medium text-[11px]">
                  {selectedDisease.favorableConditions.spreadVector}
                </div>
              </div>
            </div>

            {/* Primary Symptoms */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-2">
                Primary Characteristic Symptoms
              </h4>
              <ul className="space-y-2 text-xs text-emerald-200/85">
                {selectedDisease.primarySymptoms.map((symp, idx) => (
                  <li key={idx} className="flex items-start gap-2 p-2 rounded-lg bg-black/20 border border-emerald-950">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{symp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actionable Remedies */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-2">
                Organic &amp; Cultural Prescriptions
              </h4>
              <div className="space-y-2 text-xs text-emerald-200/80">
                {selectedDisease.treatment.organic.map((org, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-900/30">
                    {org}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
