import React from "react";
import { Text, Box } from "ink";
import pjson from "pjson";

export const Help = () => {
  return (
    <Box flexDirection="column" alignItems="center" width={54}>
      <Box>
        <Text color="green">I am green</Text>
      </Box>
      <Box>
        <Text color="red">I am red</Text>
      </Box>
      <Box>
        <Text color="blue">I am blue</Text>
      </Box>
      <Box>
        <Text italic>I am italic</Text>
      </Box>
      <Box>
        <Text underline>I am underline</Text>
      </Box>
      <Box>
        <Text inverse>I am inversed</Text>
      </Box>
      <Box>
        <Text color="blue" bold>
          {pjson.version}
        </Text>
      </Box>
      <Box margin={1}>
        <Text bold>Alias: wsi</Text>
      </Box>
    </Box>
  );
};
