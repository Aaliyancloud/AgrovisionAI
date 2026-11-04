import React, { useState } from 'react';
import { Award, Presentation, CheckSquare, HelpCircle, Laptop, Lightbulb, Share2, Sparkles } from 'lucide-react';

export const ExhibitionHub: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const steamPillars = [
    {
      letter: 'S',
      title: 'Science',
      area: 'Plant Pathology & Biology',
      description: 'Understanding Solanaceae cellular anatomy, fungal life cycles of Alternaria solani, and viral vector transmission.'
    },
    {
      letter: 'T',
      title: 'Technology',
      area: 'Edge AI & WebGL',
      description: 'Running hardware-accelerated 3D WebGL plant simulations and real-time client-side computer vision without external servers.'
    },
    {
      letter: 'E',
      title: 'Engineering',
      area: 'Precision Agriculture',
      description: 'Designing low-latency optical inspection pipelines deployable on field smartphones, robotic gantries, or autonomous drones.'
    },
    {
      letter: 'A',
      title: 'Art & Design',
      area: 'Interactive 3D UX',
      description: 'Cinematic storytelling, interactive 3D procedural plant rendering, and intuitive diagnostic visualization for farmers.'
    },
    {
      letter: 'M',
      title: 'Mathematics',
      area: 'Convolutional Kernels',
      description: 'Spatial matrix convolutions, CIE-L*a*b* Euclidean color distances, and Softmax probability distributions.'
    }
  ];

  const judgeQuestions = [
    {
      q: 'How does AgroVision AI handle offline environments at the exhibition?',
      a: 'AgroVision AI is engineered with a zero-server-dependency architecture. Both the 3D procedural WebGL engine and the computer vision feature extractor execute 100% locally in the browser runtime. It functions flawlessly without active internet connectivity on laptops, tablets, and kiosks.'
    },
    {
      q: 'Why focus specifically on tomato leaf diseases?',
      a: 'Tomatoes are the most widely grown protected vegetable worldwide and are exceptionally vulnerable to sudden blights. Furthermore, the standard PlantVillage dataset provides over 18,000 peer-reviewed botanical images across 10 distinct classes, creating a rigorous scientific benchmark for validating model accuracy.'
    },
    {
      q: 'How does early disease identification reduce chemical pesticide overuse?',
      a: 'By detecting chlorotic flecks before systemic vascular wilting occurs, growers can apply localized organic bio-fungicides (e.g. Bacillus subtilis, copper octanoate) and perform canopy pruning, reducing broad-spectrum synthetic chemical applications by up to 70%.'
    },
    {
      q: 'Can this model be adapted to other agricultural crops?',
      a: 'Yes. The modular convolutional feature extraction and color segmentation pipeline can be retrained with transfer learning on other high-value crops such as potatoes, bell peppers, corn, and grapes.'
    }
  ];

  return (
    <section id="exhibition-hub" className="relative w-full py-24 bg-[#050e09] border-t border-emerald-950/70">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-2">
            STEAM Exhibition 2026 Showcase
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight text-balance">
            Presenter Hub &amp; Project Evaluation
          </h2>
          <p className="mt-4 text-emerald-100/70 text-base sm:text-lg leading-relaxed">
            Curated scientific talking points, cross-disciplinary STEAM curriculum integration, and judge inquiry reference.
          </p>
        </div>

        {/* STEAM 5-Pillar Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-14">
          {steamPillars.map((p) => (
            <div
              key={p.letter}
              className="bg-[#07150f] border border-emerald-900/40 rounded-2xl p-5 flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-500/40 font-mono text-xl font-black text-emerald-400 flex items-center justify-center mb-3">
                  {p.letter}
                </div>
                <div className="font-display text-sm font-bold text-white">
                  {p.title}
                </div>
                <div className="text-[11px] font-mono text-emerald-300/80 mb-2">
                  {p.area}
                </div>
                <p className="text-xs text-emerald-200/60 leading-relaxed">
                  {p.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Exhibition Live Demo Checklist & Judge Q&A Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Live Demonstration Walkthrough Checklist */}
          <div className="lg:col-span-5 bg-[#07150f] border border-emerald-900/50 rounded-3xl p-6 lg:p-7 shadow-2xl">
            <div className="flex items-center gap-2 text-sm font-semibold text-white mb-4">
              <Presentation className="w-4 h-4 text-emerald-400" />
              <span>3-Minute Exhibition Demo Script</span>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="p-3 rounded-xl bg-black/40 border border-emerald-950 flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-emerald-600/30 text-emerald-400 font-mono text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <div>
                  <strong className="text-white">Introduce the Hero 3D Plant:</strong>
                  <p className="text-emerald-200/70 mt-0.5">
                    Rotate the 3D tomato vine model. Highlight natural leaf serration, glossy ripening fruit clusters, and breeze dynamics.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-black/40 border border-emerald-950 flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-emerald-600/30 text-emerald-400 font-mono text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <div>
                  <strong className="text-white">Demonstrate 3D Laser Inspection:</strong>
                  <p className="text-emerald-200/70 mt-0.5">
                    Navigate to the 3D Anatomy section. Toggle between Healthy and Early Blight to show how 532nm laser scanning isolates necrotic rings.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-black/40 border border-emerald-950 flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-emerald-600/30 text-emerald-400 font-mono text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                  3
                </span>
                <div>
                  <strong className="text-white">Run Live Specimen Diagnosis:</strong>
                  <p className="text-emerald-200/70 mt-0.5">
                    Click "Exhibition Samples" in the Diagnostic Studio. Choose Specimen B (Early Blight) to demonstrate real-time lesion mapping and organic treatment suggestions.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-black/40 border border-emerald-950 flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-emerald-600/30 text-emerald-400 font-mono text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                  4
                </span>
                <div>
                  <strong className="text-white">Test Camera / Custom Leaf:</strong>
                  <p className="text-emerald-200/70 mt-0.5">
                    Invite the judge to hold up a leaf or phone image to the camera to demonstrate generalizability and instant inference.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Judge Q&A Accordion */}
          <div className="lg:col-span-7 bg-[#07150f] border border-emerald-900/50 rounded-3xl p-6 lg:p-7 shadow-2xl">
            <div className="flex items-center gap-2 text-sm font-semibold text-white mb-4">
              <HelpCircle className="w-4 h-4 text-emerald-400" />
              <span>Anticipated Judge &amp; Evaluator Questions</span>
            </div>

            <div className="space-y-3">
              {judgeQuestions.map((q, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-xl border border-emerald-900/40 bg-black/30 overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
                      className="w-full p-4 text-left flex items-center justify-between gap-4 hover:bg-emerald-950/20"
                    >
                      <span className="font-display text-xs sm:text-sm font-bold text-white">
                        {q.q}
                      </span>
                      <span className="text-emerald-400 font-mono text-sm shrink-0">
                        {isOpen ? '−' : '+'}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="px-4 pb-4 text-xs text-emerald-200/80 leading-relaxed border-t border-emerald-950/60 pt-3">
                        {q.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
