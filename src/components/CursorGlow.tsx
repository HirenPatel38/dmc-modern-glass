import { useEffect, useRef } from "react";

export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let x = 0;
    let y = 0;
    let mx = 0;
    let my = 0;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
    };

    const tick = () => {
      mx += (x - mx) * 0.12;
      my += (y - my) * 0.12;
      el.style.transform = `translate(${mx - 160}px, ${my - 160}px)`;
      requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    const raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} className="cursor-glow hidden md:block" aria-hidden="true" />;
}
