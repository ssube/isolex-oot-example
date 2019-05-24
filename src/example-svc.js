const { BotService, Inject, INJECT_LOGGER } = isolex;

class ExampleService extends BotService {
  constructor(options) {
    super(options, 'isolex#/definitions/external-service-data');

    this.logger.debug('created example service');
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

Inject(INJECT_LOGGER)(ExampleService);

module.exports = {
  ExampleService,
};
