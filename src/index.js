const { Module } = require('noicejs');

class ExampleModule extends Module {
  async configure(options) {
    await super.configure(options);

    options.logger.debug(options, 'example module configured');
  }
}

module.exports = {
  'example-module': ExampleModule,
};