import { chain, filter, schematic, Rule, Tree } from '@angular-devkit/schematics';

export default function(schema: any): Rule {
  return chain([
    // Execute the feature-base schematic to generate the initial file structure
    schematic('feature-base', schema),
    skipTests,
    updateReadme(schema)
  ]);
}

function skipTests(): Rule {
  return filter(path => !path.endsWith('.spec.ts'));
}

function updateReadme(schema: any): Rule {
  return (tree: Tree) =>
    tree.overwrite(`libs/features/${schema.name}/README.md`, `# ${schema.name.toUpperCase()}\r\n**TODO:** Document feature`);
}
