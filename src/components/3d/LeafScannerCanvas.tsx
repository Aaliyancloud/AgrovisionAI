import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

export type LeafConditionMode = 'healthy' | 'early_blight' | 'late_blight' | 'septoria' | 'yellow_curl';

interface LeafScannerCanvasProps {
  initialCondition?: LeafConditionMode;
  isScanningActive?: boolean;
}

export const LeafScannerCanvas: React.FC<LeafScannerCanvasProps> = ({
  initialCondition = 'early_blight',
  isScanningActive = true
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [condition, setCondition] = useState<LeafConditionMode>(initialCondition);
  const [showWireframe, setShowWireframe] = useState(false);
  const [laserActive, setLaserActive] = useState(isScanningActive);

  // Synchronize initial condition changes if prop updates
  useEffect(() => {
    setCondition(initialCondition);
  }, [initialCondition]);

  // Texture and shader material refs
  const stateRef = useRef({
    condition: initialCondition,
    showWireframe: false,
    laserActive: true,
    isDragging: false,
    startX: 0,
    startY: 0,
    rotX: 0.2,
    rotY: 0,
    targetRotX: 0.2,
    targetRotY: 0
  });

  useEffect(() => {
    stateRef.current.condition = condition;
  }, [condition]);

  useEffect(() => {
    stateRef.current.showWireframe = showWireframe;
  }, [showWireframe]);

  useEffect(() => {
    stateRef.current.laserActive = laserActive;
  }, [laserActive]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 500;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 30);
    camera.position.set(0, 0, 3.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    container.appendChild(renderer.domElement);

    // Studio Environment
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // Studio Lighting
    const hemiLight = new THREE.HemisphereLight('#ecfdf5', '#064e3b', 1.4);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight('#ffffff', 2.0);
    dirLight.position.set(2, 4, 3);
    scene.add(dirLight);

    const backLight = new THREE.DirectionalLight('#10b981', 1.0);
    backLight.position.set(-2, -1, -2);
    scene.add(backLight);

    // Root model group
    const leafContainer = new THREE.Group();
    scene.add(leafContainer);

    // Procedural Leaf Geometry
    const shape = new THREE.Shape();
    // Build serrated tomato leaf outline
    shape.moveTo(0, -1.2);
    shape.bezierCurveTo(0.15, -1.0, 0.35, -0.6, 0.45, -0.2);
    // Serration teeth
    shape.lineTo(0.38, 0.0);
    shape.lineTo(0.55, 0.25);
    shape.lineTo(0.42, 0.45);
    shape.lineTo(0.5, 0.7);
    shape.lineTo(0.3, 0.88);
    shape.bezierCurveTo(0.18, 1.1, 0.08, 1.3, 0, 1.45); // Apex
    shape.bezierCurveTo(-0.08, 1.3, -0.18, 1.1, -0.3, 0.88);
    shape.lineTo(-0.5, 0.7);
    shape.lineTo(-0.42, 0.45);
    shape.lineTo(-0.55, 0.25);
    shape.lineTo(-0.38, 0.0);
    shape.bezierCurveTo(-0.45, -0.2, -0.35, -0.6, -0.15, -1.0);
    shape.lineTo(0, -1.2);

    const leafGeo = new THREE.ShapeGeometry(shape, 24);
    // Add realistic natural concavity and midrib ridge
    const posAttr = leafGeo.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i);
      const y = posAttr.getY(i);
      const distFromCenter = Math.abs(x);
      // Main central vein depression and natural lateral curling
      const zCurv = -Math.sin((y + 1.2) / 2.6 * Math.PI) * 0.18 + Math.pow(distFromCenter, 1.5) * 0.22;
      posAttr.setZ(i, zCurv);
    }
    leafGeo.computeVertexNormals();

    // Procedural Leaf Textures (Canvas 2D Texture generation for high resolution and zero 404s)
    const createLeafTexture = (mode: LeafConditionMode) => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d')!;

      // Base leaf green gradient
      const grad = ctx.createLinearGradient(0, 0, 0, 512);
      if (mode === 'healthy') {
        grad.addColorStop(0, '#168039');
        grad.addColorStop(0.5, '#137533');
        grad.addColorStop(1, '#0e5e27');
      } else if (mode === 'early_blight') {
        grad.addColorStop(0, '#157e38');
        grad.addColorStop(0.5, '#206b35');
        grad.addColorStop(1, '#2a6130');
      } else if (mode === 'late_blight') {
        grad.addColorStop(0, '#1b5a2e');
        grad.addColorStop(0.5, '#1e3f26');
        grad.addColorStop(1, '#112918');
      } else if (mode === 'yellow_curl') {
        grad.addColorStop(0, '#85a318');
        grad.addColorStop(0.5, '#c2b812');
        grad.addColorStop(1, '#a18b10');
      } else if (mode === 'septoria') {
        grad.addColorStop(0, '#1b7436');
        grad.addColorStop(0.5, '#226938');
        grad.addColorStop(1, '#19542a');
      }
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 512, 512);

      // Draw branching leaf veins
      ctx.strokeStyle = mode === 'yellow_curl' ? '#788c0a' : '#2bd96b';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(256, 500);
      ctx.quadraticCurveTo(256, 256, 256, 30);
      ctx.stroke();

      // Lateral secondary veins
      ctx.lineWidth = 2;
      for (let v = 100; v <= 440; v += 45) {
        ctx.beginPath();
        ctx.moveTo(256, v);
        ctx.quadraticCurveTo(340, v - 30, 430, v - 50);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(256, v);
        ctx.quadraticCurveTo(172, v - 30, 82, v - 50);
        ctx.stroke();
      }

      // Disease-Specific Pathological Markings
      if (mode === 'early_blight') {
        // Concentric target ring spots
        const spots = [
          { x: 320, y: 220, r: 48 },
          { x: 200, y: 310, r: 38 },
          { x: 330, y: 380, r: 32 }
        ];

        spots.forEach((sp) => {
          // Yellow chlorotic outer halo
          ctx.beginPath();
          ctx.arc(sp.x, sp.y, sp.r * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(234, 179, 8, 0.75)';
          ctx.fill();

          // Dark brown concentric necrotic rings
          for (let step = sp.r; step >= 8; step -= 7) {
            ctx.beginPath();
            ctx.arc(sp.x, sp.y, step, 0, Math.PI * 2);
            ctx.fillStyle = (step % 14 === 0) ? '#38200d' : '#573315';
            ctx.fill();
            ctx.strokeStyle = '#241407';
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }
        });
      } else if (mode === 'late_blight') {
        // Water-soaked olive-black large irregular blotches
        ctx.fillStyle = 'rgba(26, 36, 24, 0.88)';
        ctx.beginPath();
        ctx.ellipse(340, 180, 75, 55, 0.4, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.ellipse(170, 330, 95, 60, -0.3, 0, Math.PI * 2);
        ctx.fill();

        // White mildew fungal sporulation fringe
        ctx.strokeStyle = 'rgba(226, 232, 240, 0.65)';
        ctx.lineWidth = 3;
        ctx.stroke();
      } else if (mode === 'septoria') {
        // Many tiny circular spots with ash-gray centers
        const smallSpots = [
          { x: 220, y: 160 }, { x: 300, y: 190 }, { x: 260, y: 240 },
          { x: 190, y: 280 }, { x: 340, y: 300 }, { x: 280, y: 360 },
          { x: 210, y: 390 }, { x: 330, y: 410 }, { x: 250, y: 440 }
        ];

        smallSpots.forEach((p) => {
          // Dark margin
          ctx.beginPath();
          ctx.arc(p.x, p.y, 11, 0, Math.PI * 2);
          ctx.fillStyle = '#261309';
          ctx.fill();

          // Sunken ash gray center
          ctx.beginPath();
          ctx.arc(p.x, p.y, 7, 0, Math.PI * 2);
          ctx.fillStyle = '#a8a29e';
          ctx.fill();

          // Black pycnidia dot
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = '#0a0a0a';
          ctx.fill();
        });
      }

      const tex = new THREE.CanvasTexture(canvas);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
      return tex;
    };

    const leafMaterial = new THREE.MeshStandardMaterial({
      map: createLeafTexture(condition),
      roughness: 0.42,
      metalness: 0.08,
      side: THREE.DoubleSide
    });

    const leafMesh = new THREE.Mesh(leafGeo, leafMaterial);
    leafContainer.add(leafMesh);

    // Midrib Stem Stalk
    const stalkGeo = new THREE.CylinderGeometry(0.02, 0.035, 1.0, 12);
    const stalkMat = new THREE.MeshStandardMaterial({
      color: 0x1b542c,
      roughness: 0.5,
      metalness: 0.05
    });
    const stalkMesh = new THREE.Mesh(stalkGeo, stalkMat);
    stalkMesh.position.set(0, -1.3, -0.05);
    stalkMesh.rotation.x = -0.15;
    leafContainer.add(stalkMesh);

    // Animated 3D Laser Scanning Plane & Line
    const laserGroup = new THREE.Group();
    scene.add(laserGroup);

    // Glowing Laser Line
    const laserLineGeo = new THREE.CylinderGeometry(0.008, 0.008, 2.2, 8);
    const laserLineMat = new THREE.MeshBasicMaterial({
      color: 0x10b981
    });
    const laserLine = new THREE.Mesh(laserLineGeo, laserLineMat);
    laserLine.rotation.z = Math.PI / 2;
    laserGroup.add(laserLine);

    // Translucent Laser Fan Plane
    const fanGeo = new THREE.PlaneGeometry(2.2, 0.6);
    const fanMat = new THREE.MeshBasicMaterial({
      color: 0x34d399,
      transparent: true,
      opacity: 0.22,
      side: THREE.DoubleSide,
      depthWrite: false
    });
    const fanMesh = new THREE.Mesh(fanGeo, fanMat);
    fanMesh.position.y = -0.3;
    laserGroup.add(fanMesh);

    // Laser coordinate target brackets
    const targetBracketGeo = new THREE.RingGeometry(0.08, 0.095, 16);
    const targetBracketMat = new THREE.MeshBasicMaterial({
      color: 0x6ee7b7,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85
    });
    const targetReticle = new THREE.Mesh(targetBracketGeo, targetBracketMat);
    targetReticle.position.set(0.3, 0, 0.1);
    laserGroup.add(targetReticle);

    // Update material texture when condition prop changes
    const updateTextureForCondition = (mode: LeafConditionMode) => {
      leafMaterial.map?.dispose();
      leafMaterial.map = createLeafTexture(mode);
      leafMaterial.needsUpdate = true;
    };

    // Pointer Drag Rotation
    const handleMouseDown = (e: MouseEvent) => {
      stateRef.current.isDragging = true;
      stateRef.current.startX = e.clientX;
      stateRef.current.startY = e.clientY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!stateRef.current.isDragging) return;
      const dx = e.clientX - stateRef.current.startX;
      const dy = e.clientY - stateRef.current.startY;
      stateRef.current.targetRotY += dx * 0.008;
      stateRef.current.targetRotX += dy * 0.008;
      stateRef.current.startX = e.clientX;
      stateRef.current.startY = e.clientY;
    };

    const handleMouseUp = () => {
      stateRef.current.isDragging = false;
    };

    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Check for condition updates
      if (stateRef.current.condition !== condition) {
        updateTextureForCondition(stateRef.current.condition);
      }

      // Check wireframe toggle
      leafMaterial.wireframe = stateRef.current.showWireframe;

      // Laser scanning vertical sweep
      if (stateRef.current.laserActive) {
        laserGroup.visible = true;
        const scanY = Math.sin(time * 2.0) * 1.05;
        laserGroup.position.set(0, scanY, 0.08);

        // Reticle movement
        targetReticle.position.x = Math.sin(time * 3.5) * 0.45;
        targetReticle.rotation.z += 0.04;
      } else {
        laserGroup.visible = false;
      }

      // Smooth leaf container rotation damping
      if (!stateRef.current.isDragging) {
        stateRef.current.targetRotY += 0.15 * delta;
      }

      stateRef.current.rotX = THREE.MathUtils.damp(stateRef.current.rotX, stateRef.current.targetRotX, 8, delta);
      stateRef.current.rotY = THREE.MathUtils.damp(stateRef.current.rotY, stateRef.current.targetRotY, 8, delta);

      leafContainer.rotation.x = stateRef.current.rotX;
      leafContainer.rotation.y = stateRef.current.rotY;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      renderer.dispose();
      leafMaterial.map?.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[460px] flex flex-col justify-between">
      {/* 3D Canvas Mount Point */}
      <div
        ref={mountRef}
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing select-none"
        title="Drag to examine leaf in 3D"
      />

      {/* Top Telemetry Overlay */}
      <div className="relative z-10 p-4 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-lg border border-emerald-900/40 text-xs">
          <span className="text-emerald-400 font-mono">SPECIMEN INSPECTOR 3D</span>
          <span className="text-emerald-700">·</span>
          <span className="text-emerald-300 font-semibold uppercase">{condition.replace('_', ' ')}</span>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400/80 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-lg border border-emerald-900/40">
          <span>LASER BEAM:</span>
          <span className={laserActive ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
            {laserActive ? 'ACTIVE [532nm]' : 'OFF'}
          </span>
        </div>
      </div>

      {/* Bottom Controls Dock */}
      <div className="relative z-10 mx-auto mb-4 px-4 py-2.5 bg-[#07150f]/90 backdrop-blur-md border border-emerald-900/50 rounded-xl shadow-xl flex flex-wrap items-center justify-center gap-3 text-xs max-w-[94%]">
        {/* Condition Selector */}
        <div className="flex items-center gap-1 bg-black/40 p-1 rounded-lg">
          <button
            onClick={() => setCondition('healthy')}
            className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap ${
              condition === 'healthy' ? 'bg-emerald-600 text-white font-medium' : 'text-emerald-300 hover:text-white'
            }`}
          >
            Healthy
          </button>
          <button
            onClick={() => setCondition('early_blight')}
            className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap ${
              condition === 'early_blight' ? 'bg-amber-600 text-white font-medium' : 'text-emerald-300 hover:text-white'
            }`}
          >
            Early Blight
          </button>
          <button
            onClick={() => setCondition('late_blight')}
            className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap ${
              condition === 'late_blight' ? 'bg-rose-700 text-white font-medium' : 'text-emerald-300 hover:text-white'
            }`}
          >
            Late Blight
          </button>
          <button
            onClick={() => setCondition('septoria')}
            className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap ${
              condition === 'septoria' ? 'bg-amber-700 text-white font-medium' : 'text-emerald-300 hover:text-white'
            }`}
          >
            Septoria
          </button>
          <button
            onClick={() => setCondition('yellow_curl')}
            className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap ${
              condition === 'yellow_curl' ? 'bg-yellow-600 text-white font-medium' : 'text-emerald-300 hover:text-white'
            }`}
          >
            Yellow Curl
          </button>
        </div>

        <div className="h-4 w-px bg-emerald-800/60 hidden sm:block" />

        {/* Laser & Wireframe Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setLaserActive(!laserActive)}
            className={`px-2.5 py-1 rounded border transition-colors whitespace-nowrap ${
              laserActive
                ? 'bg-emerald-950/70 border-emerald-600 text-emerald-200'
                : 'bg-black/30 border-emerald-900/40 text-emerald-400/60'
            }`}
          >
            {laserActive ? 'Stop Scanner' : 'Start Laser'}
          </button>

          <button
            onClick={() => setShowWireframe(!showWireframe)}
            className={`px-2.5 py-1 rounded border transition-colors whitespace-nowrap ${
              showWireframe
                ? 'bg-emerald-950/70 border-emerald-600 text-emerald-200'
                : 'bg-black/30 border-emerald-900/40 text-emerald-400/60'
            }`}
          >
            {showWireframe ? 'Mesh: Wireframe' : 'Mesh: Solid'}
          </button>
        </div>
      </div>
    </div>
  );
};
