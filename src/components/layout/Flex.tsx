import { forwardRef } from "react";
import { Stack, type StackProps } from "./Stack";

export type FlexProps = StackProps;

export const Flex = forwardRef<HTMLElement, FlexProps>(
  ({ direction = "row", ...props }, ref) => {
    return <Stack ref={ref} direction={direction} {...props} />;
  },
);

Flex.displayName = "Flex";
