const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const md5 = require('md5');

const transformText = (login) => (login || '').trim().toLowerCase();
const transformSenha = (senha) => md5(transformText(senha));

const AuthAPI = function (app) {
  this.model = mongoose.model('Usuario');
  this.secret = app.get('secret');

  this.registra = (req, res) => {
    const login = transformText(req.body.login);
    const senha = transformSenha(req.body.senha);

    this.model
      .create({ login, senha }, function (error, usuario) {
        if (error) {
          res.status(500).json(error);
          return;
        }
        console.log('usuario cadastrado com sucesso!');
        console.log({ login, senha: transformText(req.body.senha) });
        res.json(usuario);
      });
  };

  this.autentica = (req, res) => {
    const login = transformText(req.body.login);
    const senha = transformSenha(req.body.senha);

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

  this.verificaToken = (req, res, next) => {
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
  };

  return this;
}

module.exports = AuthAPI;
