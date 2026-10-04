import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  ToastProvider,
  useToast,
  type ToastContextValue,
} from "./Toast";

function Capture({ onApi }: { onApi: (api: ToastContextValue) => void }) {
  const api = useToast();
  onApi(api);
  return null;
}

function renderWithApi(props?: { autoClose?: number; preventDuplicates?: boolean }) {
  let api: ToastContextValue | null = null;
  render(
    <ToastProvider autoClose={1000} {...props}>
      <Capture onApi={(next) => { api = next; }} />
    </ToastProvider>,
  );
  const getApi = () => {
    if (!api) throw new Error("toast api not captured");
    return api;
  };
  return { getApi };
}

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe("Toast", () => {
  it("auto-dismisses after the duration", () => {
    const { getApi } = renderWithApi();
    act(() => {
      getApi().success("Saved");
    });
    expect(screen.getByText("Saved")).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(screen.queryByText("Saved")).toBeNull();
  });

  it("removes a toast via the close button and fires onClose once", () => {
    const onClose = vi.fn();
    let api: ToastContextValue | null = null;
    render(
      <ToastProvider autoClose={5000}>
        <Capture onApi={(next) => { api = next; }} />
      </ToastProvider>,
    );
    act(() => {
      api?.addToast({ title: "Hi", onClose });
    });
    fireEvent.click(screen.getByRole("button", { name: "Close notification" }));
    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(screen.queryByText("Hi")).toBeNull();
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("prevents duplicates when configured", () => {
    const { getApi } = renderWithApi({ preventDuplicates: true });
    act(() => {
      getApi().success("Same");
      getApi().success("Same");
    });
    expect(screen.getAllByText("Same")).toHaveLength(1);
  });

  it("clears all toasts", () => {
    const { getApi } = renderWithApi();
    act(() => {
      getApi().success("One");
      getApi().info("Two");
    });
    expect(screen.getByText("One")).toBeInTheDocument();
    act(() => {
      getApi().clearAllToasts();
    });
    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(screen.queryByText("One")).toBeNull();
    expect(screen.queryByText("Two")).toBeNull();
  });
});
