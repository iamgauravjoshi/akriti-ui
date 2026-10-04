import { useState } from "react";
import {
  Combobox,
  DatePicker,
  Heading,
  OtpInput,
  Slider,
  Stack,
  Text,
  Upload,
} from "..";

const frameworks = [
  { label: "React", value: "react" },
  { label: "Vue", value: "vue" },
  { label: "Svelte", value: "svelte" },
  { label: "Solid", value: "solid" },
];

export default function EntryDemo() {
  const [volume, setVolume] = useState(40);
  return (
    <Stack gap={8}>
      <section className="max-w-md">
        <Heading level={2}>Slider</Heading>
        <Slider label="Volume" value={volume} onValueChange={setVolume} />
      </section>

      <section className="max-w-md">
        <Heading level={2}>Combobox</Heading>
        <Combobox
          label="Framework"
          options={frameworks}
          placeholder="Pick a framework..."
          clearable
        />
      </section>

      <section className="max-w-md">
        <Heading level={2}>Date picker</Heading>
        <DatePicker label="Start date" clearable />
      </section>

      <section className="max-w-md">
        <Heading level={2}>One-time code</Heading>
        <OtpInput label="Verification code" length={6} onComplete={() => undefined} />
        <Text size="sm" tone="muted">
          Type or paste six digits; completion fires automatically.
        </Text>
      </section>

      <section className="max-w-md">
        <Heading level={2}>Upload</Heading>
        <Upload
          multiple
          maxFiles={3}
          label="Drop screenshots here"
          onFilesChange={() => undefined}
        />
      </section>
    </Stack>
  );
}
