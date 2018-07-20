const mongoose = require('mongoose');
const api = function (app) {
  model = mongoose.model('Foto');
  return this;
}

api.prototype.lista = function (req, res) {
  this.model
    .find()
    .then(
      (fotos) => res.json(fotos),
      (error) => res.status(500).json(error)
    );
};

api.prototype.buscaPorId = function (req, res) {
  this.model
    .findById({ _id: req.params.id })
    .then(
      (foto) => {
        if (!foto) throw Error('Foto não econtrada')
        res.json(foto);
      },
      (error) => res.status(500).json(error)
    );
};

api.prototype.removePorId = function (req, res) {
  this.model
    .remove({ _id: req.params.id })
    .then(
      () => res.sendStatus(204),
      (error) => res.status(500).json(error)
    );
};

api.prototype.adiciona = function (req, res) {
  this.model
    .create(req.body)
    .then(
      (foto) => res.json(foto),
      (error) => res.status(500).json(error)
    );
};

api.prototype.atualiza = function (req, res) {
  this.model
    .findByIdAndUpdate(req.params.id, req.body)
    .then(
      (foto) => res.json(foto),
      (error) => res.status(500).json(error)
    );
};

module.exports = api;
