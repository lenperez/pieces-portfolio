import { describe, it, expect } from "vitest";
import { resolveTheme } from "@/components/ThemeToggle";

describe("resolveTheme", () => {
  it("follows the browser when no choice is stored", () => {
    expect(resolveTheme(null, true)).toBe("dark");
    expect(resolveTheme(null, false)).toBe("light");
  });
  it("a stored choice overrides the browser setting", () => {
    expect(resolveTheme("light", true)).toBe("light");
    expect(resolveTheme("dark", false)).toBe("dark");
  });
});
