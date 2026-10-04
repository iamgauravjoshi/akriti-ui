import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormError,
  FormField,
  FormLabel,
  Input,
  PasswordInput,
  Select,
  Textarea,
  useToast,
} from "..";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Minimum 8 characters"),
  role: z.string().min(1, "Select a role"),
  bio: z.string().optional(),
});

type Values = z.infer<typeof schema>;

export default function RhfFormDemo() {
  const toast = useToast();
  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "",
      bio: "",
    },
  });

  return (
    <div className="mx-auto max-w-xl rounded-xl border border-border bg-surface p-6 shadow-sm">
      <Form
        form={form}
        onSubmit={(values) => {
          toast.success("Profile saved", { description: values.email });
        }}
      >
        <FormField name="name">
          <FormLabel required>Name</FormLabel>
          <FormControl>
            <Input placeholder="Ada Lovelace" />
          </FormControl>
          <FormError />
        </FormField>

        <FormField name="email">
          <FormLabel required>Email</FormLabel>
          <FormControl>
            <Input type="email" placeholder="ada@example.com" />
          </FormControl>
          <FormDescription>We will never share your email.</FormDescription>
          <FormError />
        </FormField>

        <FormField name="password">
          <FormLabel required>Password</FormLabel>
          <FormControl>
            <PasswordInput />
          </FormControl>
          <FormError />
        </FormField>

        <FormField name="role">
          <FormLabel required>Role</FormLabel>
          <Controller
            name="role"
            control={form.control}
            render={({ field, fieldState }) => (
              <Select
                options={[
                  { value: "admin", label: "Admin" },
                  { value: "editor", label: "Editor" },
                  { value: "viewer", label: "Viewer" },
                ]}
                value={field.value}
                onChange={field.onChange}
                placeholder="Select a role"
                error={fieldState.error?.message}
                searchable
              />
            )}
          />
          <FormError />
        </FormField>

        <FormField name="bio">
          <FormLabel>Bio</FormLabel>
          <FormControl>
            <Textarea placeholder="Optional notes" />
          </FormControl>
        </FormField>

        <Button type="submit" loading={form.formState.isSubmitting} fullWidth>
          Save profile
        </Button>
      </Form>
    </div>
  );
}
