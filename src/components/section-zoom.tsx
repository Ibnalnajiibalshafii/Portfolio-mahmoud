import { useEffect } from "react";

function scaleFor(progress: number, first: boolean): number {
  if (first) {
    if (progress < 0.55) return 1;
    return 1 - ((progress - 0.55) / 0.45) * 0.04;
  }
  if (progress < 0.4) return 1.05 - (progress / 0.4) * 0.05;
  if (progress > 0.7) return 1 - ((progress - 0.7) / 0.3) * 0.04;
  return 1;
}

export function SectionZoom() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let alive = true;
    let cleanup = () => {};

    void (async () => {
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      const gsap = (await import("gsap")).default;
      if (!alive) return;
      gsap.registerPlugin(ScrollTrigger);

      const sections = Array.from(document.querySelectorAll<HTMLElement>(".zoom-section"));
      const triggers = sections.map((section, index) =>
        ScrollTrigger.create({
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
          onUpdate: (self) => {
            const scale = scaleFor(self.progress, index === 0);
            section.style.transform = scale === 1 ? "" : `scale(${scale})`;
          },
        }),
      );

      requestAnimationFrame(() => ScrollTrigger.refresh());
      cleanup = () => {
        triggers.forEach((trigger) => trigger.kill());
        sections.forEach((section) => {
          section.style.transform = "";
          section.style.filter = "";
        });
      };
    })();

    return () => {
      alive = false;
      cleanup();
    };
  }, []);

  return null;
}
