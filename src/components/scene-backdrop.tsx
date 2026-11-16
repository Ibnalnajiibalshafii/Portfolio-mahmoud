import { useEffect, useRef } from "react";

type Pose = {
  camX: number;
  camY: number;
  camZ: number;
  rotY: number;
  rotX: number;
  focusX: number;
};

const heroPose: Pose = {
  camX: 0.1,
  camY: 0.38,
  camZ: 4.5,
  rotY: 0.45,
  rotX: 0.16,
  focusX: 2.15,
};

export function SceneBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let alive = true;
    let destroy = () => {};

    void (async () => {
      const THREE = await import("three");
      const { RoomEnvironment } = await import("three/addons/environments/RoomEnvironment.js");
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      const { default: Lenis } = await import("lenis");
      if (!alive) return;

      gsap.registerPlugin(ScrollTrigger);

      const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(window.innerWidth, window.innerHeight, false);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.12;
      renderer.setClearColor(0x0b1220, 1);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 40);

      const pmrem = new THREE.PMREMGenerator(renderer);
      scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

      scene.add(new THREE.AmbientLight(0xdbeafe, 0.35));
      const key = new THREE.DirectionalLight(0xffffff, 2.4);
      key.position.set(4.5, 6.2, 5);
      scene.add(key);
      const rim = new THREE.DirectionalLight(0x06b6d4, 2.1);
      rim.position.set(-5, 2.2, -3);
      scene.add(rim);
      const fill = new THREE.PointLight(0x2dd4bf, 8, 12);
      fill.position.set(0, 1.2, 2.4);
      scene.add(fill);

      const rig = new THREE.Group();
      scene.add(rig);

      const glass = new THREE.MeshPhysicalMaterial({
        color: 0x9be7ff,
        metalness: 0,
        roughness: 0.08,
        transmission: 0.72,
        thickness: 1.1,
        ior: 1.4,
        transparent: true,
        emissive: 0x0e7490,
        emissiveIntensity: 0.22,
        envMapIntensity: 1.4,
      });
      const metal = new THREE.MeshStandardMaterial({
        color: 0xc5d4e8,
        metalness: 1,
        roughness: 0.18,
      });
      const accent = new THREE.MeshStandardMaterial({
        color: 0x22d3ee,
        metalness: 0.7,
        roughness: 0.2,
        emissive: 0x06b6d4,
        emissiveIntensity: 0.85,
      });

      const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.82, 1), glass);
      core.position.y = 0.55;
      rig.add(core);

      const shard = new THREE.Mesh(new THREE.OctahedronGeometry(0.28, 0), glass);
      shard.position.set(-0.95, 1.15, 0.35);
      rig.add(shard);

      const ring = new THREE.Mesh(new THREE.TorusGeometry(1.85, 0.045, 24, 100), accent);
      ring.rotation.x = Math.PI / 2.35;
      ring.position.y = 0.45;
      rig.add(ring);

      const heights = [0.55, 0.85, 1.2, 1.75, 1.05, 0.7, 1.35];
      heights.forEach((height, index) => {
        const bar = new THREE.Mesh(new THREE.BoxGeometry(0.2, height, 0.2), index === 3 ? accent : metal);
        bar.position.set((index - 3) * 0.36, height / 2 - 0.15, 1.05);
        rig.add(bar);
      });

      const base = new THREE.Mesh(new THREE.CylinderGeometry(1.55, 1.68, 0.08, 48), metal);
      base.position.y = -0.22;
      rig.add(base);

      const points = new THREE.Group();
      for (let index = 0; index < 14; index += 1) {
        const dot = new THREE.Mesh(new THREE.SphereGeometry(0.055, 16, 16), accent);
        const angle = (index / 14) * Math.PI * 2;
        dot.position.set(Math.cos(angle) * 2.15, Math.sin(angle * 2) * 0.42 + 0.45, Math.sin(angle) * 2.15);
        points.add(dot);
      }
      rig.add(points);

      const count = window.innerWidth < 768 ? 180 : 460;
      const seeds = new Float32Array(count * 3);
      const phases = new Float32Array(count);
      const positions = new Float32Array(count * 3);
      for (let index = 0; index < count; index += 1) {
        const radius = 2.2 + Math.random() * 7.2;
        const theta = Math.random() * Math.PI * 2;
        const y = (Math.random() - 0.5) * 7.5;
        seeds[index * 3] = Math.cos(theta) * radius;
        seeds[index * 3 + 1] = y;
        seeds[index * 3 + 2] = Math.sin(theta) * radius * (0.55 + Math.random() * 0.7);
        phases[index] = Math.random() * Math.PI * 2;
      }
      positions.set(seeds);
      const particleGeo = new THREE.BufferGeometry();
      particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const particleMat = new THREE.PointsMaterial({
        color: 0x67e8f9,
        size: window.innerWidth < 768 ? 0.055 : 0.07,
        transparent: true,
        opacity: 0.75,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
      });
      const dust = new THREE.Points(particleGeo, particleMat);
      scene.add(dust);
      const flow = { progress: 0 };

      const state: Pose = { ...heroPose };
      const pointer = { x: 0, y: 0 };
      const smooth = { x: 0, y: 0 };
      const narrow = () => window.innerWidth < 768;

      const fit = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        camera.aspect = width / Math.max(height, 1);
        camera.updateProjectionMatrix();
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.setSize(width, height, false);
        rig.scale.setScalar(narrow() ? 0.58 : 1.35);
      };
      fit();

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      let lenis: InstanceType<typeof Lenis> | null = null;
      const tickers: Array<(time: number) => void> = [];

      if (!reduce) {
        lenis = new Lenis({ lerp: 0.085, smoothWheel: true });
        lenis.on("scroll", ScrollTrigger.update);
        const onTick = (time: number) => {
          lenis?.raf(time * 1000);
        };
        tickers.push(onTick);
        gsap.ticker.add(onTick);
        gsap.ticker.lagSmoothing(0);
        document.documentElement.classList.add("lenis");

        const timeline = gsap.timeline({
          defaults: { ease: "none", duration: 1 },
          scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            endTrigger: "#footer",
            end: "bottom bottom",
            scrub: 0.7,
          },
        });
        timeline
          .to(state, { camX: -1.6, camY: 0.7, camZ: 4.8, rotY: 1.35, rotX: 0.24, focusX: 1.1 })
          .to(state, { camX: 0.2, camY: 0.15, camZ: 3.3, rotY: 2.35, rotX: -0.04, focusX: 0.35 })
          .to(state, { camX: 1.8, camY: 0.95, camZ: 5.1, rotY: 3.2, rotX: 0.28, focusX: 1.4 })
          .to(state, { camX: 0.2, camY: 0.55, camZ: 6.2, rotY: 4.2, rotX: 0.08, focusX: 2.3 });
        timeline.to(flow, { progress: 1, duration: 4 }, 0);

        requestAnimationFrame(() => ScrollTrigger.refresh());
      }

      const onMove = (event: PointerEvent) => {
        pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
        pointer.y = (event.clientY / window.innerHeight) * 2 - 1;
      };
      window.addEventListener("pointermove", onMove);
      window.addEventListener("resize", fit);

      const clock = new THREE.Clock();
      renderer.setAnimationLoop(() => {
        const t = clock.getElapsedTime();
        smooth.x += (pointer.x - smooth.x) * 0.06;
        smooth.y += (pointer.y - smooth.y) * 0.06;
        const mobile = narrow();
        const parallax = mobile ? 0.12 : 0.28;
        camera.position.set(
          state.camX + smooth.x * parallax,
          state.camY + smooth.y * -0.18,
          state.camZ + (mobile ? 2.2 : 0),
        );
        camera.lookAt(0, 0.45, 0);
        rig.position.x = mobile ? 0 : state.focusX;
        rig.position.y = Math.sin(t * 1.35) * 0.2;
        rig.rotation.y = state.rotY + smooth.x * 0.4 + t * 0.22;
        rig.rotation.x = state.rotX + Math.sin(t * 0.9) * 0.08 + smooth.y * 0.12;
        points.rotation.y = t * 0.45;
        const progress = flow.progress;
        const swirl = progress * Math.PI * 3.4 + t * 0.45;
        const spread = 1 + progress * 0.55;
        const attr = particleGeo.getAttribute("position");
        const coords = attr.array as Float32Array;
        for (let index = 0; index < count; index += 1) {
          const i3 = index * 3;
          const phase = phases[index] ?? 0;
          const x = seeds[i3] ?? 0;
          const y = seeds[i3 + 1] ?? 0;
          const z = seeds[i3 + 2] ?? 0;
          const turn = swirl + phase * 0.05;
          const cos = Math.cos(turn);
          const sin = Math.sin(turn);
          coords[i3] = (x * cos - z * sin) * spread;
          coords[i3 + 1] = y + Math.sin(t * 0.55 + phase) * 0.18 + progress * Math.sin(phase) * 1.4;
          coords[i3 + 2] = (x * sin + z * cos) * spread;
        }
        attr.needsUpdate = true;
        particleMat.opacity = 0.4 + progress * 0.5;
        particleMat.color.setHex(progress > 0.55 ? 0x2dd4bf : 0x67e8f9);
        renderer.render(scene, camera);
      });

      destroy = () => {
        renderer.setAnimationLoop(null);
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("resize", fit);
        tickers.forEach((fn) => gsap.ticker.remove(fn));
        lenis?.destroy();
        document.documentElement.classList.remove("lenis");
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        scene.traverse((object) => {
          const mesh = object as import("three").Mesh;
          if (mesh.geometry) mesh.geometry.dispose();
          const material = mesh.material;
          if (Array.isArray(material)) material.forEach((item) => item.dispose());
          else if (material) material.dispose();
        });
        pmrem.dispose();
        renderer.dispose();
      };
    })();

    return () => {
      alive = false;
      destroy();
    };
  }, []);

  return <canvas ref={canvasRef} className="scene-canvas" aria-hidden="true" />;
}
