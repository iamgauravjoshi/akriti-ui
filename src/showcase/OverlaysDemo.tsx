import { useState } from "react";
import {
  Button,
  Drawer,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Heading,
  Popover,
  Stack,
  Text,
  Tooltip,
} from "..";

export default function OverlaysDemo() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <Stack gap={8}>
      <section>
        <Heading level={2}>Tooltip & Popover</Heading>
        <Stack direction="row" gap={3} align="center">
          <Tooltip content="Saved automatically">
            <Button variant="outline">Hover or focus me</Button>
          </Tooltip>
          <Popover trigger={<Button variant="outline">Open popover</Button>}>
            <Text size="sm">
              Popovers anchor rich content to any trigger element.
            </Text>
          </Popover>
        </Stack>
      </section>

      <section>
        <Heading level={2}>Drawer</Heading>
        <Button onClick={() => setDrawerOpen(true)}>Open drawer</Button>
        <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="Settings">
          <Text size="sm">Drawer content lives in a side panel.</Text>
        </Drawer>
      </section>

      <section>
        <Heading level={2}>Dropdown menu</Heading>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Actions</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Row actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Duplicate</DropdownMenuItem>
            <DropdownMenuItem>Archive</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </section>
    </Stack>
  );
}
