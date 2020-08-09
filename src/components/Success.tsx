import React from "react";
import { Box, Spacer, Text } from "ink";

export interface SuccessProps {
  template: string;
}

export const Success = ({ template }: SuccessProps) => {
  return (
    <>
      <Text color="green">✔ project successfully initialized.</Text>
      <Box marginLeft={3}>
        <Text color="green">[Template used: {template}]</Text>
      </Box>
      <Spacer />
    </>
  );
};
