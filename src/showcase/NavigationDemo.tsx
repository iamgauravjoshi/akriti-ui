import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Breadcrumb,
  Pagination,
  Stack,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Text,
} from "..";
import { Example } from "./Example";

export default function NavigationDemo() {
  return (
    <Stack gap={6}>
      <Example title="Breadcrumb" description="Location hierarchy with current-page semantics.">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Library", href: "/primitives" },
            { label: "Navigation" },
          ]}
        />
      </Example>

      <Example title="Tabs" description="Controlled or uncontrolled tab sets.">
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
      </Example>

      <Example title="Accordion" description="Single or multiple expandable sections.">
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
      </Example>

      <Example title="Pagination" description="Page windows with ellipsis.">
        <Pagination pageCount={12} defaultPage={4} onPageChange={() => undefined} />
      </Example>
    </Stack>
  );
}
