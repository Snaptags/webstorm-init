import parseArgs from "minimist";
import React from "react";
import { render } from "ink";
import { Help } from "./components/Help";
import { App } from "./components/App";

main();

function main() {
  const argv: ParsedArgs = parseArgs(process.argv.slice(2), {
    boolean: ["help", "force"],
    alias: { h: "help", f: "force" },
  });
  const showHelp = argv.h;
  const force = !!argv.f;

  if (showHelp) {
    render(<Help />);
  } else {
    render(<App force={force} />, { exitOnCtrlC: false });
  }
}

interface ParsedArgs {
  _: (string | number)[];
  help?: boolean;
  h?: boolean;
  force?: boolean;
  f?: boolean;
}
