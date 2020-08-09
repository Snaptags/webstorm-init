import React from "react";
import fs from "fs-extra";
import pjson from "pjson";
import { Box, Spacer, Text } from "ink";

import { Error } from "../Error";
import { Processing } from "../Processing";
import { Success } from "../Success";
import { version } from "../../version";
import { copyTemplate, IDEA } from "../../copyTemplate";

type appState = "initializing" | "copying" | "processing" | "success" | "error";

export interface AppProps {
  force: boolean;
}

export const App = ({ force }: AppProps) => {
  const [state, setState] = React.useState<appState>("initializing");
  const [template, setTemplate] = React.useState("");
  React.useEffect(() => {
    fs.pathExists(IDEA).then((exists) => {
      setState(exists ? "error" : "copying");
    });
  }, []);

  React.useEffect(() => {
    if (state === "copying") {
      setState("processing");
      copyTemplate()
        .then((template) => {
          setTemplate(template);
          setState("success");
        })
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
      <Text color="blue">webstorm-init {version}</Text>
      <Spacer />
      {(state === "processing" || state === "initializing") && <Processing />}
      {state === "success" && <Success template={template} />}
      {state === "error" && <Error {...errorProps} />}
    </Box>
  );
};
