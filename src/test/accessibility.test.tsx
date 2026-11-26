import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { afterEach, expect, it, vi } from "vitest";
import { Route } from "@/routes/index";

vi.stubGlobal("ResizeObserver", class { observe() {} unobserve() {} disconnect() {} });
const Index = Route.options.component as React.ComponentType;
afterEach(cleanup);
function renderPage() {
  return render(<QueryClientProvider client={new QueryClient()}><Index /></QueryClientProvider>);
}

it("Escape closes each header disclosure and restores focus to its trigger", () => {
  renderPage();
  for (const label of ["Case Studies", "UX/UI Design"]) {
    const trigger = screen.getByRole("button", { name: label });
    act(() => trigger.focus());
    expect(trigger.getAttribute("aria-expanded")).toBe("true");
    const panel = document.getElementById(trigger.getAttribute("aria-controls") ?? "");
    const link = panel?.querySelector("a");
    if (!link) throw new Error("Missing project link");
    act(() => link.focus());
    fireEvent.keyDown(window, { key: "Escape" });
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    expect(document.activeElement).toBe(trigger);
  }
});

it("opening an image isolates background content and Escape returns focus", async () => {
  renderPage();
  const trigger = screen.getByRole("button", { name: "Enlarge Complete Site Redesign" });
  act(() => trigger.focus());
  fireEvent.click(trigger);
  expect(screen.getByRole("dialog")).toBeInTheDocument();
  expect(document.querySelector("main")?.closest('[aria-hidden="true"]')).not.toBeNull();
  fireEvent.keyDown(screen.getByRole("button", { name: "Close enlarged image" }), { key: "Escape" });
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  await waitFor(() => expect(document.activeElement).toBe(trigger));
});

it("invalid contact submission focuses the first invalid field", () => {
  renderPage();
  fireEvent.submit(screen.getByRole("form", { name: "Contact Len Perez" }));
  expect(document.activeElement).toBe(screen.getByRole("textbox", { name: "Name" }));
  expect(screen.getByRole("alert").textContent?.length).toBeGreaterThan(0);
});