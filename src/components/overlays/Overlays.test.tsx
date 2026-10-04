import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "../buttons/Button";
import { Tooltip } from "./Tooltip";
import { Popover } from "./Popover";
import { Drawer } from "./Drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./DropdownMenu";

describe("Tooltip", () => {
  it("reveals content on keyboard focus", async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="More info">
        <Button>Hover me</Button>
      </Tooltip>,
    );
    expect(screen.queryByText("More info")).toBeNull();
    await user.tab();
    expect(screen.getByText("More info")).toBeInTheDocument();
  });
});

describe("Popover", () => {
  it("toggles content on trigger click", async () => {
    const user = userEvent.setup();
    render(
      <Popover trigger={<Button>Open</Button>}>
        <p>Details</p>
      </Popover>,
    );
    expect(screen.queryByText("Details")).toBeNull();
    await user.click(screen.getByRole("button", { name: "Open" }));
    expect(screen.getByText("Details")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByText("Details")).toBeNull();
  });
});

describe("Drawer", () => {
  it("renders as a dialog and closes on Escape", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Drawer open onClose={onClose} title="Panel">
        <p>Side content</p>
      </Drawer>,
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalled();
  });
});

describe("DropdownMenu", () => {
  it("opens on trigger click and selects an item", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>Menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={onSelect}>Edit</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );
    await user.click(screen.getByRole("button", { name: "Menu" }));
    await user.click(screen.getByRole("menuitem", { name: "Edit" }));
    expect(onSelect).toHaveBeenCalledTimes(1);
  });
});
