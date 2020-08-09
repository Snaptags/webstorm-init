# webstorm-init

CLI tool to write initial WebStorm settings into a new project

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
     --------------- | ----------------------------------------------------------------
     -f, --force     | prompt to overwrite existing WebStorm config folder
                     |
     -h, --help      | show built-in help page
                     |
     -t, --template  | path to be used as template.
                     | Defaults to the user's home directory, or the built-in template,
                     | if ~/.idea_template does not exist.
                     |
     -v, --version   | show version info

## Limitations

WebStorm manages a **second** workspace file in your profile directory to manage
open files and folders opened in the project browser. These files need a project specific unique ID. webstorm-init cannot recreate this ID, i.e. it will be removed from the project settings and WebStorm will start with a blank view and a collapsed project tree.

## Disclaimer

Using this tool will overwrite some or all files in the current folder's `.idea` directory! Use at your own risk.

## License

Licensed under MIT
