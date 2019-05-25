const { INJECT_SCHEMA, Module } = isolex;

const { ExampleService } = require('./example-svc');

/**
 * This is an example DI module, responsible for binding service classes.
 */
class ExampleModule extends Module {
  async configure(options) {
    await super.configure(options);

    // load and register a sub-schema
    const schema = await options.container.create(INJECT_SCHEMA);
    schema.addSchema('example', require('./schema.json'));
    
    // bind a service by name
    this.bind('example-service').toConstructor(ExampleService);

    options.logger.debug(options, 'example module configured');
  }
}

module.exports = {
  'example-module': ExampleModule,
};
