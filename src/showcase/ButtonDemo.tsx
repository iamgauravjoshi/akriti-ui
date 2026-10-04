import { useState } from "react";
import {
  ArrowRight,
  Download,
  Edit,
  Plus,
  Save,
  Search,
  Send,
  Trash2,
  Upload,
} from "lucide-react";
import { Button, CloseButton, IconButton, Switch } from "..";
import { Example } from "./Example";

export default function ButtonDemo() {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});
  const [enabled, setEnabled] = useState(true);

  const handleButtonClick = (buttonId: string) => {
    setLoadingStates((prev) => ({ ...prev, [buttonId]: true }));
    window.setTimeout(() => {
      setLoadingStates((prev) => ({ ...prev, [buttonId]: false }));
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <Example title="Variants" description="Six visual styles for different emphasis.">
        <div className="flex flex-wrap gap-3">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="text">Text</Button>
          <Button variant="link">Link</Button>
        </div>
      </Example>

      <Example title="Intents" description="Semantic coloring via intent.">
        <div className="flex flex-wrap gap-3">
          <Button intent="default">Default</Button>
          <Button intent="success">Success</Button>
          <Button intent="warning">Warning</Button>
          <Button intent="error">Danger</Button>
          <Button intent="info">Info</Button>
        </div>
      </Example>

      <Example title="Sizes" description="Five sizes from xs to xl.">
        <div className="flex flex-wrap items-end gap-3">
          <Button size="xs">Extra Small</Button>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button size="xl">Extra Large</Button>
        </div>
      </Example>

      <Example
        title="Icons and loading"
        description="Leading/trailing icons, async loading, and disabled states."
      >
        <div className="flex flex-wrap gap-3">
          <Button leftIcon={<Download size={16} />}>Download</Button>
          <Button rightIcon={<ArrowRight size={16} />}>Continue</Button>
          <Button leftIcon={<Plus size={16} />}>Add Item</Button>
          <Button leftIcon={<Save size={16} />} intent="success">
            Save
          </Button>
          <Button leftIcon={<Trash2 size={16} />} intent="error">
            Delete
          </Button>
          <Button leftIcon={<Edit size={16} />} variant="outline">
            Edit
          </Button>
          <Button leftIcon={<Search size={16} />} variant="ghost">
            Search
          </Button>
          <Button leftIcon={<Send size={16} />} rightIcon={<ArrowRight size={16} />}>
            Send
          </Button>
          <Button leftIcon={<Upload size={16} />} variant="secondary">
            Upload
          </Button>
          <Button
            loading={loadingStates.primary}
            loadingText="Processing..."
            onClick={() => handleButtonClick("primary")}
          >
            Primary action
          </Button>
          <Button disabled>Disabled</Button>
          <Button fullWidth>Full width</Button>
        </div>
      </Example>

      <Example title="Icon and close buttons" description="Square icon actions.">
        <div className="flex flex-wrap items-center gap-3">
          <IconButton aria-label="Settings" variant="outline">
            <Search size={16} />
          </IconButton>
          <CloseButton onClose={() => undefined} />
          <CloseButton intent="error" onClose={() => undefined} />
        </div>
      </Example>

      <Example title="Switch" description="Toggles with intents and loading.">
        <div className="flex flex-wrap gap-6">
          <Switch label="Notifications" checked={enabled} onCheckedChange={setEnabled} />
          <Switch label="Success" intent="success" defaultChecked />
          <Switch label="Disabled" disabled defaultChecked />
          <Switch label="Loading" loading checked />
        </div>
      </Example>
    </div>
  );
}
