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
  Heading,
  Progress,
  Skeleton,
  Stack,
  Tag,
  Text,
} from "..";

export default function DisplayDemo() {
  return (
    <Stack gap={8}>
      <section>
        <Heading level={2}>Card</Heading>
        <Card className="max-w-md">
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
      </section>

      <section>
        <Heading level={2}>Badge, Tag, Avatar</Heading>
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
      </section>

      <section>
        <Heading level={2}>Alert</Heading>
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
      </section>

      <section>
        <Heading level={2}>Skeleton, Empty</Heading>
        <Stack gap={2}>
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-4 w-32" />
        </Stack>
        <Empty
          title="No projects yet"
          description="Create your first project to get started."
        />
      </section>
    </Stack>
  );
}
