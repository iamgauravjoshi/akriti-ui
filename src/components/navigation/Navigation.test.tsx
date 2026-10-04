import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./Tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./Accordion";
import { Breadcrumb } from "./Breadcrumb";
import { Pagination } from "./Pagination";

describe("Tabs", () => {
  it("switches panels on trigger click", async () => {
    const user = userEvent.setup();
    render(
      <Tabs defaultValue="a">
        <TabsList>
          <TabsTrigger value="a">First</TabsTrigger>
          <TabsTrigger value="b">Second</TabsTrigger>
        </TabsList>
        <TabsContent value="a">Panel A</TabsContent>
        <TabsContent value="b">Panel B</TabsContent>
      </Tabs>,
    );
    expect(screen.getByText("Panel A")).toBeVisible();
    await user.click(screen.getByRole("tab", { name: "Second" }));
    expect(screen.getByText("Panel B")).toBeVisible();
  });
});

describe("Accordion", () => {
  it("expands content on trigger click", async () => {
    const user = userEvent.setup();
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="one">
          <AccordionTrigger>Item one</AccordionTrigger>
          <AccordionContent>Details one</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );
    const trigger = screen.getByRole("button", { name: "Item one" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Details one")).toBeVisible();
  });
});

describe("Breadcrumb", () => {
  it("marks the last item as the current page", () => {
    render(
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Library", href: "/lib" },
          { label: "Data" },
        ]}
      />,
    );
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.getByText("Data")).toHaveAttribute("aria-current", "page");
  });
});

describe("Pagination", () => {
  it("changes page on click and disables prev on the first page", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    render(
      <Pagination pageCount={5} defaultPage={1} onPageChange={onPageChange} />,
    );
    expect(
      screen.getByRole("button", { name: "Go to previous page" }),
    ).toBeDisabled();
    await user.click(screen.getByRole("button", { name: "Go to page 3" }));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });
});
