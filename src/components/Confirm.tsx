import React from "react";
import { Box, Spacer, Text, useApp, useInput } from "ink";
import Spinner from "ink-spinner";
import { Error } from "./Error";

export type ConfirmProps = {
  confirm: boolean;
  idea: string;
  onConfirm: () => void;
  scriptName: string;
};

export const Confirm = ({
  confirm,
  idea,
  onConfirm,
  scriptName,
}: ConfirmProps): JSX.Element => {
  const [showHint, setShowHint] = React.useState(!confirm);
  const { exit } = useApp();
  if (confirm) {
    useInput((input) => {
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
      <Error>
        <Text italic inverse>
          {" "}
          {idea}{" "}
        </Text>{" "}
        folder already exists in project {process.cwd()}
      </Error>
      <Spacer />
      <Box>{showHint ? <Hint /> : <Confirm />}</Box>
    </>
  );
};
