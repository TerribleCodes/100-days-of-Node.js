# npm Introduction

- Use `www.npmjs.com`.
- Whenever starting a new Node project create a package.json by`npm init`.
- `npm init --yes` can be used to initialize with the default values.
- When we import a package via `npm install <package_name>` package.json update its dependencies with the modules imported.

> `require` function resolves the modules in the given order.

```javascript
    const _ = require('underscore');
```

1. It thinks it's a `core` module.
2. If not it's a `file` or a `folder`.
3. Else it's in `node_modules` folder.

## Source Control Management

- If using a Source Control Management (SCM) like git it's possible to exclude the `node_modules` when sharing the project. 
> Simply add a `.gitignore` and inside that add `node_modules/`.

- This gives the portability to the source code.
- And `package.json` will handle the dependencies when it's required.
> Use `node install` or `node i` to install the missing dependencies.

## Semantic Versioning

```javascript
    {
        "package_name": "^major_version.minor_version.patch_version"
    }
```
> Example: `"mongoose": "^4.5.7"`  
> `major version number` :  A new feature that effects teh whole application. 5.0.0  
> `minor version number` :  New features that doesn't effect the existing API. If there's no bug, `patch version number` will be 0. 4.6.0  
> `patch version number` :  Small bug fixes. 4.5.8  
> `^` or `~` character indicates that the package needs to be changed or not depending on the major and the minor versions. Ex: `"4.5.x"`  


> `npm list` shows the dependencies in a tree view.  
> `npm list --depth=0` gives the relevent.  dependencies of your project.  
> `npm view {{package}}` shows the properties of the package.  
> `npm view {{package}} dependencies` to see the packages.  
> `npm view {{package}} versionss` to see the versions.  

## Installing a specific version of a node package

> `npm install {{package}}@[major].[minor].[patch]`  

## Dealing with the outdated packages

>`npm outdated`  
 - When updating it's crucial to check whether the major versions are different (Current and Latest).  
 - `npm update` will update under the major versions.
  
  - To update the package with major versions, `npm i -g npm-check-updates` then update the `package.json` with `ncu -u` and run `npm install` to install the dependencies.

## Development Dependencirs

 > `npm install jshint --save-dev`  

## Uninstalling a package

> `npm uninstall mongoose`

## Global Packages

> `npm install -g npm`  
> `npm -g outdated` -> lists out the outdated global packages  
> `npm uninstall -g {{package_name}}` -> Uninstalls a relevent global package.  

## Publishing your package to npm registery

> If not registered: `npm adduser`  
> If registered: `npm login`  
> From the same directory where the package exists `npm publish`  
> Then can get the package by `npm i {{package_name}}`  

> To Update the package: Update the minor by `npm version minor`  
> Then `npm publish`  