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

export default function PrimitivesDemo() {
  return (
    <Stack gap={8}>
      <section>
        <Heading level={2}>Typography</Heading>
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
      </section>

      <Divider />

      <section>
        <Heading level={2}>Layout</Heading>
        <Stack gap={2}>
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
      </section>
    </Stack>
  );
}
