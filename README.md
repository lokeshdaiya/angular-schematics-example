# Workspace Schematics Demo

This workspace includes a few sample workspace schematics showing you how to quickly and effectively take advantage of
this tooling framework.

If you're new to schematics, please see the official guides at https://angular.io/guide/schematics and
https://nx.dev/angular/workspace/schematics/using-schematics.

For even more info, here's a YouTube playlist:
https://www.youtube.com/playlist?list=PLYoyvutS096rav9axtNV2lRAcuJhstI_v.

## Included Sample Workspace Schematics

#### feature-base

Generates basic structure of a feature: lib, component, service,an interface for the central entity, and an NgRx feature
state, by chaining external schematics.

#### feature-custom

Customizes the output of _feature-base_ by removing not needed ones and overwriting a file.

#### form-component

Uses templates to generate a basic form component and adds necessary imports to its project's module.

#### grid-component

Uses templates to generate a component containing a mat-table with a paginator, and adds necessary imports to its project's
module.

#### master-detail-component

Generates a form and grid component using existing schematics, then uses templates to generate a new component tying them
together, and adds necessary imports to its project's module.

#### master-detail-feature

Generates a feature lib, complete with a master-detail component, and linked to from the app's main navigation bar.

## General Instructions

#### To execute a workspace schematic

Run: `npm run workspace-schematic $schematicName`

#### To execute any other (library) schematic

Run: `ng g [$collection:]$schematicName [$params]`, where:

- `$collection` can be e.g. _@schematics/angular_, _@nrwl/angular_, ... When omitted, the default
  collection (defined in angular.json > cli) is used.
- `$schematicName` can be e.g. _app_, _lib_, _component_, _service_, _interface_, _ngrx_, ...
- `$params` are defined by the schematic itself.

Best way to discover schematics, as well as their parameters is through the Nx Console's _Generate_ function.

#### To generate a new workspace schematic

Run: `ng g workspace-schematic $schematicName`

## Visual Studio Code Extensions

#### Nx Console by Nrwl

Nx Console's _Generate_ command will help you discover schematics in external libraries. It will also make it easier to
input schematic parameters, lowering the barrier to entry and enhancing DX.

Install nrwl.angular-console: https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console

#### AST Explorer

Deterministically modifying code is much easier by using the utility modules listed below, but when writing custom
TypeScript AST transformation code this extension can help visualize the AST right from the IDE. It can also come in
useful when writing custom TSLint rules and fixers.

To explore ASTs of file types other than TypeScript, as well as discover libraries for parsing them, see
https://astexplorer.net.

Install ddot.vscode-ast: https://marketplace.visualstudio.com/items?itemName=ddot.vscode-ast

## External Schematics

- `@schematics/angular`: https://github.com/angular/angular-cli/tree/master/packages/schematics/angular
- `@angular/cdk`: https://github.com/angular/components/tree/master/src/cdk/schematics
- `@angular/material`: https://github.com/angular/components/tree/master/src/material/schematics
- `@nrwl/angular`: https://github.com/nrwl/nx/tree/master/packages/angular/src/schematics
- `@nrwl/workspace`: https://github.com/nrwl/nx/tree/master/packages/workspace/src/schematics

## Code Modification Utilities

Modules from these packages can be imported and used from your own schematics to accomplish various common tasks, such as
navigating workspaces, manipulating packages, and adding module imports, declarations, providers, etc:

- `@schematics/angular/utility` : https://github.com/angular/angular-cli/tree/master/packages/schematics/angular/utility
- `@angular/cdk/schematics/utils` : https://github.com/angular/components/tree/master/src/cdk/schematics/utils
- `@nrwl/angular/src/utils` : https://github.com/nrwl/nx/tree/master/packages/angular/src/utils
- `@nrwl/workspace/src/utils` : https://github.com/nrwl/nx/tree/master/packages/workspace/src/utils
