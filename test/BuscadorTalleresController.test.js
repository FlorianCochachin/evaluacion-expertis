
const { loadFeature, defineFeature } = require('jest-cucumber');
const feature = loadFeature('BuscadorTalleresController.feature', { loadRelativePath: true, errors: true });

const BuscadorTalleresController = require('../src/BuscadorTalleresController');


defineFeature(feature, test => {

    test('Póliza con deducible texto plano', ({ given, when, then }) => {

        let solicitud;
        let respuesta;

        given(/^la póliza tiene un deducible en forma del (.*)$/, (texto) => {
            solicitud = buildSolicitud(texto);
        });

        when('ejecutamos el conversor de deducible', async () => {
            respuesta = await BuscadorTalleresController.handler(solicitud);
        });

        then(/^obtenemos la parametrización del deducible en (.*)$/, (detalle) => {
            console.log(detalle);
            const data_test = require('./data/response');
            expect(respuesta).toEqual(data_test[detalle]);
        });
    });

});

const buildSolicitud = (texto) => {
    const request = require('./data/request');
    return {
        pathParameters: { operation: 'configuracion' },
        headers: {
            Authorization: "eyJraWQiOiJBQWJaalwvSFlVa2Y5Qkc3SHVueXNaeGNlTVNRNjEybW9IVFZTMUUxeWFkdz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIyNzQ0ZmJhYi0zMzRhLTQzOWYtODcwNC1mNGQ1NTBjNGFmM2UiLCJjb2duaXRvOmdyb3VwcyI6WyJSaW1hY19Qb3J0YWxDYW5hbGVzX1BlcnNvbmFfUGVyc29uYV9HcnVwbyJdLCJldmVudF9pZCI6ImVhNTg1ZjFlLTllNTctNDAzYS1iYWE1LTQ2OGY5NzM3ZDNjNSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2NDU0NjMxMjIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTIuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0yX1V2aEVzV09QSiIsImV4cCI6MTY0NTQ2NjcyMiwiaWF0IjoxNjQ1NDYzMTIyLCJqdGkiOiIwMTliOGM2OS0wNjFiLTQzYjEtOTMyNi01MGQ3ZWVlNGMxOGQiLCJjbGllbnRfaWQiOiIyNmt2ZGNsazRpZXZrdjdsOHA1Y3E4NzcycSIsInVzZXJuYW1lIjoiMjQ3MzQyMTYwIn0.mIuad_6Uk8aaFBgRi7WGKe8G3RAfHyUs6Pdl9_LjgYbiYssSZ2EnrLuCKx6jq5nQkCeYf8FIKbHbAE5AjGsmJQCqP5_j6BaF3oUGpgm3P83dksUxyTOz2O1bLxioUXEZ094j1Bn5X2HQxLwaQjcDstvf3lTN-jcwoSumUnaGxZ0iboR-P0aSMR6leeSoa9vM5ypM85jhsze3C3sp6GMIHGDjlqlyPbp2BN0peLcREGWZB4fIcLFw0IL1BiQovWXGWYd2z2KUc0f8LLQGFjWmyw-LpKmZjYWYb7okCZ86hJFWd_SvrjH04tpugA0osD2OEyy6qu6kwxYOEUwgmFEhfg"
        },
        requestContext: { authorizer: {} },
        body: request[texto]
    }
}
