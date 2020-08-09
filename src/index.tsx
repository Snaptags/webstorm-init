import parseArgs from "minimist";
import React from "react";
import { render, useApp } from "ink";
import { Help } from "./components/Help";
import { App } from "./components/App";
import { version } from "./version";

main();

function main() {
  const argv: ParsedArgs = parseArgs(process.argv.slice(2), {
    boolean: ["force", "help", "version"],
    alias: { f: "force", h: "help", v: "version" },
  });
  const showHelp = argv.h;
  const force = !!argv.f;
  const showVersion = argv.v;

  if (showVersion) {
    console.log(version);
    return;
  }

  if (showHelp) {
    render(<Help />);
  } else {
    render(<App force={force} />, { exitOnCtrlC: false });
  }
}

interface ParsedArgs {
  _: (string | number)[];
  force?: boolean;
  f?: boolean;
  help?: boolean;
  h?: boolean;
  version?: boolean;
  v?: boolean;
}
