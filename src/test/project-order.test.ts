import { describe, expect, it } from "vitest";
import { allProjects } from "@/routes/index";

describe("Portfolio project order", () => {
  it("moves project 4's first step ahead of project 1's original first step", () => {
    const project1 = allProjects.find((p) => p.id === "purchasing");
    const project4 = allProjects.find((p) => p.id === "ui-purchasing");
    expect(project1?.steps.slice(0, 2).map((s) => s.title)).toEqual([
      "Complete Site Redesign",
      "Timeline Development",
    ]);
    expect(project1?.steps[0]?.image).toContain("ui-pp-synopsis.png");
    expect(project4?.steps.map((s) => s.title)).toEqual(["Paint Selection Tool"]);
  });

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