import { describe, expect, it } from "vitest";
import { allProjects } from "@/routes/index";

describe("Portfolio project order", () => {
  it("swaps projects 3 and 5 while keeping their samples and all other positions intact", () => {
    expect(allProjects.map(({ id }) => id)).toEqual([
      "purchasing",
      "grainger",
      "ui-press-ganey",
      "ui-purchasing",
      "press-ganey",
      "ui-grainger",
      "ui-medtronic",
    ]);
    expect(allProjects[2]?.group).toBe("UI");
    expect(allProjects[4]?.group).toBe("UX");
  });
});