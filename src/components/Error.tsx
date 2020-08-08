import React from "react";
import { Box, Spacer, Text } from "ink";

export type ErrorProps = {
  idea: string;
  scriptName: string;
};

export const Error = ({ idea, scriptName }: ErrorProps) => {
  return (
    <>
      <Text color="red" bold>
        ✗{" "}
        <Text italic inverse>
          {" "}
          {idea}{" "}
        </Text>{" "}
        folder already exists in project {process.cwd()}
      </Text>
      <Spacer />
      <Box>
        <Text>
          Use <Text inverse> {scriptName} --force </Text> to overwrite existing
          settings.
        </Text>
      </Box>
    </>
  );
};
