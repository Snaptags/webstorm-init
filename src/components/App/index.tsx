import React from "react";
import fs from "fs-extra";
import pjson from "pjson";
import { Box, Spacer, Text } from "ink";

import { Error } from "../Error";
import { Processing } from "../Processing";
import { Success } from "../Success";

type appState = "initializing" | "copying" | "processing" | "success" | "error";

const IDEA = ".ideas"; // TODO: this is a debugging folder name
const template = `${process.cwd()}/.idea_template`;

export interface AppProps {
  force: boolean;
}
export const App = ({ force }: AppProps) => {
  const [state, setState] = React.useState<appState>("initializing");
  React.useEffect(() => {
    fs.pathExists(IDEA).then((exists) => {
      setState(exists ? "error" : "copying");
    });
  }, []);

  React.useEffect(() => {
    if (state === "copying") {
      setState("processing");
      fs.copy(template, IDEA)
        .then(() => setState("success"))
        .catch((err) => console.error(err));
    }
  }, [state]);

  const errorProps = {
    confirm: force,
    idea: IDEA,
    onConfirm: () => setState("copying"),
    scriptName: pjson.name,
  };

  return (
    <Box flexDirection={"column"} height={5}>
      <Text color="blue">webstorm-init v{pjson.version}</Text>
      <Spacer />
      {(state === "processing" || state === "initializing") && <Processing />}
      {state === "success" && <Success />}
      {state === "error" && <Error {...errorProps} />}
    </Box>
  );
};
