# npm Introduction

- `www.npmjs.com`.
- Whenever starting a new Node project create a package.json by `npm init`.
- `npm init --yes` can be used to initialize with the default values.
- When we import a package via `npm install <package_name>`, package.json update its dependencies with the modules imported.
- To install the missing dependencies in `node_modules/`, simply run the command `npm install`.

<hr>

 - `require` function resolves the modules in the given order.

```javascript
    const _ = require('underscore');
```

1. It thinks it's a `core` module.
2. If not it's a `file` or a `folder`.
3. Else it's in `node_modules` folder.

## Source Control Management

- If using a Source Control Management (SCM) like git it's possible to exclude the `node_modules` when sharing the project. 
- Simply add a `.gitignore` and inside that add `node_modules/`.
- This gives the portability to the source code.
- And `package.json` will handle the dependencies when it's required.
  Use `node install` or `node i` to install the missing dependencies.

## Semantic Versioning

```javascript
    {
        "package_name": "^major_version.minor_version.patch_version"
    }
```
- Example: `"mongoose": "^4.5.7"`  
- `major version number` :  A new feature that effects the whole application. 5.0.0  
- `minor version number` :  New features that doesn't effect the existing API. If there's no bug, `patch version number` will be 0. 4.6.0  
- `patch version number` :  Small bug fixes. 4.5.8  
- The caret symbol `^` which is located before the Major version number tells npm how to handle the future updates.  
- The tilde symbol `~` relates to the *patch* version updates. Not major or minor.  
> "angular": "^1.3.15" in package.json tells npm that you want either 1.3.15 or a version that is greater than that but still _starts with 1 (it is in the same major range).
- `package.json` records important metadata about the project.
- `package-lock.json` avoids dependency conflicts. And allows future devs to install the same dependencies in the project.

<hr>

- `npm list` shows the dependencies in a tree view.  
- `npm list --depth=0` gives the relevent.  dependencies of your project.  
- `npm view {{package}}` shows the properties of the package.  
- `npm view {{package}} dependencies` to see the packages.  
- `npm view {{package}} versionss` to see the versions.  

## Installing a specific version of a node package

- `npm install {{package}}@[major].[minor].[patch]`  

## Dealing with the outdated packages

- `npm outdated`  
- When updating it's crucial to check whether the major versions are different (Current and Latest).  
- `npm update` will update under the major versions.
  
- To update the package with major versions, `npm i -g npm-check-updates` then update the `package.json` with `ncu -u` and run `npm install` to install the dependencies.

## Development Dependencirs

- `npm install jshint --save-dev`  

## Uninstalling a package

- `npm uninstall mongoose`

## Global Packages

- `npm install -g npm`  
- `npm -g outdated` -> lists out the outdated global packages  
- `npm uninstall -g {{package_name}}` -> Uninstalls a relevent global package.  

## Updating packages

- `npm update`

## Publishing your package to npm registery

- If not registered: `npm adduser`  
- If registered: `npm login`  
- From the same directory where the package exists `npm publish`  
- Then can get the package by `npm i {{package_name}}`  

- To Update the package: Update the minor by `npm version minor`  
- Then `npm publish`  

# Node Package Manager vs Node Package Execute

* npm is node package manager and npx is node package execute.
* npm is used to manage the packages and npx is used to execute the packages.

### Installing packages 

* To install locally, `npm install <package_name>`
* To install globaly, `npm install -g <package_name>`

--save-dev ===> save to develeopment dependencies
--no-save ===> will not added to the package.json
--save-optional ===> save to optional dependencies
--no-optional ===> prevents optional dependencies being dwonloaded

## Running Tasks

```json
{
  "scripts": {
    "watch": "webpack --watch --progress --colors --config webpack.conf.js",
    "dev": "webpack --progress --colors --config webpack.conf.js",
    "prod": "NODE_ENV=production webpack -p --config webpack.conf.js"
  }
}
```

### Publishing a package

1. `npm adduser` or `npm login` and follow the instructions.
2. Create a directory and a `package.json` in it. (cd into the package)
3. Insert the following into the package.json
```json
	{
		"name": "@<username>/<package name>",
		"version": "1.1.0"
	}
```
4. Publish the package using the command `npm publish --access=public`

### NPM Package Updating

* To check for outdated packages`npm outdated`
* `npm update` will not update the major version. 
* `npm install <module>@latest` will install the latest version.

* `npm i -g npm-check-updates` --> Better update approach imo.
* `ncu` --> To see the updates available
* `ncu --upgrade` to update or `ncu --interactive` to enter the interactive mode.

### NPM Scripts

* Inside the package.json,

```json
{
  "scripts": {
    "echo": "echo hello!"
  }
}
```
> npm run echo  --> will give "echo hello!" output  

* `npm run <script_name>`
* Another example
```json
{
	"scripts": {
		"chkupdates":"npm --outdated",
		"deps": "npm list --depth=0"
	}
}
```
> npm run chkupdates  
> npm run deps
