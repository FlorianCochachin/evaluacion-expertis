const { Taller } = require('./models/Taller')
class BuscadorTallaresService {

    static conversorDeducibles( request ) {
        const { text } = request;
        const taller = new Taller(text);
        const payload = taller.obtenerDeducibles();
        return { payload }
    }

}

module.exports = BuscadorTallaresService;
