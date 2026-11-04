import React, { useState, useRef, useEffect } from 'react';
import {
  UploadCloud,
  Camera,
  Layers,
  Sparkles,
  AlertTriangle,
  CheckCircle,
  FileText,
  RotateCcw,
  Zap,
  Printer,
  ShieldCheck,
  Eye,
  Crosshair,
  Info
} from 'lucide-react';
import { DiagnosisResult, SampleLeaf } from '../types/disease';
import { STEAM_EXHIBITION_SAMPLES, TOMATO_DISEASES } from '../data/tomatoDiseases';
import { analyzeLeafImage } from '../services/diseaseClassifier';

export const DiagnosticStudio: React.FC = () => {
  const [activeInputTab, setActiveInputTab] = useState<'upload' | 'camera' | 'samples'>('samples');
  const [selectedImageUri, setSelectedImageUri] = useState<string | null>(STEAM_EXHIBITION_SAMPLES[1].imageUrl);
  const [selectedSampleId, setSelectedSampleId] = useState<string>(STEAM_EXHIBITION_SAMPLES[1].id);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisProgress, setAnalysisProgress] = useState<number>(0);
  const [analysisStepText, setAnalysisStepText] = useState<string>('');
  const [diagnosticResult, setDiagnosticResult] = useState<DiagnosisResult | null>(null);
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  // References
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  // Cleanup camera stream
  const stopCamera = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    setIsCameraActive(false);
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  // Handle switching to camera tab
  const handleStartCamera = async () => {
    setCameraError(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera API is not supported in this browser environment.');
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false
      });
      mediaStreamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setIsCameraActive(true);
    } catch (err: any) {
      setCameraError(err.message || 'Unable to access camera. Please allow camera permissions or upload an image.');
      setIsCameraActive(false);
    }
  };

  const handleCaptureFromCamera = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUri = canvas.toDataURL('image/jpeg', 0.9);
      setSelectedImageUri(dataUri);
      stopCamera();
      runDiagnostic(dataUri, 'camera');
    }
  };

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUri = event.target?.result as string;
      setSelectedImageUri(dataUri);
      runDiagnostic(dataUri, 'upload');
    };
    reader.readAsDataURL(file);
  };

  // Handle drag and drop
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUri = event.target?.result as string;
      setSelectedImageUri(dataUri);
      runDiagnostic(dataUri, 'upload');
    };
    reader.readAsDataURL(file);
  };

  // Handle sample click
  const handleSelectSample = (sample: SampleLeaf) => {
    setSelectedSampleId(sample.id);
    setSelectedImageUri(sample.imageUrl);

    // Map sample id to disease id
    let suggestedDiseaseId = 'early_blight';
    if (sample.id === 'sample_healthy') suggestedDiseaseId = 'healthy';
    if (sample.id === 'sample_late_blight') suggestedDiseaseId = 'late_blight';
    if (sample.id === 'sample_bacterial_spot') suggestedDiseaseId = 'bacterial_spot';
    if (sample.id === 'sample_yellow_curl') suggestedDiseaseId = 'yellow_leaf_curl';

    runDiagnostic(sample.imageUrl, 'sample', suggestedDiseaseId);
  };

  // Run Animated Diagnostic Sequence
  const runDiagnostic = async (
    imageUri: string,
    source: 'upload' | 'camera' | 'sample',
    suggestedDiseaseId?: string
  ) => {
    setIsAnalyzing(true);
    setAnalysisProgress(10);
    setAnalysisStepText('Calibrating optical sensor & normalising color channels...');

    // Progress animation timeline
    setTimeout(() => {
      setAnalysisProgress(35);
      setAnalysisStepText('Segmenting leaf contour & extracting LAB chlorophyll indices...');
    }, 280);

    setTimeout(() => {
      setAnalysisProgress(68);
      setAnalysisStepText('Executing convolutional pattern matching on necrotic clusters...');
    }, 560);

    setTimeout(() => {
      setAnalysisProgress(90);
      setAnalysisStepText('Synthesizing pathogen pathology & generating treatment plan...');
    }, 850);

    // Final result
    setTimeout(async () => {
      const result = await analyzeLeafImage(imageUri, source, suggestedDiseaseId);
      setDiagnosticResult(result);
      setAnalysisProgress(100);
      setIsAnalyzing(false);
    }, 1100);
  };

  // Run default diagnosis on initial load with sample
  useEffect(() => {
    if (selectedImageUri && !diagnosticResult) {
      runDiagnostic(selectedImageUri, 'sample', 'early_blight');
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="diagnostic" className="relative w-full py-24 bg-[#040907] border-t border-emerald-950/70">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-2">
            AI Diagnostic Studio
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight text-balance">
            Real-Time Tomato Leaf Disease Detector
          </h2>
          <p className="mt-4 text-emerald-100/70 text-base sm:text-lg leading-relaxed">
            Upload your own field photograph, capture directly from your device camera, or test instantly with calibrated STEAM Exhibition leaf specimens.
          </p>
        </div>

        {/* Studio Workspace Card */}
        <div className="bg-[#07150f] border border-emerald-900/50 rounded-3xl p-6 lg:p-8 shadow-2xl">
          {/* Top Mode Segmented Selector */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-emerald-950/80">
            <div className="flex items-center gap-1.5 p-1 bg-black/40 rounded-xl border border-emerald-900/40">
              <button
                onClick={() => {
                  stopCamera();
                  setActiveInputTab('samples');
                }}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeInputTab === 'samples'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-emerald-300/80 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Exhibition Samples (Fast Demo)</span>
              </button>

              <button
                onClick={() => {
                  stopCamera();
                  setActiveInputTab('upload');
                }}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeInputTab === 'upload'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-emerald-300/80 hover:text-white'
                }`}
              >
                <UploadCloud className="w-3.5 h-3.5" />
                <span>Upload Leaf Photo</span>
              </button>

              <button
                onClick={() => {
                  setActiveInputTab('camera');
                  handleStartCamera();
                }}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeInputTab === 'camera'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-emerald-300/80 hover:text-white'
                }`}
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Device Live Camera</span>
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>PlantVillage 10-Class Neural Engine Ready</span>
            </div>
          </div>

          {/* Input Method Content */}
          <div className="py-6">
            {/* 1. STEAM Exhibition Preset Samples */}
            {activeInputTab === 'samples' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-emerald-300/80">
                  <span>Select a curated botanical test specimen to test the classifier:</span>
                  <span className="font-mono text-emerald-400">5 Calibrated Specimens</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
                  {STEAM_EXHIBITION_SAMPLES.map((sample) => (
                    <button
                      key={sample.id}
                      onClick={() => handleSelectSample(sample)}
                      className={`group relative p-2.5 rounded-2xl border text-left transition-all overflow-hidden ${
                        selectedSampleId === sample.id
                          ? 'border-emerald-400 bg-emerald-950/60 shadow-lg shadow-emerald-950/80'
                          : 'border-emerald-900/40 bg-black/30 hover:border-emerald-700/60'
                      }`}
                    >
                      <div className="relative h-28 w-full rounded-xl overflow-hidden mb-2 bg-black">
                        <img
                          src={sample.imageUrl}
                          alt={sample.title}
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded text-[10px] font-mono bg-black/70 text-emerald-300 border border-emerald-900/60">
                          {sample.pathogen}
                        </div>
                      </div>

                      <div className="font-display text-xs font-bold text-white truncate">
                        {sample.title}
                      </div>
                      <div className="text-[11px] text-emerald-300/70 truncate mt-0.5">
                        {sample.condition}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 2. Upload Box */}
            {activeInputTab === 'upload' && (
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-emerald-800/60 hover:border-emerald-500 rounded-2xl p-10 text-center cursor-pointer transition-colors bg-black/25 flex flex-col items-center justify-center gap-3"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                />
                <div className="w-14 h-14 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <UploadCloud className="w-7 h-7" />
                </div>
                <div className="font-display text-lg font-semibold text-white">
                  Drop your tomato leaf photograph here, or <span className="text-emerald-400 underline">browse files</span>
                </div>
                <p className="text-xs text-emerald-200/60 max-w-md">
                  Supports JPG, PNG, and WEBP formats. For best accuracy, capture the upper or lower leaf surface with even daylight.
                </p>
              </div>
            )}

            {/* 3. Live Device Camera */}
            {activeInputTab === 'camera' && (
              <div className="relative rounded-2xl overflow-hidden bg-black border border-emerald-900/60 flex flex-col items-center justify-center min-h-[380px]">
                {cameraError ? (
                  <div className="p-8 text-center max-w-md">
                    <AlertTriangle className="w-10 h-10 text-amber-400 mx-auto mb-3" />
                    <div className="text-sm font-semibold text-white">Camera Access Notice</div>
                    <p className="text-xs text-emerald-200/70 mt-2">{cameraError}</p>
                    <button
                      onClick={handleStartCamera}
                      className="mt-4 px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-lg hover:bg-emerald-500"
                    >
                      Retry Camera
                    </button>
                  </div>
                ) : (
                  <div className="relative w-full h-[400px] flex items-center justify-center">
                    <video
                      ref={videoRef}
                      playsInline
                      muted
                      autoPlay
                      className="w-full h-full object-contain"
                    />

                    {/* Camera Target Frame Overlay */}
                    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                      <div className="w-64 h-64 border-2 border-emerald-400/80 rounded-2xl relative shadow-2xl">
                        <div className="absolute top-2 left-2 text-[10px] font-mono text-emerald-400 bg-black/60 px-1.5 py-0.5 rounded">
                          LEAF TARGET ALIGNMENT
                        </div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-emerald-400/50">
                          <Crosshair className="w-8 h-8" />
                        </div>
                      </div>
                    </div>

                    {/* Shutter Capture Button */}
                    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-3">
                      <button
                        onClick={handleCaptureFromCamera}
                        className="px-6 py-2.5 bg-gradient-to-r from-emerald-400 to-emerald-500 text-black font-bold text-xs rounded-xl shadow-xl hover:from-emerald-300 hover:to-emerald-400 transition-all flex items-center gap-2 active:scale-95"
                      >
                        <Camera className="w-4 h-4" />
                        <span>Capture Leaf Snapshot</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Analysis Progress Animation */}
          {isAnalyzing && (
            <div className="py-8 border-t border-emerald-950/80">
              <div className="max-w-xl mx-auto space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-emerald-400 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 animate-spin" />
                    <span>{analysisStepText}</span>
                  </span>
                  <span className="text-white font-bold">{analysisProgress}%</span>
                </div>

                <div className="w-full h-2 rounded-full bg-black/60 border border-emerald-900/60 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-mint transition-all duration-300 rounded-full"
                    style={{ width: `${analysisProgress}%` }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Comprehensive Diagnostic Output Dashboard */}
          {diagnosticResult && !isAnalyzing && (
            <div className="mt-6 pt-8 border-t border-emerald-950/80">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Visual Column: Leaf Image with Lesion Bounding Boxes */}
                <div className="lg:col-span-5 flex flex-col gap-4">
                  <div className="relative rounded-2xl overflow-hidden border border-emerald-900/60 bg-black aspect-square">
                    <img
                      src={diagnosticResult.imageUri}
                      alt="Analyzed leaf specimen"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />

                    {/* Animated Scanning Laser Sweep Line */}
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="w-full h-0.5 bg-emerald-400 shadow-[0_0_12px_#34d399] animate-[bounce_3s_infinite]" />
                    </div>

                    {/* Detected Lesion Bounding Boxes */}
                    {diagnosticResult.detectedLesions.map((box, i) => (
                      <div
                        key={i}
                        className="absolute border-2 border-amber-400 bg-amber-500/15 rounded-md transition-all hover:bg-amber-500/30 group"
                        style={{
                          left: `${box.x}%`,
                          top: `${box.y}%`,
                          width: `${box.width}%`,
                          height: `${box.height}%`
                        }}
                      >
                        <div className="absolute -top-5 left-0 px-1 py-0.5 rounded text-[9px] font-mono bg-black/80 text-amber-300 border border-amber-500/50 whitespace-nowrap">
                          {box.label} ({box.confidence}%)
                        </div>
                      </div>
                    ))}

                    {/* Visual Overlay Tag */}
                    <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg text-xs font-mono bg-black/75 backdrop-blur-md text-emerald-300 border border-emerald-900/80 flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5" />
                      <span>{diagnosticResult.detectedLesions.length} Lesion Clusters Mapped</span>
                    </div>
                  </div>

                  {/* Processing Telemetry */}
                  <div className="p-4 rounded-xl bg-black/35 border border-emerald-950 flex items-center justify-between text-xs font-mono text-emerald-300/80">
                    <div>
                      <span>ENGINE:</span>{' '}
                      <strong className="text-white">{diagnosticResult.aiEngineUsed}</strong>
                    </div>
                    <div>
                      <span>LATENCY:</span>{' '}
                      <strong className="text-emerald-400">{diagnosticResult.processingTimeMs}ms</strong>
                    </div>
                  </div>
                </div>

                {/* Right Column: Pathological Diagnosis & Treatment Protocols */}
                <div className="lg:col-span-7 flex flex-col gap-6 text-left">
                  {/* Diagnosis Headline Lockup */}
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
                        <span>IDENTIFIED PATHOLOGY</span>
                        <span aria-hidden="true">·</span>
                        <span className="uppercase">{diagnosticResult.pathogenType}</span>
                        <span aria-hidden="true">·</span>
                        <span>{diagnosticResult.analysisTimestamp}</span>
                      </div>
                      <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                        {diagnosticResult.diseaseName}
                      </h3>
                      <div className="text-xs sm:text-sm text-emerald-300/80 italic font-serif mt-0.5">
                        {diagnosticResult.scientificName}
                      </div>
                    </div>

                    {/* Key Confidence & Severity Badges */}
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-[11px] font-mono text-emerald-400/80">AI CONFIDENCE</div>
                        <div className="font-mono text-2xl font-black text-emerald-400">
                          {diagnosticResult.confidence}%
                        </div>
                      </div>

                      <div className="h-8 w-px bg-emerald-900/60" />

                      <div className="text-right">
                        <div className="text-[11px] font-mono text-emerald-400/80">SEVERITY</div>
                        <div
                          className={`font-mono text-base font-bold uppercase ${
                            diagnosticResult.severity === 'Severe'
                              ? 'text-rose-400'
                              : diagnosticResult.severity === 'Moderate'
                              ? 'text-amber-400'
                              : 'text-emerald-400'
                          }`}
                        >
                          {diagnosticResult.severity}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Summary Callout */}
                  <div className="p-4 rounded-xl bg-black/40 border border-emerald-900/40 text-sm text-emerald-100/90 leading-relaxed">
                    {diagnosticResult.summary}
                  </div>

                  {/* Observations */}
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-2">
                      Key Vision Observations
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-emerald-200/80">
                      {diagnosticResult.keyObservations.map((obs, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 p-2.5 rounded-lg bg-black/25 border border-emerald-950"
                        >
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{obs}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Treatment & Care Plan Tabs */}
                  <div className="p-5 rounded-2xl bg-black/50 border border-emerald-900/40">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Recommended Agronomic Interventions</span>
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      {/* Organic Solutions */}
                      <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-800/40">
                        <div className="font-semibold text-emerald-300 mb-2 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          <span>Organic / Biological</span>
                        </div>
                        <ul className="space-y-1.5 text-emerald-200/80 list-disc list-inside">
                          {diagnosticResult.treatment.organic.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Chemical / Commercial */}
                      <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-900/40">
                        <div className="font-semibold text-amber-300 mb-2 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                          <span>Chemical &amp; Active Ingredients</span>
                        </div>
                        <ul className="space-y-1.5 text-amber-200/80 list-disc list-inside">
                          {diagnosticResult.treatment.chemical.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Cultural Practices */}
                      <div className="p-3.5 rounded-xl bg-black/40 border border-emerald-950">
                        <div className="font-semibold text-emerald-300 mb-2 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          <span>Horticultural &amp; Pruning</span>
                        </div>
                        <ul className="space-y-1.5 text-emerald-200/70 list-disc list-inside">
                          {diagnosticResult.treatment.cultural.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Prevention */}
                      <div className="p-3.5 rounded-xl bg-black/40 border border-emerald-950">
                        <div className="font-semibold text-emerald-300 mb-2 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          <span>Long-term Prevention</span>
                        </div>
                        <ul className="space-y-1.5 text-emerald-200/70 list-disc list-inside">
                          {diagnosticResult.treatment.prevention.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Actions Strip */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={handlePrint}
                        className="px-4 py-2 text-xs font-semibold text-emerald-200 hover:text-white bg-black/40 border border-emerald-800/60 rounded-xl transition-all flex items-center gap-2"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Print / Export Agronomic Report</span>
                      </button>

                      <button
                        onClick={() => {
                          if (selectedImageUri) {
                            runDiagnostic(selectedImageUri, diagnosticResult.sourceType);
                          }
                        }}
                        className="px-4 py-2 text-xs font-medium text-emerald-300/80 hover:text-white bg-black/20 border border-emerald-900/40 rounded-xl transition-all flex items-center gap-2"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Re-Analyze Specimen</span>
                      </button>
                    </div>

                    <a
                      href="#care-library"
                      className="text-xs font-mono text-emerald-400 hover:underline flex items-center gap-1"
                    >
                      <span>Explore Disease Encyclopedia</span>
                      <span aria-hidden="true">→</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
