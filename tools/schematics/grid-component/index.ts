import { chain, Rule, Tree } from '@angular-devkit/schematics';
import { addModuleImportToModule, buildComponent } from '@angular/cdk/schematics/utils';
import { getProjectPath } from '../utils';

interface Schema {
  name: string;
  project: string;
  fieldNames: string;
  path?: string;
  module?: string;
  fieldNamesList?: string[];
}

export default function(schema: Schema): Rule {
  return (tree: Tree) => {
    const options = {
      ...schema,
      name: `${schema.name}Grid`,
      path: getProjectPath(tree, schema.project),
      fieldNamesList: schema.fieldNames.split(',').map(s => s.trim()) || []
    };

    return chain([
      buildComponent(options, {
        template: './__path__/__name@dasherize__/__name@dasherize__.component.html.template',
        source: './__path__/__name@dasherize__/__name@dasherize__.component.ts.template'
      }),
      // buildComponent will fill in the module path
      addModuleImports(options)
    ]);
  };
}

function addModuleImports(options: Schema): Rule {
  return (host: Tree) => {
    addModuleImportToModule(host, options.module, 'FlexLayoutModule', '@angular/flex-layout');
    addModuleImportToModule(host, options.module, 'MatTableModule', '@angular/material/table');
    addModuleImportToModule(host, options.module, 'MatPaginatorModule', '@angular/material/paginator');

    return host;
  };
}
