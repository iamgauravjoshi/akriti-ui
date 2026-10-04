import { useState } from "react";
import {
  Combobox,
  DatePicker,
  OtpInput,
  Slider,
  Stack,
  Text,
  Upload,
} from "..";
import { Example } from "./Example";

const frameworks = [
  { label: "React", value: "react" },
  { label: "Vue", value: "vue" },
  { label: "Svelte", value: "svelte" },
  { label: "Solid", value: "solid" },
];

export default function EntryDemo() {
  const [volume, setVolume] = useState(40);
  return (
    <Stack gap={6}>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Example title="Slider" description="Native range semantics.">
          <Slider label="Volume" value={volume} onValueChange={setVolume} />
        </Example>

        <Example title="Combobox" description="Type-to-filter selection.">
          <Combobox
            label="Framework"
            options={frameworks}
            placeholder="Pick a framework..."
            clearable
          />
        </Example>

        <Example title="Date picker" description="Calendar popover.">
          <DatePicker label="Start date" clearable />
        </Example>

        <Example
          title="One-time code"
          description="Auto-advancing boxes with paste support."
        >
          <OtpInput label="Verification code" length={6} onComplete={() => undefined} />
          <Text size="sm" tone="muted">
            Type or paste six digits; completion fires automatically.
          </Text>
        </Example>
      </div>

      <Example title="Upload" description="Drag-and-drop with file list.">
        <Upload
          multiple
          maxFiles={3}
          label="Drop screenshots here"
          onFilesChange={() => undefined}
        />
      </Example>
    </Stack>
  );
}
