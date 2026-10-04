import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle, Text } from "..";
import { routesFor } from "./site";

export default function ComponentsHome() {
  const pages = routesFor("components").filter((route) => route.to !== "/components");
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {pages.map((page) => (
        <Link key={page.to} to={page.to} className="group block h-full">
          <Card className="h-full transition-all group-hover:-translate-y-0.5 group-hover:border-primary/40 group-hover:shadow-md">
            <CardHeader>
              <span className="mb-1 flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary">
                <page.icon size={18} aria-hidden />
              </span>
              <CardTitle className="flex items-center gap-1.5">
                {page.label}
                <ArrowRight
                  size={14}
                  aria-hidden
                  className="text-muted-foreground opacity-0 transition-all group-hover:translate-x-0.5 group-hover:text-primary group-hover:opacity-100"
                />
              </CardTitle>
              <CardDescription>{page.description}</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      ))}
      <div className="sm:col-span-2">
        <Text tone="muted" size="sm">
          New here? Start with the{" "}
          <Link to="/docs/getting-started" className="text-primary hover:underline">
            getting-started guide
          </Link>
          .
        </Text>
      </div>
    </div>
  );
}
