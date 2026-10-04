import { Button, useToast } from "..";
import { Example } from "./Example";

export default function ToastDemo() {
  const toast = useToast();

  return (
    <Example
      title="Trigger toasts"
      description="Success, error, warning, info, and clear-all."
    >
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
    </Example>
  );
}
