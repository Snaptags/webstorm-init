import fs from "fs-extra";
import glob from "glob-promise";
import path from "path";
import { replaceInFile } from "replace-in-file";

export const IDEA = ".idea";
const workingDir = process.cwd();
const template = `${workingDir}/.idea_template/.idea`;
const project = path.basename(workingDir);
const iml = `${IDEA}/${project}.iml`;

const renameIml = (files: string[]) => {
  if (files.length !== 1) {
    throw new RangeError("Invalid project template, check *.iml file");
  }
  return fs.move(files[0], iml);
};

const setProjectName = () => {
  const options = {
    files: `${IDEA}/modules.xml`,
    from: /\/\.idea\/[^"]*\.iml/g,
    to: `/.idea/${project}.iml`,
  };
  return replaceInFile(options);
};

const setNodeModulesPath = () => {
  const options = {
    files: `${IDEA}/workspace.xml`,
    from: /<property name="(.*)" value=".*(.)node_modules(.*)" ?\/>/g,
    to: `<property name="$1" value="${workingDir}$2node_modules$3" />`,
  };
  return replaceInFile(options);
};

const processTemplate = () => {
  fs.removeSync(iml);
  glob(`${IDEA}/*.iml`)
    .then(renameIml)
    .then(setProjectName)
    .then(setNodeModulesPath)
    .then();
};

export const copyTemplate = (): Promise<unknown> => {
  return fs.copy(template, IDEA).then(processTemplate);
};
