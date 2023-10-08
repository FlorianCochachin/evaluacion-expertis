class DeducibleTaller {

    constructor( texto ) {
        this.deducible = this.extraerDeducible(texto);
        this.copago = this.extraerCopado(texto);
        this.moneda = this.extraerMoneda(texto);
        this.tipo = this.extraerTipoTaller(texto);
        this.marca = this.extraerMarca(texto);
        this.taller = this.extraerTaller(texto);
    }

    extraerMoneda( texto ) {
        const regexMoneda = /(US\$|S\/\.)/;
        const monedas = regexMoneda.exec(texto);
        const [ moneda ] = [ ...new Set(monedas) ]; 
        return moneda.replace('$','D');
    }

    extraerDeducible( texto ) {
        const regexDeducible = /\d+\.?\d*%/;
        const deducibles = regexDeducible.exec(texto);
        const [ deducible ] = [ ...new Set(deducibles) ];
        const resultado = deducible.replace('%','');
        return parseInt(resultado);
    }

    extraerTipoTaller( texto ) {
        const regexTipoTaller = /Multimarca/gi;
        const tipoTalleres = regexTipoTaller.exec(texto);
        let tipoTaller = 'NO TIPO';
        if(tipoTalleres) {
            [ tipoTaller ] = [ ...new Set(tipoTalleres) ];
            tipoTaller = tipoTaller.toLowerCase().replace(/(?:^|\s)\w/g, (letra) => {
                return letra.toUpperCase();
            });
        }
        
        return tipoTaller;
    }

    extraerCopado( texto ) {
        const regexCopago = /(US\$|S\/\.)\s?\d+\.?\d*/g;
        const copagos = texto.match(regexCopago);
        const montoCopago = copagos.map( copago => {
            copago = copago.replace(/US\$ ?/g,'');
            const monto = parseFloat(copago);
            return { copago, monto }
        });

        const resultado = montoCopago.reduce((minimo, objeto) => {
            return objeto.monto < minimo.monto ? objeto : minimo;
        }, montoCopago[0]);

        return resultado.monto;
    }

    extraerTaller( texto ) {
        let resultado = 'NO TALLER';
        const regexTalleres = /Nissan Maquinarias/;
        const talleres = regexTalleres.exec(texto);
        if(talleres) {
            [ resultado ] = [ ...new Set(talleres) ];
        }
        return resultado;
    }

    extraerMarca( texto ) {
        const regexTipoTaller = /Multimarca/;
        
        return 'NO MARCA';
    }

}

class Taller {

    constructor(data) {
        this.textos = data;
    }

    obtenerDeducibles () {
        this.textos = this.textos.replace('Los siniestros', 'Por evento');
        this.textos = this.textos.replace(/Ausencia de control/g, 'Por evento');
        let eventos = this.textos.split(/Por evento/gi);
        if(eventos.length === 1) {
            const condicion = true;
            const nuevoTexto = this.textos.replace(/\d+\.?\d*% del monto (a indemnizar|del siniestro)/g, (match, grupo1) => {
                if (condicion) {
                    return "Por evento, " + match;
                } else {
                    return match;
                }
            });
            this.textos = nuevoTexto;
            eventos = this.textos.split(/Por evento/gi);
            eventos = eventos.filter(texto => {
                const posicion = texto.search(/talleres/gi);
                return posicion !== -1 ? true : false;  
            });
        }
        else {
            eventos.shift();
        }

        return eventos.map(texto => new DeducibleTaller(texto));
    }

}

module.exports = {
    Taller
};
