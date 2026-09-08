import { createContext, useContext } from "react";

export type FormFieldContextValue = {
  name: string;
  id: string;
  descriptionId: string;
  errorId: string;
  error?: string;
};

const FormFieldContext = createContext<FormFieldContextValue | null>(null);

export const FormFieldProvider = FormFieldContext.Provider;

export function useFormField() {
  return useContext(FormFieldContext);
}
