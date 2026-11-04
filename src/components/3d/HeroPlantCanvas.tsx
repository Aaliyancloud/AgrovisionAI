import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

interface HeroPlantCanvasProps {
  onScanClick?: () => void;
}

export const HeroPlantCanvas: React.FC<HeroPlantCanvasProps> = ({ onScanClick }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isRotating, setIsRotating] = useState(true);
  const [breezeEnabled, setBreezeEnabled] = useState(true);
  const [activeView, setActiveView] = useState<'full' | 'foliage' | 'fruit'>('full');

  // Mutable animation state references
  const stateRef = useRef({
    isRotating: true,
    breezeEnabled: true,
    targetCamPos: new THREE.Vector3(0, 1.8, 4.6),
    targetLookAt: new THREE.Vector3(0, 1.3, 0),
    mouseX: 0,
    mouseY: 0,
    isDragging: false,
    dragStartX: 0,
    plantRotationY: 0.2,
    targetRotationY: 0.2
  });

  useEffect(() => {
    stateRef.current.isRotating = isRotating;
  }, [isRotating]);

  useEffect(() => {
    stateRef.current.breezeEnabled = breezeEnabled;
  }, [breezeEnabled]);

  useEffect(() => {
    if (activeView === 'full') {
      stateRef.current.targetCamPos.set(0, 1.7, 4.4);
      stateRef.current.targetLookAt.set(0, 1.2, 0);
    } else if (activeView === 'foliage') {
      stateRef.current.targetCamPos.set(-0.8, 1.9, 2.7);
      stateRef.current.targetLookAt.set(-0.3, 1.7, 0);
    } else if (activeView === 'fruit') {
      stateRef.current.targetCamPos.set(0.7, 1.2, 2.4);
      stateRef.current.targetLookAt.set(0.3, 1.1, 0);
    }
  }, [activeView]);

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

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // Scene & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2('#040907', 0.08);

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 50);
    camera.position.set(0, 1.8, 4.6);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // Studio Environment map
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // Lighting
    const hemiLight = new THREE.HemisphereLight('#bbf7d0', '#064e3b', 1.2);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight('#ffffff', 2.2);
    keyLight.position.set(3.5, 5, 3.5);
    keyLight.castShadow = !isSoftwareGl;
    if (keyLight.castShadow) {
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.camera.near = 0.5;
      keyLight.shadow.camera.far = 12;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.normalBias = 0.02;
    }
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight('#34d399', 0.9);
    fillLight.position.set(-3, 2, -2);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight('#f43f5e', 0.6);
    rimLight.position.set(0, 3, -4);
    scene.add(rimLight);

    // Ground Contact Shadow
    const shadowGeo = new THREE.PlaneGeometry(3.6, 3.6);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.45,
      depthWrite: false
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = 0.02;
    scene.add(shadowMesh);

    // Plant Root / Pot / Soil base
    const plantGroup = new THREE.Group();
    scene.add(plantGroup);

    // Ceramic High-Tech Planter
    const potGeo = new THREE.CylinderGeometry(0.7, 0.5, 0.7, 32);
    const potMat = new THREE.MeshStandardMaterial({
      color: 0x0f1c16,
      roughness: 0.35,
      metalness: 0.4
    });
    const potMesh = new THREE.Mesh(potGeo, potMat);
    potMesh.position.y = 0.35;
    potMesh.receiveShadow = !isSoftwareGl;
    plantGroup.add(potMesh);

    // Dark organic rich soil
    const soilGeo = new THREE.CylinderGeometry(0.68, 0.68, 0.08, 32);
    const soilMat = new THREE.MeshStandardMaterial({
      color: 0x18120c,
      roughness: 0.9,
      metalness: 0.05
    });
    const soilMesh = new THREE.Mesh(soilGeo, soilMat);
    soilMesh.position.y = 0.7;
    plantGroup.add(soilMesh);

    // Tomato Plant Stem & Branches
    const stemCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0.7, 0),
      new THREE.Vector3(0.04, 1.1, 0.02),
      new THREE.Vector3(-0.05, 1.5, -0.02),
      new THREE.Vector3(0.03, 1.9, 0.04),
      new THREE.Vector3(0, 2.3, 0)
    ]);
    const stemGeo = new THREE.TubeGeometry(stemCurve, 32, 0.045, 12, false);
    const stemMat = new THREE.MeshStandardMaterial({
      color: 0x2e6b3e,
      roughness: 0.5,
      metalness: 0.1
    });
    const mainStemMesh = new THREE.Mesh(stemGeo, stemMat);
    mainStemMesh.castShadow = !isSoftwareGl;
    plantGroup.add(mainStemMesh);

    // Leaves Creation Helper (Procedural Tomato Leaflet)
    const createLeafShape = () => {
      const shape = new THREE.Shape();
      shape.moveTo(0, 0);
      shape.bezierCurveTo(0.12, 0.1, 0.22, 0.3, 0.18, 0.55);
      shape.bezierCurveTo(0.14, 0.7, 0.06, 0.9, 0, 1.05);
      shape.bezierCurveTo(-0.06, 0.9, -0.14, 0.7, -0.18, 0.55);
      shape.bezierCurveTo(-0.22, 0.3, -0.12, 0.1, 0, 0);
      return shape;
    };

    const leafShape = createLeafShape();
    const leafGeo = new THREE.ShapeGeometry(leafShape, 12);
    // Add subtle curvature to leaf geometry
    const pos = leafGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      const x = pos.getX(i);
      // Gentle natural curl
      pos.setZ(i, -Math.sin(y * Math.PI) * 0.08 + (Math.abs(x) * 0.05));
    }
    leafGeo.computeVertexNormals();

    const leafMat = new THREE.MeshStandardMaterial({
      color: 0x1ca358,
      roughness: 0.38,
      metalness: 0.08,
      side: THREE.DoubleSide
    });

    const leafGroupList: THREE.Group[] = [];

    // Compound Leaf Generator (Main terminal leaflet + 4 lateral leaflets)
    const createCompoundLeaf = (scale = 1.0) => {
      const group = new THREE.Group();

      // Petiole stalk
      const petioleGeo = new THREE.CylinderGeometry(0.012, 0.02, 0.55, 8);
      const petioleMesh = new THREE.Mesh(petioleGeo, stemMat);
      petioleMesh.position.y = 0.25;
      petioleMesh.rotation.x = 0.15;
      group.add(petioleMesh);

      // Terminal apex leaflet
      const apexLeaf = new THREE.Mesh(leafGeo, leafMat);
      apexLeaf.scale.set(0.65 * scale, 0.75 * scale, 0.65 * scale);
      apexLeaf.position.set(0, 0.5, 0.05);
      apexLeaf.rotation.x = 0.3;
      apexLeaf.castShadow = !isSoftwareGl;
      group.add(apexLeaf);

      // Left lateral leaflet 1
      const leftLeaf1 = new THREE.Mesh(leafGeo, leafMat);
      leftLeaf1.scale.set(0.48 * scale, 0.58 * scale, 0.48 * scale);
      leftLeaf1.position.set(-0.16, 0.32, 0.03);
      leftLeaf1.rotation.set(0.2, 0.4, 0.7);
      group.add(leftLeaf1);

      // Right lateral leaflet 1
      const rightLeaf1 = new THREE.Mesh(leafGeo, leafMat);
      rightLeaf1.scale.set(0.48 * scale, 0.58 * scale, 0.48 * scale);
      rightLeaf1.position.set(0.16, 0.32, 0.03);
      rightLeaf1.rotation.set(0.2, -0.4, -0.7);
      group.add(rightLeaf1);

      // Left lateral leaflet 2
      const leftLeaf2 = new THREE.Mesh(leafGeo, leafMat);
      leftLeaf2.scale.set(0.38 * scale, 0.48 * scale, 0.38 * scale);
      leftLeaf2.position.set(-0.14, 0.18, 0.02);
      leftLeaf2.rotation.set(0.15, 0.3, 0.85);
      group.add(leftLeaf2);

      // Right lateral leaflet 2
      const rightLeaf2 = new THREE.Mesh(leafGeo, leafMat);
      rightLeaf2.scale.set(0.38 * scale, 0.48 * scale, 0.38 * scale);
      rightLeaf2.position.set(0.14, 0.18, 0.02);
      rightLeaf2.rotation.set(0.15, -0.3, -0.85);
      group.add(rightLeaf2);

      return group;
    };

    // Attach compound leaves at various heights and angles around stem
    const leafConfigs = [
      { y: 1.05, rotY: 0.3, rotX: 0.9, scale: 1.15 },
      { y: 1.25, rotY: 2.1, rotX: 0.85, scale: 1.1 },
      { y: 1.45, rotY: 4.2, rotX: 0.8, scale: 1.05 },
      { y: 1.68, rotY: 1.1, rotX: 0.75, scale: 0.95 },
      { y: 1.85, rotY: 3.3, rotX: 0.7, scale: 0.9 },
      { y: 2.05, rotY: 5.4, rotX: 0.65, scale: 0.82 },
      { y: 2.22, rotY: 1.8, rotX: 0.55, scale: 0.75 }
    ];

    leafConfigs.forEach((cfg) => {
      const leafCompound = createCompoundLeaf(cfg.scale);
      leafCompound.position.set(0, cfg.y, 0);
      leafCompound.rotation.y = cfg.rotY;
      leafCompound.rotation.x = cfg.rotX;
      plantGroup.add(leafCompound);
      leafGroupList.push(leafCompound);
    });

    // Tomato Fruit Clusters (Glossy Red & Orange PBR)
    const tomatoMatRed = new THREE.MeshPhysicalMaterial({
      color: 0xdd1c1a,
      roughness: 0.12,
      metalness: 0.05,
      clearcoat: 0.95,
      clearcoatRoughness: 0.1
    });

    const tomatoMatRipening = new THREE.MeshPhysicalMaterial({
      color: 0xf59e0b,
      roughness: 0.15,
      metalness: 0.05,
      clearcoat: 0.9,
      clearcoatRoughness: 0.12
    });

    const tomatoMatGreen = new THREE.MeshPhysicalMaterial({
      color: 0x4ade80,
      roughness: 0.22,
      metalness: 0.05,
      clearcoat: 0.75,
      clearcoatRoughness: 0.2
    });

    // Calyx (5-point green star sepals at top of tomato)
    const calyxMat = new THREE.MeshStandardMaterial({
      color: 0x1e7a3a,
      roughness: 0.45,
      metalness: 0.05,
      side: THREE.DoubleSide
    });

    const createTomatoFruit = (radius = 0.18, material = tomatoMatRed) => {
      const fruitGroup = new THREE.Group();

      // Slightly oblate sphere for natural tomato shape
      const sphereGeo = new THREE.SphereGeometry(radius, 24, 24);
      sphereGeo.scale(1.05, 0.92, 1.05);
      const tomatoMesh = new THREE.Mesh(sphereGeo, material);
      tomatoMesh.castShadow = !isSoftwareGl;
      fruitGroup.add(tomatoMesh);

      // Star Calyx sepals
      for (let s = 0; s < 5; s++) {
        const sepalAngle = (s / 5) * Math.PI * 2;
        const sepalGeo = new THREE.ConeGeometry(radius * 0.22, radius * 0.65, 4);
        const sepalMesh = new THREE.Mesh(sepalGeo, calyxMat);
        sepalMesh.position.set(
          Math.cos(sepalAngle) * radius * 0.35,
          radius * 0.88,
          Math.sin(sepalAngle) * radius * 0.35
        );
        sepalMesh.rotation.set(0.6, sepalAngle, 0);
        fruitGroup.add(sepalMesh);
      }

      // Little pedicel stem
      const pedicelGeo = new THREE.CylinderGeometry(0.01, 0.015, radius * 0.7, 8);
      const pedicelMesh = new THREE.Mesh(pedicelGeo, stemMat);
      pedicelMesh.position.y = radius * 1.15;
      pedicelMesh.rotation.z = 0.2;
      fruitGroup.add(pedicelMesh);

      return fruitGroup;
    };

    // Cluster 1 (Ripe Vine Cluster)
    const cluster1 = new THREE.Group();
    cluster1.position.set(0.28, 1.35, 0.15);

    const tomato1 = createTomatoFruit(0.2, tomatoMatRed);
    tomato1.position.set(0, 0, 0);
    cluster1.add(tomato1);

    const tomato2 = createTomatoFruit(0.16, tomatoMatRed);
    tomato2.position.set(-0.16, -0.06, 0.14);
    cluster1.add(tomato2);

    const tomato3 = createTomatoFruit(0.14, tomatoMatRipening);
    tomato3.position.set(0.14, 0.08, 0.12);
    cluster1.add(tomato3);

    plantGroup.add(cluster1);

    // Cluster 2 (Upper Developing Cluster)
    const cluster2 = new THREE.Group();
    cluster2.position.set(-0.25, 1.72, -0.1);

    const tomatoGreen1 = createTomatoFruit(0.13, tomatoMatGreen);
    tomatoGreen1.position.set(0, 0, 0);
    cluster2.add(tomatoGreen1);

    const tomatoGreen2 = createTomatoFruit(0.11, tomatoMatRipening);
    tomatoGreen2.position.set(0.12, -0.05, -0.1);
    cluster2.add(tomatoGreen2);

    plantGroup.add(cluster2);

    // Delicate Yellow Tomato Flowers
    const flowerMat = new THREE.MeshStandardMaterial({
      color: 0xfacc15,
      roughness: 0.3,
      metalness: 0.1,
      side: THREE.DoubleSide
    });

    const createFlower = () => {
      const flGroup = new THREE.Group();
      for (let p = 0; p < 5; p++) {
        const petalAngle = (p / 5) * Math.PI * 2;
        const petalGeo = new THREE.ConeGeometry(0.03, 0.09, 3);
        const petalMesh = new THREE.Mesh(petalGeo, flowerMat);
        petalMesh.position.set(Math.cos(petalAngle) * 0.04, 0, Math.sin(petalAngle) * 0.04);
        petalMesh.rotation.set(0.7, petalAngle, 0);
        flGroup.add(petalMesh);
      }
      return flGroup;
    };

    const flower1 = createFlower();
    flower1.position.set(0.15, 2.15, 0.12);
    flower1.rotation.set(-0.4, 0.5, 0);
    plantGroup.add(flower1);

    const flower2 = createFlower();
    flower2.position.set(-0.12, 2.22, 0.08);
    flower2.rotation.set(0.3, -0.8, 0);
    plantGroup.add(flower2);

    // Floating Botanical Particles (Micro-spores / pollen)
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 4.5;
      particlePositions[i * 3 + 1] = Math.random() * 3.2 + 0.2;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 4.5;
      particleSpeeds[i] = 0.2 + Math.random() * 0.4;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x6ee7b7,
      size: 0.035,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Pointer Interaction Handlers
    const handlePointerDown = (e: MouseEvent) => {
      stateRef.current.isDragging = true;
      stateRef.current.dragStartX = e.clientX;
    };

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      stateRef.current.mouseX = normX;
      stateRef.current.mouseY = normY;

      if (stateRef.current.isDragging) {
        const deltaX = e.clientX - stateRef.current.dragStartX;
        stateRef.current.targetRotationY += deltaX * 0.008;
        stateRef.current.dragStartX = e.clientX;
      }
    };

    const handlePointerUp = () => {
      stateRef.current.isDragging = false;
    };

    container.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Camera lerping
      camera.position.x = THREE.MathUtils.damp(camera.position.x, stateRef.current.targetCamPos.x + stateRef.current.mouseX * 0.35, 3.5, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, stateRef.current.targetCamPos.y + stateRef.current.mouseY * 0.25, 3.5, delta);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, stateRef.current.targetCamPos.z, 3.5, delta);
      camera.lookAt(stateRef.current.targetLookAt);

      // Auto rotation
      if (stateRef.current.isRotating && !stateRef.current.isDragging) {
        stateRef.current.targetRotationY += 0.22 * delta;
      }

      stateRef.current.plantRotationY = THREE.MathUtils.damp(
        stateRef.current.plantRotationY,
        stateRef.current.targetRotationY,
        6.0,
        delta
      );
      plantGroup.rotation.y = stateRef.current.plantRotationY;

      // Gentle breeze motion on leaves and clusters
      if (stateRef.current.breezeEnabled) {
        leafGroupList.forEach((leaf, idx) => {
          const sway = Math.sin(time * 2.2 + idx * 0.8) * 0.045;
          leaf.rotation.z = Math.sin(time * 1.6 + idx) * 0.035;
          leaf.rotation.x = leafConfigs[idx].rotX + sway;
        });

        // Gentle fruit cluster bob
        cluster1.rotation.z = Math.sin(time * 1.8) * 0.025;
        cluster2.rotation.z = Math.cos(time * 1.7) * 0.02;
      }

      // Particle floating drift
      const positions = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += particleSpeeds[i] * delta * 0.25;
        // Reset when reaching top
        if (positions[i * 3 + 1] > 3.6) {
          positions[i * 3 + 1] = 0.2;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    // Resize Observer
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
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[540px] lg:min-h-[640px] flex flex-col justify-end">
      {/* 3D Canvas Mount Point */}
      <div
        ref={mountRef}
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing select-none"
        title="Click and drag to rotate the 3D plant"
      />

      {/* Subtle Spec / Watermark in corner without blocking */}
      <div className="absolute top-4 right-4 z-10 pointer-events-none hidden sm:flex items-center gap-2 text-xs text-emerald-400/80 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg border border-emerald-900/40">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        <span>3D Solanum Lycopersicum PBR Model</span>
      </div>

      {/* Ergonomic Collapsible Bottom Dock (Following Three.js skill directive §5) */}
      <div className="relative z-10 mx-auto mb-6 px-4 py-2.5 bg-[#07150f]/85 backdrop-blur-md border border-emerald-900/50 rounded-xl shadow-2xl flex flex-wrap items-center justify-center gap-4 text-xs max-w-[92vw]">
        {/* Preset Camera Views */}
        <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-lg">
          <button
            onClick={() => setActiveView('full')}
            className={`px-3 py-1 rounded transition-colors whitespace-nowrap ${
              activeView === 'full'
                ? 'bg-emerald-600 text-white font-medium shadow-sm'
                : 'text-emerald-300 hover:text-white'
            }`}
          >
            Full Plant
          </button>
          <button
            onClick={() => setActiveView('foliage')}
            className={`px-3 py-1 rounded transition-colors whitespace-nowrap ${
              activeView === 'foliage'
                ? 'bg-emerald-600 text-white font-medium shadow-sm'
                : 'text-emerald-300 hover:text-white'
            }`}
          >
            Foliage Zone
          </button>
          <button
            onClick={() => setActiveView('fruit')}
            className={`px-3 py-1 rounded transition-colors whitespace-nowrap ${
              activeView === 'fruit'
                ? 'bg-emerald-600 text-white font-medium shadow-sm'
                : 'text-emerald-300 hover:text-white'
            }`}
          >
            Fruit Cluster
          </button>
        </div>

        <div className="h-4 w-px bg-emerald-800/60 hidden sm:block" />

        {/* Rotation & Breeze Toggles */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRotating(!isRotating)}
            className={`px-2.5 py-1 rounded border transition-colors whitespace-nowrap ${
              isRotating
                ? 'bg-emerald-950/60 border-emerald-700 text-emerald-200'
                : 'bg-black/30 border-emerald-900/40 text-emerald-400/60'
            }`}
          >
            {isRotating ? 'Pause Orbit' : 'Resume Orbit'}
          </button>

          <button
            onClick={() => setBreezeEnabled(!breezeEnabled)}
            className={`px-2.5 py-1 rounded border transition-colors whitespace-nowrap ${
              breezeEnabled
                ? 'bg-emerald-950/60 border-emerald-700 text-emerald-200'
                : 'bg-black/30 border-emerald-900/40 text-emerald-400/60'
            }`}
          >
            {breezeEnabled ? 'Wind: Gentle' : 'Wind: Still'}
          </button>
        </div>

        {onScanClick && (
          <div className="hidden md:block">
            <button
              onClick={onScanClick}
              className="px-3.5 py-1 bg-gradient-to-r from-emerald-500 to-emerald-600 text-black font-semibold rounded-lg hover:from-emerald-400 hover:to-emerald-500 transition-all shadow-md"
            >
              Analyze Leaf
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
