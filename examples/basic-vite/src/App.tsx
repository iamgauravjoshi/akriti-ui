import { Button, Card, CardContent, CardHeader, CardTitle, ThemeProvider } from "akriti-ui";
import "akriti-ui/style.css";

export default function App() {
  return (
    <ThemeProvider>
      <main style={{ padding: 32, fontFamily: "system-ui, sans-serif" }}>
        <Card style={{ maxWidth: 480 }}>
          <CardHeader>
            <CardTitle>akriti-ui consumer check</CardTitle>
          </CardHeader>
          <CardContent>
            <p>If this card is styled, the package CSS loaded.</p>
            <p>
              <Button
                onClick={() => window.alert("akriti-ui works externally")}
              >
                Click me
              </Button>
            </p>
          </CardContent>
        </Card>
      </main>
    </ThemeProvider>
  );
}
