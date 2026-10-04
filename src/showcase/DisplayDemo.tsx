import {
  Alert,
  Avatar,
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Empty,
  Progress,
  Skeleton,
  Stack,
  Tag,
  Text,
} from "..";
import { Example } from "./Example";

export default function DisplayDemo() {
  return (
    <Stack gap={6}>
      <Example
        title="Card"
        description="Compound sections for headers, content, and footers."
      >
        <Card className="max-w-md border-0 shadow-none">
          <CardHeader>
            <CardTitle>Project Alpha</CardTitle>
            <CardDescription>Q4 deliverables and milestones.</CardDescription>
          </CardHeader>
          <CardContent>
            <Text size="sm">Shipped 12 of 15 milestones this quarter.</Text>
            <div className="mt-3">
              <Progress percent={80} intent="success" />
            </div>
          </CardContent>
          <CardFooter>
            <Tag tone="success">On track</Tag>
          </CardFooter>
        </Card>
      </Example>

      <Example
        title="Badge, Tag, Avatar"
        description="Status markers, removable pills, and identity fallbacks."
      >
        <Stack direction="row" gap={4} align="center">
          <Badge count={5}>
            <Avatar name="Ada Lovelace" />
          </Badge>
          <Badge dot tone="success">
            <Avatar name="Alan Turing" />
          </Badge>
          <Tag tone="info">Beta</Tag>
          <Tag tone="danger" closable onClose={() => undefined}>
            Blocking
          </Tag>
        </Stack>
      </Example>

      <Example title="Alert" description="Semantic callouts with actions.">
        <Stack gap={2}>
          <Alert tone="info" title="Heads up">
            Deployments resume at 09:00 UTC.
          </Alert>
          <Alert tone="warning" title="Degraded" closable onClose={() => undefined}>
            Search latency is elevated in one region.
          </Alert>
          <Alert tone="danger" title="Failed">
            The nightly backup did not complete.
          </Alert>
        </Stack>
      </Example>

      <Example
        title="Skeleton, Empty"
        description="Loading placeholders and empty states."
      >
        <Stack gap={3}>
          <Stack gap={2}>
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-32" />
          </Stack>
          <Empty
            title="No projects yet"
            description="Create your first project to get started."
          />
        </Stack>
      </Example>
    </Stack>
  );
}
