import React from "react";
import { Text, Box, Spacer } from "ink";
import { version } from "../version";

export const Help = () => {
  const width = 70;
  const options = [
    {
      option: "-f, --force",
      desc: "prompt to overwrite existing WebStorm config folder",
    },
    { option: "-h, --help", desc: "show this help page" },
    {
      option: "-t, --template",
      desc:
        "path to be used as template. Defaults to the user's home directory, or the built-in template, if ~/.idea_template does not exist. Has to be the last argument.",
    },
    { option: "-v, --version", desc: "show version info and exit" },
  ];
  return (
    <>
      <Box flexDirection="column" alignItems="center" height={7} width={width}>
        <Text color="blue">webstorm-init {version}</Text>
        <Spacer />
        <Text>
          CLI tool to write initial WebStorm settings into a new project
        </Text>
        <Text bold>Alias: wsi</Text>
        <Spacer />
      </Box>
      <Box
        flexDirection="column"
        alignItems="flex-start"
        height={3}
        width={width}
      >
        <Text>Usage: webstorm-init [options]</Text>
        <Spacer />
        <Text>Options:</Text>
      </Box>
      {options.map((entry) => (
        <Box
          flexDirection="row"
          alignItems="flex-start"
          width={width}
          key={entry.option}
        >
          <Box marginLeft={2} width="30%">
            <Text>{entry.option}</Text>
          </Box>
          <Box width="70%">
            <Text>{entry.desc}</Text>
          </Box>
        </Box>
      ))}
    </>
  );
};
