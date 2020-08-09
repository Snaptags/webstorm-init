import React from "react";
import { Text, Box, Spacer } from "ink";
import { version } from "../version";

export const Help = () => {
  return (
    <Box flexDirection="column" alignItems="center" height={7} width={60}>
      <Text color="blue">webstorm-init {version}</Text>
      <Spacer />
      <Text>
        CLI tool to write initial WebStorm settings into a new project
      </Text>
      <Box margin={1}>
        <Text bold>Alias: wsi</Text>
      </Box>
    </Box>
  );
};
