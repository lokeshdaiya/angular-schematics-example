import { strings } from '@angular-devkit/core';
import { chain, filter, schematic, Rule, Tree } from '@angular-devkit/schematics';
import { applyLintFix } from '@schematics/angular/utility/lint-fix';
import { addRouteToProjectModule, addProviderToProjectModule } from '../utils';
import { appendHtmlElementToTag } from './html-utils';

interface Schema {
  name: string;
  project: string;
  fieldNames: string;
  theme?: boolean;
}

export default function(schema: Schema): Rule {
  schema.project = `features-${schema.name}`;
  return chain([
    schematic('feature-custom', schema),
    filter(path => path.indexOf(`/lib/${schema.name}/`) == -1),
    schematic('master-detail-component', schema),
    addMainRoute(schema),
    addMissingProvider(schema),
    addMenubarLink(schema),
    applyLintFix(`/libs/features/${schema.name}`)
  ]);

  function addMainRoute(schema: Schema): Rule {
    return (tree: Tree) => {
      const route = `{ path: '', pathMatch: 'full', component: ${strings.classify(schema.name)}Component }`;
      addRouteToProjectModule(tree, schema.project, route);
      return tree;
    };
  }

  function addMissingProvider(schema: Schema): Rule {
    return (tree: Tree) => {
      addProviderToProjectModule(tree, schema.project, 'DataPersistence', '@nrwl/angular');
      return tree;
    };
  }

  function addMenubarLink(schema: Schema): Rule {
    return (tree: Tree) => {
      appendHtmlElementToTag(
        tree,
        '/apps/web/src/app/app.component.html',
        'nav',
        `<a  routerLink="${schema.name}" routerLinkActive="item-active">${strings.capitalize(schema.name)}</a>`
      );
      return tree;
    };
  }
}
