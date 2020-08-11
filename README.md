# webstorm-init

[![npm version](https://badge.fury.io/js/webstorm-init.svg)](https://badge.fury.io/js/webstorm-init)
![NPM](https://img.shields.io/npm/l/webstorm-init)

CLI tool to write initial WebStorm settings into a new project

## Requirements

The build-in templates may require WebStorm 2020.1 or newer.
NodeJS 10 or newer required. You can use webstorm-init in Windows Powershell, Linux and MacOS.

## Installation

You should install webstorm-init globally to easily access it from any project folder:

```
npm i -g webstorm-init
```

## Usage

- in your shell cd into your project's folder
- run `webstorm-init` or `wsi`

## Options

     Option          | Description
     --------------- | ---------------------------------------------------
     -f, --force     | prompt to overwrite existing WebStorm config folder
                     |
     -h, --help      | show built-in help page
                     |
     -t, --template  | path to be used as template.
                     | Defaults to the user's home directory, or the
                     | built-in template, if ~/.idea_template does not exist.
                     |
     -v, --version   | show version info

## Templates

There are three ways to influence how webstorm-init is setting up the .idea folder:

- use the --template command line parameter to specify a project directory, e.g. \
   `webstorm-init --template c:\dev\myproject`
  or on Linux/Mac:
  `webstorm-init --template ~/dev/myproject`
- create a template folder in your _home_ directory and put a .idea folder there to be used as template:
  `c:\users\myname\.idea_template\.idea`
  or on Linux/Mac:
  `~/.idea_template/.idea`
- skip **both** steps, then webstorm-init uses its built-in template (default)

### Built-In settings

The built-in project settings are rather opinionated and optimized to match my workflows. Use a custom template to define your own settings.

- Language & Frameworks > JavaScript > Prettier:
  - use Prettier package supplied by the project
  - Run for files on code reformat **and** on save
- Language & Frameworks > JavaScript > Code Quality Tools > ESLint:
  - Automatic ESLint configuration
  - Run eslint --fix on save
- Editor > Inspections: Turn **off** all JavaScript and TypeScript inspections
- Editor > Code Style > JavaScript > Imports
  - Merge imports for members of the same module
  - Use paths relative to the project, resource or sources roots
- Editor > Code Style > TypeScript > Imports
  - Use paths relative to tsconfig.json
- Misc: mark the project's `src` folder as _Resource Root_

## Limitations

WebStorm manages a **second** workspace file in your profile directory to manage
open files and folders opened in the project browser. These files need a project specific unique ID.
webstorm-init cannot recreate this ID, i.e. WebStorm will start with a blank view and a collapsed project tree for new projects.
When overwriting existing settings the project id is retained.

## Disclaimer

Using this tool will overwrite some or all files in the current folder's `.idea` directory! Use at your own risk.

## License

Licensed under MIT
