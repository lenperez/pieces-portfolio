import { act, fireEvent, render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { afterEach, expect, it, vi } from "vitest";

import { Route } from "@/routes/index";

class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}
vi.stubGlobal("ResizeObserver", ResizeObserverStub);

const Index = Route.options.component as React.ComponentType;

function renderPage() {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <Index />
    </QueryClientProvider>,
  );
}

function dropdown(label: string) {
  const wrapper = document.querySelector(`[data-dropdown="${label}"]`);
  if (!wrapper) throw new Error(`no dropdown labelled ${label}`);
  return { wrapper, button: wrapper.querySelector("button") as HTMLButtonElement };
}

afterEach(() => {
  vi.useRealTimers();
  vi.clearAllMocks();
});

it("opens the Case Studies menu while the pointer is over it and closes it after the pointer leaves", () => {
  vi.useFakeTimers();
  const { unmount } = renderPage();
  const { wrapper, button } = dropdown("Case Studies");

  expect(button.getAttribute("aria-expanded")).toBe("false");

  fireEvent.mouseEnter(wrapper);
  expect(button.getAttribute("aria-expanded")).toBe("true");

  // leaving for less than the grace period keeps it open
  fireEvent.mouseLeave(wrapper);
  act(() => {
    vi.advanceTimersByTime(100);
  });
  expect(button.getAttribute("aria-expanded")).toBe("true");

  act(() => {
    vi.advanceTimersByTime(200);
  });
  expect(button.getAttribute("aria-expanded")).toBe("false");

  unmount();
});

it("opens the UX/UI Design menu when its button is focused with the keyboard", () => {
  const { unmount } = renderPage();
  const { wrapper, button } = dropdown("UX/UI Design");

  expect(button.getAttribute("aria-expanded")).toBe("false");
  fireEvent.focusIn(button);
  expect(button.getAttribute("aria-expanded")).toBe("true");

  unmount();
});
