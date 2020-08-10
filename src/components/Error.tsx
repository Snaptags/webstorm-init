import React from "react";
import { Text } from "ink";

export type ErrorProps = {
  children: string | React.ReactNode;
};

export const Error = ({ children }: ErrorProps): JSX.Element => {
  return (
    <>
      <Text color="red" bold>
        ✗ {children || "Unknown error — aborting"}
      </Text>
    </>
  );
};
