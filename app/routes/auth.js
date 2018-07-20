module.exports = function (app) {

  const api = new app.api.auth(app);

  app.post('/autenticar', api.autentica);
  app.use('*', api.verificaToken);
}
