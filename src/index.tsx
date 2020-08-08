import parseArgs from "minimist";
import React from "react";
import { render } from "ink";
import { Help } from "./components/Help";
import { App } from "./components/App";

main();

function main() {
  const argv: ParsedArgs = parseArgs(process.argv.slice(2), {
    boolean: ["help"],
    string: ["lang"],
    alias: { h: "help", l: "lang" },
  });
  const showHelp = argv.h;

  if (showHelp) {
    render(<Help />);
  } else {
    render(<App />, { exitOnCtrlC: false });
  }
}

interface ParsedArgs {
  _: (string | number)[];
  help?: boolean;
  h?: boolean;
  lang?: string;
  l?: string;
}
