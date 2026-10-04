import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Breadcrumb,
  Heading,
  Pagination,
  Stack,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Text,
} from "..";

export default function NavigationDemo() {
  return (
    <Stack gap={8}>
      <section>
        <Heading level={2}>Breadcrumb</Heading>
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Library", href: "/primitives" },
            { label: "Navigation" },
          ]}
        />
      </section>

      <section>
        <Heading level={2}>Tabs</Heading>
        <Tabs defaultValue="account">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Text size="sm">Manage your profile and preferences.</Text>
          </TabsContent>
          <TabsContent value="security">
            <Text size="sm">Review sessions and two-factor settings.</Text>
          </TabsContent>
        </Tabs>
      </section>

      <section>
        <Heading level={2}>Accordion</Heading>
        <Accordion type="single" collapsible defaultValue="one">
          <AccordionItem value="one">
            <AccordionTrigger>What is Akriti UI?</AccordionTrigger>
            <AccordionContent>
              A themed, accessible React component library.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="two">
            <AccordionTrigger>How do I install it?</AccordionTrigger>
            <AccordionContent>
              Run npm install akriti-ui and import the stylesheet once.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      <section>
        <Heading level={2}>Pagination</Heading>
        <Pagination pageCount={12} defaultPage={4} onPageChange={() => undefined} />
      </section>
    </Stack>
  );
}
