import { Button, useToast } from "..";

export default function ToastDemo() {
  const toast = useToast();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="mb-2 text-3xl font-bold">Toast</h1>
        <p className="text-muted-foreground">
          ToastProvider owns notifications only. Modals are no longer launched from useToast.
        </p>
      </header>
      <div className="flex flex-wrap gap-3">
        <Button intent="success" onClick={() => toast.success("Saved", { description: "Profile updated." })}>
          Success
        </Button>
        <Button intent="danger" onClick={() => toast.error("Failed", { description: "Please retry." })}>
          Error
        </Button>
        <Button intent="warning" onClick={() => toast.warning("Check input")}>
          Warning
        </Button>
        <Button intent="info" onClick={() => toast.info("Heads up")}>
          Info
        </Button>
        <Button variant="outline" onClick={() => toast.clearAllToasts()}>
          Clear all
        </Button>
      </div>
    </div>
  );
}
