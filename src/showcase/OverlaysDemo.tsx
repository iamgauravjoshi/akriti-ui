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
  Popover,
  Stack,
  Text,
  Tooltip,
} from "..";
import { Example } from "./Example";

export default function OverlaysDemo() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <Stack gap={6}>
      <Example
        title="Tooltip & Popover"
        description="Hover hints and anchored rich content."
      >
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
      </Example>

      <Example title="Drawer" description="Side panels in four placements.">
        <Button onClick={() => setDrawerOpen(true)}>Open drawer</Button>
        <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="Settings">
          <Text size="sm">Drawer content lives in a side panel.</Text>
        </Drawer>
      </Example>

      <Example title="Dropdown menu" description="Keyboard-navigable action menus.">
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
      </Example>
    </Stack>
  );
}
