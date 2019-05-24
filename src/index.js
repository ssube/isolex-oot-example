const { Module } = isolex;

const { ExampleService } = require('./example-svc');

class ExampleModule extends Module {
  async configure(options) {
    await super.configure(options);

    options.logger.debug(options, 'example module configured');

    this.bind('example-service').toConstructor(ExampleService);
  }
}

module.exports = {
  'example-module': ExampleModule,
};
