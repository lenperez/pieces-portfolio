import { describe, expect, it } from "vitest";
import { allProjects } from "@/routes/index";

describe("Portfolio project order", () => {
  it("removes former project 3 and preserves the remaining project order", () => {
    expect(allProjects.map(({ id }) => id)).toEqual([
      "purchasing",
      "grainger",
      "ui-purchasing",
      "press-ganey",
      "ui-grainger",
      "ui-medtronic",
    ]);
  });

  it("classifies the retained Press Ganey project as UI and keeps its uploaded specification image", () => {
    const project = allProjects.find((p) => p.id === "press-ganey");
    expect(project?.group).toBe("UI");
    expect(project?.steps[2]?.image).toContain("pg-specdocs-upload.png");
  });
});