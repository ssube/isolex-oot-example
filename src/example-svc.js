const { BotService } = require('isolex');

class ExampleService extends BotService {
  constructor(options) {
    super(options);

    this.logger = options.logger;
    this.logger.debug(options, 'created example service');
  }

  async start() {
    await super.start();

    this.logger.debug('started example service');
  }

  async stop() {
    await super.stop();

    this.logger.debug('stopped example service');
  }
}

module.exports = {
  ExampleService,
};
