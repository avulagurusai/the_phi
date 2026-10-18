import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, RotateCw, Moon, Eye, Zap, Volume2, ShieldCheck, Heart, Sun } from 'lucide-react';
import { audio } from '@/utils/audio';

export type EyeGlowColor = 'amber' | 'cyan' | 'lavender' | 'emerald';
export type GlowIntensity = 'cozy' | 'radiant' | 'supernova';

export const PipThreeCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeAnimation, setActiveAnimation] = useState<'idle' | 'happy' | 'sleep' | 'sparkle'>('idle');
  const [capColor, setCapColor] = useState<'violet' | 'rose' | 'amber' | 'cyan'>('violet');
  const [eyeColor, setEyeColor] = useState<EyeGlowColor>('amber');
  const [glowIntensity, setGlowIntensity] = useState<GlowIntensity>('radiant');
  const [blinking, setBlinking] = useState(false);

  // References to 3D objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const pipGroupRef = useRef<THREE.Group | null>(null);
  const headGroupRef = useRef<THREE.Group | null>(null);

  // Eye Groups for Cursor Following
  const leftEyeGroupRef = useRef<THREE.Group | null>(null);
  const rightEyeGroupRef = useRef<THREE.Group | null>(null);
  const leftPupilRef = useRef<THREE.Mesh | null>(null);
  const rightPupilRef = useRef<THREE.Mesh | null>(null);
  const leftStarGlintRef = useRef<THREE.Mesh | null>(null);
  const rightStarGlintRef = useRef<THREE.Mesh | null>(null);
  const eyeLightRef = useRef<THREE.PointLight | null>(null);

  const capMeshRef = useRef<THREE.Mesh | null>(null);
  const starTipRef = useRef<THREE.Mesh | null>(null);
  const cloudGroupRef = useRef<THREE.Group | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);

  // Mouse tracking state
  const mousePos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const isDragging = useRef<boolean>(false);
  const prevMouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const rotationVelocity = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const eyeColorHex: Record<EyeGlowColor, number> = {
    amber: 0xf59e0b,
    cyan: 0x06b6d4,
    lavender: 0xa855f7,
    emerald: 0x10b981,
  };

  const intensityMultipliers: Record<GlowIntensity, number> = {
    cozy: 1.2,
    radiant: 2.2,
    supernova: 3.8,
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 460;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0.4, 4.2);

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // 3. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xfff8f1, 1.25);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.9);
    dirLight.position.set(3, 5, 4);
    scene.add(dirLight);

    const rimLight = new THREE.PointLight(0xa34063, 2.5, 10);
    rimLight.position.set(-3, 2, -2);
    scene.add(rimLight);

    // Emissive eye illumination point light
    const eyePointLight = new THREE.PointLight(eyeColorHex[eyeColor], 2.2, 5);
    eyePointLight.position.set(0, 0.2, 1.2);
    scene.add(eyePointLight);
    eyeLightRef.current = eyePointLight;

    // 4. Pip Character Model Hierarchy
    const pipGroup = new THREE.Group();
    scene.add(pipGroup);
    pipGroupRef.current = pipGroup;

    const headGroup = new THREE.Group();
    pipGroup.add(headGroup);
    headGroupRef.current = headGroup;

    // Head Material (Porcelain Bone Cream)
    const boneMaterial = new THREE.MeshStandardMaterial({
      color: 0xfdfaf5,
      roughness: 0.28,
      metalness: 0.05,
    });

    // Main Skull Cranium Sphere
    const craniumGeo = new THREE.SphereGeometry(0.95, 32, 32);
    const cranium = new THREE.Mesh(craniumGeo, boneMaterial);
    headGroup.add(cranium);

    // Jaw / Cheek Accent
    const jawGeo = new THREE.CylinderGeometry(0.65, 0.45, 0.45, 24);
    const jaw = new THREE.Mesh(jawGeo, boneMaterial);
    jaw.position.set(0, -0.65, 0.1);
    headGroup.add(jaw);

    // Cute Cheeks
    const cheekMat = new THREE.MeshStandardMaterial({
      color: 0xf4dce4,
      roughness: 0.4,
    });
    const leftCheek = new THREE.Mesh(new THREE.SphereGeometry(0.22, 16, 16), cheekMat);
    leftCheek.position.set(-0.65, -0.32, 0.68);
    headGroup.add(leftCheek);

    const rightCheek = leftCheek.clone();
    rightCheek.position.set(0.65, -0.32, 0.68);
    headGroup.add(rightCheek);

    // --- COOL SKULL EYE SOCKETS & CURSOR-TRACKING PUPILS ---
    // Deep carved eye socket cavities
    const socketMat = new THREE.MeshBasicMaterial({ color: 0x130e1c });
    const socketGeo = new THREE.CylinderGeometry(0.29, 0.26, 0.24, 28);
    socketGeo.rotateX(Math.PI / 2);

    const leftSocket = new THREE.Mesh(socketGeo, socketMat);
    leftSocket.position.set(-0.35, -0.05, 0.82);
    headGroup.add(leftSocket);

    const rightSocket = leftSocket.clone();
    rightSocket.position.set(0.35, -0.05, 0.82);
    headGroup.add(rightSocket);

    // Eye socket inner ring highlight (gives carved skull edge depth)
    const socketRimMat = new THREE.MeshStandardMaterial({
      color: 0x2d1f38,
      roughness: 0.6,
    });
    const rimGeo = new THREE.TorusGeometry(0.28, 0.035, 12, 28);
    const leftRim = new THREE.Mesh(rimGeo, socketRimMat);
    leftRim.position.set(-0.35, -0.05, 0.86);
    headGroup.add(leftRim);

    const rightRim = leftRim.clone();
    rightRim.position.set(0.35, -0.05, 0.86);
    headGroup.add(rightRim);

    // Eye Groups for Cursor Following
    const leftEyeGroup = new THREE.Group();
    leftEyeGroup.position.set(-0.35, -0.05, 0.88);
    headGroup.add(leftEyeGroup);
    leftEyeGroupRef.current = leftEyeGroup;

    const rightEyeGroup = new THREE.Group();
    rightEyeGroup.position.set(0.35, -0.05, 0.88);
    headGroup.add(rightEyeGroup);
    rightEyeGroupRef.current = rightEyeGroup;

    // Glowing Starlight Pupil Material
    const pupilMat = new THREE.MeshStandardMaterial({
      color: eyeColorHex[eyeColor],
      emissive: eyeColorHex[eyeColor],
      emissiveIntensity: intensityMultipliers[glowIntensity],
      roughness: 0.15,
      metalness: 0.1,
    });

    // Glowing Pupil Spheres
    const pupilGeo = new THREE.SphereGeometry(0.135, 24, 24);

    const leftPupil = new THREE.Mesh(pupilGeo, pupilMat);
    leftEyeGroup.add(leftPupil);
    leftPupilRef.current = leftPupil;

    const rightPupil = new THREE.Mesh(pupilGeo, pupilMat.clone());
    rightEyeGroup.add(rightPupil);
    rightPupilRef.current = rightPupil;

    // Cool 4-pointed Starlight Glint / Iris inside each pupil!
    const glintMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.95,
    });
    const glintGeo = new THREE.OctahedronGeometry(0.065, 0);

    const leftGlint = new THREE.Mesh(glintGeo, glintMat);
    leftGlint.position.set(0.02, 0.02, 0.09);
    leftEyeGroup.add(leftGlint);
    leftStarGlintRef.current = leftGlint;

    const rightGlint = new THREE.Mesh(glintGeo, glintMat);
    rightGlint.position.set(-0.02, 0.02, 0.09);
    rightEyeGroup.add(rightGlint);
    rightStarGlintRef.current = rightGlint;

    // Nose Cavity (Inverted Soft Heart)
    const noseMat = new THREE.MeshBasicMaterial({ color: 0x221727 });
    const noseGeo = new THREE.ConeGeometry(0.09, 0.14, 16);
    noseGeo.rotateZ(Math.PI);
    const nose = new THREE.Mesh(noseGeo, noseMat);
    nose.position.set(0, -0.32, 0.94);
    headGroup.add(nose);

    // Baby Skull Smile (Stitched Tooth Ridges)
    const smileGroup = new THREE.Group();
    headGroup.add(smileGroup);
    for (let i = -2; i <= 2; i++) {
      const tooth = new THREE.Mesh(
        new THREE.BoxGeometry(0.07, 0.12, 0.08),
        new THREE.MeshStandardMaterial({ color: 0xede4d8, roughness: 0.3 })
      );
      tooth.position.set(i * 0.12, -0.58, 0.78);
      smileGroup.add(tooth);
    }

    // Starry Nightcap
    const capColors: Record<typeof capColor, number> = {
      violet: 0x3b1c54,
      rose: 0x831843,
      amber: 0x78350f,
      cyan: 0x0e7490,
    };

    const capMat = new THREE.MeshStandardMaterial({
      color: capColors[capColor],
      roughness: 0.5,
    });
    capMeshRef.current = capMat as any;

    // Cap Cone Body
    const capGeo = new THREE.ConeGeometry(0.85, 1.4, 32);
    capGeo.translate(0, 0.7, 0);
    capGeo.rotateZ(-0.25);
    const cap = new THREE.Mesh(capGeo, capMat);
    cap.position.set(0.15, 0.65, -0.1);
    headGroup.add(cap);

    // Fluffy White Cap Brim Trim
    const brimMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.8 });
    const brimGeo = new THREE.TorusGeometry(0.85, 0.15, 16, 32);
    brimGeo.rotateX(Math.PI / 2);
    brimGeo.rotateZ(-0.25);
    const brim = new THREE.Mesh(brimGeo, brimMat);
    brim.position.set(0.08, 0.7, -0.05);
    headGroup.add(brim);

    // Lucky Gold Star Tip on Nightcap
    const starTipMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      emissive: 0xfbbf24,
      emissiveIntensity: 1.2,
      roughness: 0.2,
    });
    const starTipGeo = new THREE.DodecahedronGeometry(0.18);
    const starTip = new THREE.Mesh(starTipGeo, starTipMat);
    starTip.position.set(0.55, 1.85, -0.2);
    headGroup.add(starTip);
    starTipRef.current = starTip;

    // Floating Marshmallow Cloud Base
    const cloudGroup = new THREE.Group();
    cloudGroup.position.set(0, -1.2, 0);
    pipGroup.add(cloudGroup);
    cloudGroupRef.current = cloudGroup;

    const cloudMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.6,
      transparent: true,
      opacity: 0.92,
    });

    const cloudPuffs = [
      { x: 0, y: 0, z: 0, r: 0.55 },
      { x: -0.45, y: -0.1, z: 0.15, r: 0.42 },
      { x: 0.45, y: -0.08, z: 0.1, r: 0.45 },
      { x: 0.2, y: 0.05, z: -0.3, r: 0.38 },
      { x: -0.3, y: 0.02, z: -0.25, r: 0.36 },
    ];
    cloudPuffs.forEach((p) => {
      const puff = new THREE.Mesh(new THREE.SphereGeometry(p.r, 20, 20), cloudMat);
      puff.position.set(p.x, p.y, p.z);
      cloudGroup.add(puff);
    });

    // Starlight Particle Dust Ring
    const particleGeo = new THREE.BufferGeometry();
    const particleCount = 120;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 1.4 + Math.random() * 0.9;
      positions[i] = Math.cos(angle) * radius;
      positions[i + 1] = (Math.random() - 0.5) * 1.8;
      positions[i + 2] = Math.sin(angle) * radius;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xfde047,
      size: 0.045,
      transparent: true,
      opacity: 0.75,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);
    particlesRef.current = particles;

    // 5. Pointer Event Handlers for Dragging / Orbiting & Cool Eyes Cursor Tracking
    const onPointerDown = (e: PointerEvent) => {
      isDragging.current = true;
      prevMouse.current = { x: e.clientX, y: e.clientY };
    };

    const onPointerMove = (e: PointerEvent | MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mousePos.current = {
        x: Math.max(-1.5, Math.min(1.5, normX)),
        y: Math.max(-1.5, Math.min(1.5, normY)),
      };

      if (isDragging.current) {
        const deltaX = e.clientX - prevMouse.current.x;
        const deltaY = e.clientY - prevMouse.current.y;
        rotationVelocity.current.y += deltaX * 0.005;
        rotationVelocity.current.x += deltaY * 0.005;
        prevMouse.current = { x: e.clientX, y: e.clientY };
      }
    };

    // Global touch fallback for mobile screens
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = container.getBoundingClientRect();
        const normX = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        const normY = -(((touch.clientY - rect.top) / rect.height) * 2 - 1);
        mousePos.current = {
          x: Math.max(-1.5, Math.min(1.5, normX)),
          y: Math.max(-1.5, Math.min(1.5, normY)),
        };
      }
    };

    const onPointerUp = () => {
      isDragging.current = false;
    };

    container.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    container.addEventListener('touchmove', onTouchMove, { passive: true });

    // 6. Natural Periodic Blinking
    const blinkInterval = setInterval(() => {
      setBlinking(true);
      setTimeout(() => setBlinking(false), 160);
    }, 3800);

    // 7. Animation Loop with Real-Time Eyes Cursor Tracking
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Apply drag rotation inertia
      if (pipGroupRef.current) {
        pipGroupRef.current.rotation.y += rotationVelocity.current.y;
        pipGroupRef.current.rotation.x += rotationVelocity.current.x;
        rotationVelocity.current.y *= 0.92;
        rotationVelocity.current.x *= 0.92;

        // Smooth Floating Bob on Cloud
        pipGroupRef.current.position.y = Math.sin(elapsedTime * 1.8) * 0.08;
      }

      // Smooth Head Tilt towards Pointer
      if (headGroupRef.current && !isDragging.current) {
        const targetRotY = mousePos.current.x * 0.42;
        const targetRotX = -mousePos.current.y * 0.32;
        headGroupRef.current.rotation.y += (targetRotY - headGroupRef.current.rotation.y) * 0.08;
        headGroupRef.current.rotation.x += (targetRotX - headGroupRef.current.rotation.x) * 0.08;
      }

      // --- DYNAMIC COOL SKULL EYES CURSOR TRACKING ---
      // Eye pupils glide within the sockets to look directly at the cursor / finger!
      const maxEyeOffset = 0.075;
      const targetLookX = Math.max(-maxEyeOffset, Math.min(maxEyeOffset, mousePos.current.x * maxEyeOffset));
      const targetLookY = Math.max(-maxEyeOffset, Math.min(maxEyeOffset, mousePos.current.y * maxEyeOffset));

      if (leftEyeGroupRef.current) {
        const defaultLeftX = -0.35;
        const defaultY = -0.05;
        leftEyeGroupRef.current.position.x += (defaultLeftX + targetLookX - leftEyeGroupRef.current.position.x) * 0.14;
        leftEyeGroupRef.current.position.y += (defaultY + targetLookY - leftEyeGroupRef.current.position.y) * 0.14;
      }

      if (rightEyeGroupRef.current) {
        const defaultRightX = 0.35;
        const defaultY = -0.05;
        rightEyeGroupRef.current.position.x += (defaultRightX + targetLookX - rightEyeGroupRef.current.position.x) * 0.14;
        rightEyeGroupRef.current.position.y += (defaultY + targetLookY - rightEyeGroupRef.current.position.y) * 0.14;
      }

      // Pupil dynamic dilation when close to cursor
      const distFromCenter = Math.hypot(mousePos.current.x, mousePos.current.y);
      const dilation = 1 + Math.max(0, 0.25 - distFromCenter * 0.15);
      if (leftPupilRef.current && rightPupilRef.current && !blinking) {
        leftPupilRef.current.scale.set(dilation, dilation, dilation);
        rightPupilRef.current.scale.set(dilation, dilation, dilation);
      }

      // Starlight Iris glint gentle rotation
      if (leftStarGlintRef.current && rightStarGlintRef.current) {
        leftStarGlintRef.current.rotation.z = elapsedTime * 0.6;
        rightStarGlintRef.current.rotation.z = -elapsedTime * 0.6;
      }

      // Cloud undulation
      if (cloudGroupRef.current) {
        cloudGroupRef.current.rotation.y = Math.sin(elapsedTime * 0.8) * 0.1;
      }

      // Starlight tip shimmer
      if (starTipRef.current) {
        const scale = 1 + Math.sin(elapsedTime * 5) * 0.12;
        starTipRef.current.scale.set(scale, scale, scale);
      }

      // Orbiting particles rotation
      if (particlesRef.current) {
        particlesRef.current.rotation.y = elapsedTime * 0.15;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 8. Responsive Resize
    const handleResize = () => {
      if (!container || !rendererRef.current) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight || 460;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(blinkInterval);
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      container.removeEventListener('touchmove', onTouchMove);
      if (rendererRef.current?.domElement) {
        container.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
    };
  }, []);

  // Update Cap Color
  useEffect(() => {
    if (!capMeshRef.current) return;
    const capColors: Record<typeof capColor, number> = {
      violet: 0x3b1c54,
      rose: 0x831843,
      amber: 0x78350f,
      cyan: 0x0e7490,
    };
    (capMeshRef.current as any).color.setHex(capColors[capColor]);
  }, [capColor]);

  // Update Eye Glow Hue & Intensity
  useEffect(() => {
    const col = eyeColorHex[eyeColor];
    const intensity = intensityMultipliers[glowIntensity];

    if (leftPupilRef.current) {
      const mat = leftPupilRef.current.material as THREE.MeshStandardMaterial;
      mat.color.setHex(col);
      mat.emissive.setHex(col);
      mat.emissiveIntensity = intensity;
    }

    if (rightPupilRef.current) {
      const mat = rightPupilRef.current.material as THREE.MeshStandardMaterial;
      mat.color.setHex(col);
      mat.emissive.setHex(col);
      mat.emissiveIntensity = intensity;
    }

    if (eyeLightRef.current) {
      eyeLightRef.current.color.setHex(col);
      eyeLightRef.current.intensity = intensity;
    }
  }, [eyeColor, glowIntensity]);

  // Handle Dynamic Eye Blinking
  useEffect(() => {
    if (!leftPupilRef.current || !rightPupilRef.current) return;
    const scaleY = blinking ? 0.05 : 1.0;
    leftPupilRef.current.scale.set(1, scaleY, 1);
    rightPupilRef.current.scale.set(1, scaleY, 1);
  }, [blinking]);

  // Action Animations
  const triggerAction = (type: 'happy' | 'sparkle' | 'sleep') => {
    audio.playClick();
    setActiveAnimation(type);

    if (type === 'happy') {
      audio.playFanfare();
      if (headGroupRef.current) {
        let count = 0;
        const interval = setInterval(() => {
          headGroupRef.current!.position.y = Math.sin(count * 1.5) * 0.15;
          count++;
          if (count > 12) {
            clearInterval(interval);
            headGroupRef.current!.position.y = 0;
            setActiveAnimation('idle');
          }
        }, 50);
      }
    } else if (type === 'sparkle') {
      audio.playLullabyArpeggio();
      if (leftPupilRef.current && rightPupilRef.current) {
        (leftPupilRef.current.material as any).emissiveIntensity = 4.5;
        (rightPupilRef.current.material as any).emissiveIntensity = 4.5;
        setTimeout(() => {
          if (leftPupilRef.current && rightPupilRef.current) {
            (leftPupilRef.current.material as any).emissiveIntensity = intensityMultipliers[glowIntensity];
            (rightPupilRef.current.material as any).emissiveIntensity = intensityMultipliers[glowIntensity];
          }
          setActiveAnimation('idle');
        }, 1200);
      }
    } else if (type === 'sleep') {
      audio.playChime(392, 'sine', 0.6);
      if (headGroupRef.current) {
        headGroupRef.current.rotation.x = 0.35;
        if (leftPupilRef.current && rightPupilRef.current) {
          leftPupilRef.current.scale.set(1, 0.1, 1);
          rightPupilRef.current.scale.set(1, 0.1, 1);
        }
        setTimeout(() => {
          if (headGroupRef.current) headGroupRef.current.rotation.x = 0;
          if (leftPupilRef.current && rightPupilRef.current) {
            leftPupilRef.current.scale.set(1, 1, 1);
            rightPupilRef.current.scale.set(1, 1, 1);
          }
          setActiveAnimation('idle');
        }, 2500);
      }
    }
  };

  const handleResetCamera = () => {
    audio.playClick();
    if (pipGroupRef.current) {
      pipGroupRef.current.rotation.set(0, 0, 0);
    }
  };

  return (
    <div className="relative w-full rounded-3xl bg-card border-[3px] border-border shadow-[5px_5px_0_0_hsl(var(--border))] overflow-hidden flex flex-col items-center">
      {/* Canvas Mount Container */}
      <div
        ref={mountRef}
        className="w-full h-[360px] sm:h-[460px] lg:h-[500px] cursor-grab active:cursor-grabbing relative"
      />

      {/* Top HUD Overlay */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto px-3 py-1.5 rounded-full bg-card/90 backdrop-blur-md border border-border text-xs font-bold text-foreground flex items-center gap-2 shadow-sm">
          <span className="text-base">💀</span>
          <span className="flex items-center gap-1.5">
            Cool Skull Eyes Tracking
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </span>
        </div>

        <button
          onClick={handleResetCamera}
          className="pointer-events-auto p-2 rounded-full bg-card/90 backdrop-blur-md border border-border hover:bg-muted text-foreground transition-all shadow-sm"
          title="Reset Camera Angle"
        >
          <RotateCw className="w-4 h-4 text-secondary" />
        </button>
      </div>

      {/* Hint Pill */}
      <div className="absolute bottom-16 sm:bottom-20 pointer-events-none px-3 py-1 rounded-full bg-card/90 backdrop-blur-sm border border-border text-[11px] text-foreground font-mono shadow-xs flex items-center gap-1.5">
        <Sparkles className="w-3.5 h-3.5 text-primary" />
        <span>Move cursor or touch screen — Skull 💀 pupils follow your every move!</span>
      </div>

      {/* Interactive Control Console */}
      <div className="w-full p-3 sm:p-4 bg-muted/30 border-t border-border/60 flex flex-wrap items-center justify-between gap-3">
        {/* Action Triggers */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => triggerAction('happy')}
            className="min-h-[36px] px-3 py-1.5 rounded-xl bg-card border border-border hover:border-primary text-xs font-bold text-foreground transition-all flex items-center gap-1.5 shadow-xs hover:scale-105 active:scale-95"
          >
            <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500/20" />
            <span>Giggle & Bob</span>
          </button>

          <button
            onClick={() => triggerAction('sparkle')}
            className="min-h-[36px] px-3 py-1.5 rounded-xl bg-card border border-border hover:border-secondary text-xs font-bold text-foreground transition-all flex items-center gap-1.5 shadow-xs hover:scale-105 active:scale-95"
          >
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>Starlight Eyes Flare</span>
          </button>

          <button
            onClick={() => triggerAction('sleep')}
            className="min-h-[36px] px-3 py-1.5 rounded-xl bg-card border border-border hover:border-border text-xs font-bold text-foreground transition-all flex items-center gap-1.5 shadow-xs hover:scale-105 active:scale-95"
          >
            <Moon className="w-3.5 h-3.5 text-indigo-400" />
            <span>Sleepy Nod</span>
          </button>
        </div>

        {/* Eye Glow Hue Switcher */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-muted-foreground mr-0.5 hidden sm:inline">
            Eye Glow:
          </span>
          {[
            { id: 'amber', color: 'bg-amber-400 border-amber-500', label: 'Starlight Amber' },
            { id: 'cyan', color: 'bg-cyan-400 border-cyan-500', label: 'Celestial Cyan' },
            { id: 'lavender', color: 'bg-purple-400 border-purple-500', label: 'Mystic Lavender' },
            { id: 'emerald', color: 'bg-emerald-400 border-emerald-500', label: 'Ghost Emerald' },
          ].map((c) => (
            <button
              key={c.id}
              onClick={() => {
                audio.playClick();
                setEyeColor(c.id as EyeGlowColor);
              }}
              className={`w-6 h-6 rounded-full border-2 transition-transform ${c.color} ${
                eyeColor === c.id ? 'scale-125 shadow-md ring-2 ring-primary' : 'hover:scale-110 opacity-70'
              }`}
              title={c.label}
            />
          ))}

          {/* Glow Intensity Selector */}
          <button
            onClick={() => {
              audio.playClick();
              setGlowIntensity((prev) =>
                prev === 'cozy' ? 'radiant' : prev === 'radiant' ? 'supernova' : 'cozy'
              );
            }}
            className="ml-1 px-2.5 py-1 rounded-lg bg-card border border-border text-[11px] font-bold text-foreground hover:bg-muted transition-colors flex items-center gap-1 shadow-xs"
          >
            <Sun className="w-3 h-3 text-amber-500" />
            <span className="capitalize">{glowIntensity}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
