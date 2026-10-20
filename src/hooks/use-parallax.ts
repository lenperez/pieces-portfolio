import { useEffect } from "react";

const MAX = 40;

export function useParallax() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      const factor = window.innerWidth < 768 ? 0.5 : 1;
      document.querySelectorAll<HTMLElement>("[data-parallax], [data-fade-scroll]").forEach((el) => {
        const speed = Number(el.dataset["parallax"]) * factor;
        if (el.dataset["parallaxHero"] !== undefined) {
          const y = window.scrollY;
          if (y > vh * 1.2) return;
          el.style.transform = `translate3d(0, ${y * speed}px, 0)`;
          const fadeAttr = el.dataset["parallaxFade"];
          if (fadeAttr === "header") {
            const headerH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-height")) || 76;
            const r = el.getBoundingClientRect();
            const initialTop = r.top - y * speed;
            const span = Math.max(1, initialTop - headerH);
            el.style.opacity = String(Math.max(0, Math.min(1, (r.top - headerH) / span)));
          } else {
            const fadeSpan = vh * Number(fadeAttr || 0.5);
            el.style.opacity = String(Math.max(0, 1 - y / fadeSpan));
          }
          return;
        }
        if (el.dataset["fadeScroll"] !== undefined) {
          const r = el.getBoundingClientRect();
          if (r.bottom < -100 || r.top > vh + 100) return;
          const topBar = 140;
          const fadeIn = Math.min(1, Math.max(0, (vh - r.top) / (vh * 0.35)));
          const fadeOut = Math.min(1, Math.max(0, (r.bottom - topBar) / (vh * 0.25)));
          el.style.opacity = String(Math.min(fadeIn, fadeOut));
          return;
        }
        const r = el.parentElement!.getBoundingClientRect();
        if (r.bottom < -100 || r.top > vh + 100) return;
        const offset = (r.top + r.height / 2 - vh / 2) * speed;
        const y = Math.max(-MAX, Math.min(MAX, offset));
        el.style.transform = `translate3d(0, ${y}px, 0)`;
      });
    };
    const on = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, []);
}
