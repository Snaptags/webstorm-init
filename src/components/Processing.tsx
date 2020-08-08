import React from "react";
import { Spacer, Text } from "ink";
import Spinner from "ink-spinner";

export const Processing = () => {
  return (
    <>
      <Text color="blue" bold>
        processing <Spinner type="dots" />
      </Text>
      <Spacer />
    </>
  );
};
