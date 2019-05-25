const {
  base: {
    BotService,
  },
  inject: {
    INJECT_LOGGER,
  },
  noicejs: {
    Inject,
  },
} = isolex;

class ExampleService extends BotService {
  constructor(options) {
    super(options, 'example#/definitions/example-service');

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
