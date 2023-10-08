const BuscadorTallaresService = require('./BuscadorTallaresService');

class ConfiguracionContoller {

  static async handler(event) {

    const { body: { payload } } = event;
    return BuscadorTallaresService.conversorDeducibles(payload);

  }

}

module.exports = ConfiguracionContoller;
