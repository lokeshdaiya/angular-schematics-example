import { chain, schematic, Rule, Tree } from '@angular-devkit/schematics';
import { addModuleImportToModule, buildComponent } from '@angular/cdk/schematics/utils';
import { getProjectPath } from '../utils';

interface Schema {
  name: string;
  project: string;
  fieldNames: string;
  theme?: boolean;
  path?: string;
  module?: string;
}

export default function(schema: Schema): Rule {
  return (tree: Tree) => {
    const options = {
      ...schema,
      path: getProjectPath(tree, schema.project)
    };

    return chain([
      schematic('form-component', schema),
      schematic('grid-component', schema),
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
    addModuleImportToModule(host, options.module, 'MatIconModule', '@angular/material/icon');
    addModuleImportToModule(host, options.module, 'MatCardModule', '@angular/material/card');
    return host;
  };
}
