import { chain, externalSchematic, Rule } from '@angular-devkit/schematics';

export default function(schema: any): Rule {
  const featuresDirectory = 'features';
  const featureName = schema.name;
  const projectName = `${featuresDirectory}-${featureName}`;

  return chain([
    // ng g @rnwl/schematics:lib currencies --directory=features --lazy --parentModule=apps/web/src/app/app.module.ts --routing --simpleModuleName --unitTestRunner=none
    // * Generate a library named 'currencies' inside the 'features' directory.
    // * Configure it for lazy loading and add a route to app.module of the app named'web'.
    // * Do not include the directory name in the name of the feature module.
    // * Do not add unit testing support. (For demo purposes only. Always write tests in your real projects!)
    externalSchematic('@nrwl/schematics', 'lib', {
      name: featureName,
      directory: featuresDirectory,
      lazy: true,
      parentModule: 'apps/web/src/app/app.module.ts',
      routing: true,
      simpleModuleName: true,
      unitTestRunner: 'none',
      tags: 'feature'
    }),
    // ng g @nrwl/schematics:component currencies --project=features-currencies --skipTests --theme
    // * Generate a component named 'currencies' in the 'currencies' feature lib.
    // * Include theming support.
    // * Do not add a unit test. (For demo purposes only. Always write tests in your real projects!)
    externalSchematic('@nrwl/schematics', 'component', {
      name: featureName,
      project: projectName,
      theme: true,
      skipTests: true
    }),
    // ng g service --name=currencies --project=features-currencies --skipTests
    // * Generate a service named 'CurrenciesService' in the 'currencies' feature lib.
    // * Do not add a unit test. (For demo purposes only. Always write tests in your real projects!)
    externalSchematic('@schematics/angular', 'service', {
      name: featureName,
      project: projectName,
      skipTests: true
    }),
    // ng g interface --name=currency --project=features-currencies
    // * Generate an interface named 'Currency' in the 'currencies' feature lib.
    externalSchematic('@schematics/angular', 'interface', {
      name: schema.entityName,
      project: projectName
    }),
    // ng g ngrx --name=currencies --module=libs/features/currencies/src/lib/currencies.module.ts --no-minimal --useDataPersistence --facade=false --root=false
    // * Generate an NgRx feature state named 'currencies' in the 'currencies' feature lib.
    // * Generate initial actions, reducers, effects, selectors.
    // * Use Nrwl DataPersistence service, without facades
    externalSchematic('@nrwl/angular', 'ngrx', {
      name: featureName,
      module: `libs/${featuresDirectory}/${featureName}/src/lib/${featureName}.module.ts`,
      noMinimal: true,
      useDataPersistence: true,
      facade: false,
      root: false
    })
  ]);
}
