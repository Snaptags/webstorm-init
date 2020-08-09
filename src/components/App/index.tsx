import React from "react";
import fs from "fs-extra";
import pjson from "pjson";
import { Box, Spacer, Text } from "ink";

import { Error } from "../Error";
import { Processing } from "../Processing";
import { Success } from "../Success";
import { version } from "../../version";
import { copyTemplate, IDEA } from "../../copyTemplate";
import { Confirm } from "../Confirm";

type appState =
  | "initializing"
  | "confirm"
  | "copying"
  | "processing"
  | "success"
  | "error";

export interface AppProps {
  force: boolean;
  templatePath: string;
}

export const App = ({ force, templatePath }: AppProps) => {
  const [error, setError] = React.useState("");
  const [state, setState] = React.useState<appState>("initializing");
  const [template, setTemplate] = React.useState("");
  React.useEffect(() => {
    fs.pathExists(IDEA).then((exists) => {
      setState(exists ? "confirm" : "copying");
    });
  }, []);

  React.useEffect(() => {
    if (state === "copying") {
      setState("processing");
      copyTemplate(templatePath)
        .then((template) => {
          setTemplate(template);
          setState("success");
        })
        .catch((err) => {
          setState("error");
          setError(err.toString());
        });
    }
  }, [state]);

  const confirmProps = {
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
      {state === "confirm" && <Confirm {...confirmProps} />}
      {state === "error" && <Error>{error}</Error>}
    </Box>
  );
};
