import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroCore3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const width = container.clientWidth || 380;
    const height = container.clientHeight || 380;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 5.2;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group to hold all rotating elements
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // 1. Outer Geodesic Wireframe Sphere (Electric Cyan)
    const outerGeo = new THREE.IcosahedronGeometry(1.6, 2);
    const outerWireframe = new THREE.WireframeGeometry(outerGeo);
    const outerMat = new THREE.LineBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.45,
    });
    const outerMesh = new THREE.LineSegments(outerWireframe, outerMat);
    coreGroup.add(outerMesh);

    // 2. Outer Vertices Glowing Nodes
    const verticesCount = outerGeo.attributes.position.count;
    const outerPointsGeo = new THREE.BufferGeometry();
    outerPointsGeo.setAttribute('position', outerGeo.attributes.position);
    const pointsMat = new THREE.PointsMaterial({
      color: 0x7df4ff,
      size: 0.06,
      transparent: true,
      opacity: 0.8,
    });
    const outerPoints = new THREE.Points(outerPointsGeo, pointsMat);
    coreGroup.add(outerPoints);

    // 3. Middle Concentric Polyhedron (Neon Violet)
    const midGeo = new THREE.OctahedronGeometry(1.05, 1);
    const midWireframe = new THREE.WireframeGeometry(midGeo);
    const midMat = new THREE.LineBasicMaterial({
      color: 0xa78bfa,
      transparent: true,
      opacity: 0.55,
    });
    const midMesh = new THREE.LineSegments(midWireframe, midMat);
    coreGroup.add(midMesh);

    // 4. Inner Luminous Core
    const innerGeo = new THREE.SphereGeometry(0.55, 16, 16);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerMesh);

    // 5. Orbiting Electron Rings
    const ringGeo = new THREE.TorusGeometry(2.1, 0.015, 8, 80);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.3,
    });
    const ring1 = new THREE.Mesh(ringGeo, ringMat);
    ring1.rotation.x = Math.PI / 3;
    coreGroup.add(ring1);

    const ring2 = new THREE.Mesh(ringGeo, new THREE.MeshBasicMaterial({
      color: 0xa78bfa,
      transparent: true,
      opacity: 0.25,
    }));
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.y = Math.PI / 6;
    coreGroup.add(ring2);

    // 6. Orbiting Particle Swarm
    const particleCount = 120;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const radius = 1.9 + Math.random() * 0.7;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);
    }
    const swarmGeo = new THREE.BufferGeometry();
    swarmGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const swarmMat = new THREE.PointsMaterial({
      color: 0x00f0ff,
      size: 0.04,
      transparent: true,
      opacity: 0.6,
    });
    const swarm = new THREE.Points(swarmGeo, swarmMat);
    coreGroup.add(swarm);

    // Mouse reactivity
    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;

    const handlePointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetRotationY = x * 1.2;
      targetRotationX = y * 1.2;
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Pause when out of view
    let isVisible = true;
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    observer.observe(container);

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Animation loop
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsedTime = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        // Continuous rotation
        outerMesh.rotation.y = elapsedTime * 0.15;
        outerMesh.rotation.x = elapsedTime * 0.08;
        outerPoints.rotation.y = elapsedTime * 0.15;
        outerPoints.rotation.x = elapsedTime * 0.08;

        midMesh.rotation.y = -elapsedTime * 0.22;
        midMesh.rotation.z = elapsedTime * 0.12;

        innerMesh.rotation.x = elapsedTime * 0.3;
        innerMesh.rotation.y = elapsedTime * 0.2;

        ring1.rotation.z = elapsedTime * 0.18;
        ring2.rotation.z = -elapsedTime * 0.14;

        swarm.rotation.y = elapsedTime * 0.08;

        // Pulse inner core size
        const scale = 1 + Math.sin(elapsedTime * 2.5) * 0.06;
        innerMesh.scale.set(scale, scale, scale);
      }

      // Smooth mouse parallax easing
      currentRotationX += (targetRotationX - currentRotationX) * 0.06;
      currentRotationY += (targetRotationY - currentRotationY) * 0.06;

      coreGroup.rotation.x = currentRotationX;
      coreGroup.rotation.y = currentRotationY;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();

      // Dispose resources
      outerGeo.dispose();
      outerWireframe.dispose();
      outerMat.dispose();
      outerPointsGeo.dispose();
      pointsMat.dispose();
      midGeo.dispose();
      midWireframe.dispose();
      midMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      swarmGeo.dispose();
      swarmMat.dispose();
      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[320px] sm:h-[380px] md:h-[440px] flex items-center justify-center">
      {/* Decorative HUD Target Brackets & Ring Overlays */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-56 h-56 sm:w-72 sm:h-72 rounded-full border border-primary/20 border-dashed animate-spin-slow" />
        <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full border border-secondary/15" />
        <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-primary/20 to-transparent" />
      </div>

      {/* Telemetry Corner Badges */}
      <div className="absolute top-2 left-2 z-10 px-2 py-1 rounded bg-obsidian-card/85 border border-primary/30 backdrop-blur-md flex items-center gap-1.5 font-label-telemetry text-[10px] text-primary">
        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
        <span>CORE_SIM: THREE.JS // WEBGL</span>
      </div>

      <div className="absolute top-2 right-2 z-10 px-2 py-0.5 rounded bg-obsidian-card/85 border border-amber-warn/50 backdrop-blur-md font-label-telemetry text-[9px] text-amber-bright">
        GEO: 23.18° N // 79.98° E
      </div>

      <div className="absolute bottom-2 left-2 right-2 z-10 flex items-center justify-between px-2.5 py-1 rounded bg-obsidian-card/85 border border-outline/50 backdrop-blur-md font-label-telemetry text-[9px] text-on-surface-variant">
        <span>ROT_DYNAMICS: ACTIVE</span>
        <span className="text-primary font-semibold">INTERACTIVE ENERGY CORE</span>
      </div>

      {/* Three.js Mount Container */}
      <div ref={mountRef} className="w-full h-full relative cursor-grab active:cursor-grabbing" />
    </div>
  );
}
