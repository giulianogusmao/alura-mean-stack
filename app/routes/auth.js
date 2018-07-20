module.exports = function (app) {

  const api = new app.api.auth(app);

  app
    .post('/autenticar', api.autentica)
    .post('/user', api.registra)
    .use('*', api.verificaToken);
}
