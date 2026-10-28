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
    expect(project4).toBeUndefined();
  });

  it("moves Paint Selection Tool before the former step 12 of project 1", () => {
    const project = allProjects.find((p) => p.id === "purchasing");
    expect(project?.steps.slice(10).map((s) => s.title)).toEqual([
      "Lo-Fidelity Wireframing / Prototyping",
      "Paint Selection Tool",
      "High-Fidelity Comps",
    ]);
    expect(project?.steps[11]?.image).toContain("ui-pp-paint.png");
  });

  it("removes former project 3 and preserves the remaining project order", () => {
    expect(allProjects.map(({ id }) => id)).toEqual([
      "purchasing",
      "grainger",
      "press-ganey",
      "ui-medtronic",
    ]);
  });

  it("classifies the retained Press Ganey project as UI and keeps its uploaded specification image", () => {
    const project = allProjects.find((p) => p.id === "press-ganey");
    expect(project?.group).toBe("UI");
    expect(project?.steps[2]?.image).toContain("pg-specdocs-upload.png");
  });

  it("numbers Press Ganey as project 3", () => {
    expect(allProjects.find((p) => p.id === "press-ganey")?.number).toBe("03");
  });

  it("hides former project 6", () => {
    expect(allProjects.some((p) => p.id === "ui-grainger")).toBe(false);
  });

  it("numbers Medtronic as project 4", () => {
    expect(allProjects.find((p) => p.id === "ui-medtronic")?.number).toBe("04");
  });
});