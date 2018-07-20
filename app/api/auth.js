const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const md5 = require('md5');

const api = function (app) {
  secret = app.get('secret');
  model = mongoose.model('Usuario');
  return this;
}

api.prototype.autentica = function (req, res) {
  const login = req.body.login;
  const senha = md5(req.body.senha);

  this.model
    .find({ login, senha })
    .then(
      (usuario) => {
        if (!usuario) {
          res.status(401).json({ message: 'Login ou senha inválidos' });
        } else {
          const token = jwt.sign(
            { login },
            this.secret,
            { expiresIn: 84600 }
          );
          console.log(`Bem vindo ${login}, token de acesso: ${token}`);
          res.set('x-access-token', token).send();
        }
      },
      (error) => res.status(500).json(error)
    );
};

api.prototype.verificaToken = function (req, res, next) {
  const token = req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, this.secret, (error, decoded) => {
      if (error) {
        res.sendStatus(401);
      }

      req.usuario = decoded;
      next();
    })
  } else {
    res.sendStatus(401);
  }
}

module.exports = api;
