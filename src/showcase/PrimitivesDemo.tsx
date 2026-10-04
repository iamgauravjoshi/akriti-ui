import {
  Code,
  Divider,
  Flex,
  Heading,
  Kbd,
  Stack,
  Text,
  VisuallyHidden,
} from "..";
import { Example } from "./Example";

export default function PrimitivesDemo() {
  return (
    <Stack gap={6}>
      <Example
        title="Typography"
        description="Text tones and sizes, headings, code, and keyboard hints."
      >
        <Stack gap={2}>
          <Heading>Default heading (level 1)</Heading>
          <Text>
            Body text in the default tone with a <Code>inline code</Code>{" "}
            fragment.
          </Text>
          <Text tone="muted" size="sm">
            Muted small text. Press <Kbd>Ctrl</Kbd> + <Kbd>K</Kbd> to search.
          </Text>
          <Text tone="danger">Danger tone for errors.</Text>
          <VisuallyHidden>Announced to screen readers only.</VisuallyHidden>
        </Stack>
      </Example>

      <Example
        title="Layout"
        description="Stack and Flex spacing with a Divider between sections."
      >
        <Stack gap={3}>
          <Text tone="muted" size="sm">
            Stack (column) of cards:
          </Text>
          <Stack gap={2}>
            <div className="rounded-md border border-border bg-muted p-3">
              <Text size="sm">First</Text>
            </div>
            <div className="rounded-md border border-border bg-muted p-3">
              <Text size="sm">Second</Text>
            </div>
          </Stack>
          <Divider />
          <Text tone="muted" size="sm">
            Flex (row) with wrapping:
          </Text>
          <Flex gap={2} wrap>
            <div className="rounded-md border border-border bg-muted p-3">
              <Text size="sm">One</Text>
            </div>
            <div className="rounded-md border border-border bg-muted p-3">
              <Text size="sm">Two</Text>
            </div>
            <div className="rounded-md border border-border bg-muted p-3">
              <Text size="sm">Three</Text>
            </div>
          </Flex>
        </Stack>
      </Example>
    </Stack>
  );
}
