import parseArgs from "minimist";
import React from "react";
import { render } from "ink";
import { Help } from "./components/Help";
import { App } from "./components/App";
import { version } from "./version";

main();

function main() {
  const argv: ParsedArgs = parseArgs(process.argv.slice(2), {
    boolean: ["force", "help", "version"],
    string: ["template"],
    alias: { f: "force", h: "help", t: "template", v: "version" },
  });
  const showHelp = argv.h;
  const force = !!argv.f;
  const showVersion = argv.v;
  const template = (argv.t || "").replace(/"/g, ""); // remove quotes from path names

  if (showVersion) {
    console.log(version);
    return;
  }

  if (showHelp) {
    render(<Help />);
  } else {
    render(<App force={force} templatePath={template} />, {
      exitOnCtrlC: false,
    });
  }
}

interface ParsedArgs {
  _: (string | number)[];
  force?: boolean;
  f?: boolean;
  help?: boolean;
  h?: boolean;
  template?: string;
  t?: string;
  version?: boolean;
  v?: boolean;
}
