import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Palette, Rocket } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle, Stack, Text } from "../..";

const guides = [
  {
    to: "/docs/getting-started",
    icon: Rocket,
    title: "Getting Started",
    body: "Install the package, add the stylesheet, and render your first Button in five minutes.",
  },
  {
    to: "/docs/theming",
    icon: Palette,
    title: "Theming",
    body: "Semantic tokens, light/dark/system modes, and custom themes with createTheme.",
  },
  {
    to: "/components/buttons",
    icon: BookOpen,
    title: "Component guides",
    body: "Every component page pairs live, interactive demos with its props and behavior.",
  },
];

export default function DocsHome() {
  return (
    <Stack gap={6}>
      <Text>
        Akriti UI is a themed, accessible React component library. This guide
        walks you from installation to custom themes, step by step. Start
        with getting started, then theme the system to match your brand.
      </Text>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {guides.map((guide) => (
          <Link key={guide.to} to={guide.to} className="group block h-full">
            <Card className="h-full transition-all group-hover:-translate-y-0.5 group-hover:border-primary/40 group-hover:shadow-md">
              <CardHeader>
                <span className="mb-1 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <guide.icon size={18} aria-hidden />
                </span>
                <CardTitle className="flex items-center gap-1.5">
                  {guide.title}
                  <ArrowRight
                    size={14}
                    aria-hidden
                    className="text-muted-foreground opacity-0 transition-all group-hover:translate-x-0.5 group-hover:text-primary group-hover:opacity-100"
                  />
                </CardTitle>
                <CardDescription>{guide.body}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </Stack>
  );
}
