import { Tree, SchematicsException } from '@angular-devkit/schematics';

import { getWorkspace } from '@schematics/angular/utility/config';
import { parseName } from '@schematics/angular/utility/parse-name';
import { findModule } from '@schematics/angular/utility/find-module';
import { addProviderToModule } from '@schematics/angular/utility/ast-utils';
import { InsertChange } from '@schematics/angular/utility/change';

import { getTsSourceFile } from '@nrwl/angular/src/utils/ast-utils';
import { addRoute } from '@nrwl/angular/src/utils/ast-utils';
import { InsertChange as NxInsertChange } from '@nrwl/workspace/src/utils/ast-utils';

export function addProviderToProjectModule(tree: Tree, project: string, symbolName: string, importPath: string): void {
  const { module, source } = getProjectModuleSourceFile(tree, project);
  const changes = addProviderToModule(source, module, symbolName, importPath);

  const recorder = tree.beginUpdate(module);
  for (const change of changes) {
    if (change instanceof InsertChange) {
      recorder.insertLeft(change.pos, change.toAdd);
    }
  }
  tree.commitUpdate(recorder);
}

export function addRouteToProjectModule(tree: Tree, project: string, route: string): void {
  const { module, source } = getProjectModuleSourceFile(tree, project);
  const changes = addRoute(module, source, route);

  const recorder = tree.beginUpdate(module);
  for (const change of changes) {
    if (change instanceof NxInsertChange) {
      recorder.insertLeft(change.pos, change.toAdd);
    }
  }
  tree.commitUpdate(recorder);
}

function getProjectModuleSourceFile(tree: Tree, project: string): any {
  const path = getProjectPath(tree, project);
  const module = findModule(tree, path);
  const source = getTsSourceFile(tree, module);
  return { module, source };
}

export function getProjectPath(tree: Tree, project: string): string {
  const workspaceJson = getWorkspace(tree); // read angular.json
  if (!project) {
    project = workspaceJson.defaultProject;
    if (project) {
      console.warn(`Project not specified, falling back to default: ${project}`);
    } else {
      throw new SchematicsException(`Project not specified and no defaultProject found in angular.json`);
    }
  }
  const projectJson = workspaceJson.projects[project]; // get specified project's node
  if (!projectJson) {
    throw new SchematicsException(`Project not found: ${project}`);
  }
  const appOrLib = projectJson.projectType === 'application' ? 'app' : 'lib';
  return parseName(`/${projectJson.sourceRoot}/${appOrLib}`, project).path;
}
