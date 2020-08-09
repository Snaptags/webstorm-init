import React from "react";
import { Box, Spacer, Text, useApp, useInput } from "ink";
import Spinner from "ink-spinner";

export type ErrorProps = {
  confirm: boolean;
  idea: string;
  onConfirm: () => void;
  scriptName: string;
};

export const Error = ({ confirm, idea, onConfirm, scriptName }: ErrorProps) => {
  const [showHint, setShowHint] = React.useState(!confirm);
  const { exit } = useApp();
  if (confirm) {
    useInput((input, key) => {
      if (input.toLowerCase() === "y") {
        onConfirm();
      } else {
        setShowHint(true); // to remove the prompt
        exit();
      }
    });
  }

  const Confirm = () => (
    <Text>
      Do you really want to overwrite the existing folder? [y/n]{" "}
      <Spinner type="noise" />
    </Text>
  );

  const Hint = () => (
    <Text>
      Use <Text inverse> {scriptName} --force </Text> to overwrite existing
      settings.
    </Text>
  );

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
      <Box>{showHint ? <Hint /> : <Confirm />}</Box>
    </>
  );
};
