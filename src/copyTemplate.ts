import fs from "fs-extra";
import glob from "glob-promise";
import path from "path";
import { replaceInFile } from "replace-in-file";

export const IDEA = ".idea";
const workingDir = process.cwd();
const template = `${workingDir}/.idea_template/.idea`;
const project = path.basename(workingDir);
const workspace = `${IDEA}/workspace.xml`;
const iml = `${IDEA}/${project}.iml`;

export const copyTemplate = (): Promise<unknown> => {
  const getProjectId = () => {
    if (fs.pathExistsSync(workspace)) {
      const file = fs.readFileSync(workspace, { encoding: "utf8" });
      const match = file.match(/<component name="ProjectId" id="(.*)" ?\/>/);
      if (match && match.length > 1) {
        return match[1];
      }
    }
    return "";
  };

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

  const addProjectId = (projectId: string): Promise<unknown> => {
    const options = {
      files: workspace,
      from: /<\/project>/,
      to: `<component name="ProjectId" id="${projectId}" /></project>`,
    };
    return replaceInFile(options);
  };

  const setProjectId = (projectId: string) => () => {
    const options = {
      files: workspace,
      from: /<component name="ProjectId" id=".*" ?\/>/,
      to: `<component name="ProjectId" id="${projectId}" />`,
    };
    replaceInFile(options).then((results) => {
      if (results.length === 1 && !results[0].hasChanged) {
        // the template workspace file did not include a projectId
        // re-add it instead:
        return addProjectId(projectId);
      }
      return Promise;
    });
  };

  const setNodeModulesPath = () => {
    const options = {
      files: workspace,
      from: /<property name="(.*)" value=".*(.)node_modules(.*)" ?\/>/g,
      to: `<property name="$1" value="${workingDir}$2node_modules$3" />`,
    };
    return replaceInFile(options);
  };

  const processTemplate = (projectId: string) => () => {
    fs.removeSync(iml);
    glob(`${IDEA}/*.iml`)
      .then(renameIml)
      .then(setProjectName)
      .then(setProjectId(projectId))
      .then(setNodeModulesPath)
      .then();
  };

  const projectId = getProjectId(); // retain the target project's id
  return fs.copy(template, IDEA).then(processTemplate(projectId));
};
