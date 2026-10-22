import { renderHook } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { useParallax } from "@/hooks/use-parallax";

afterEach(() => {
  document.body.innerHTML = "";
  vi.unstubAllGlobals();
});

it("sets mobile hero opacity to zero even when scrolling jumps past the hero", () => {
  vi.stubGlobal("matchMedia", () => ({ matches: false }));
  vi.stubGlobal("innerWidth", 393);
  vi.stubGlobal("innerHeight", 852);
  vi.stubGlobal("scrollY", 1100);
  document.body.innerHTML = '<h1 data-parallax="-1" data-parallax-hero data-parallax-fade="header" style="opacity: 1">PIECES</h1>';
  const { unmount } = renderHook(() => useParallax());
  expect(document.querySelector("h1")?.style.opacity).toBe("0");
  unmount();
});