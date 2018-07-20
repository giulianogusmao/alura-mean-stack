var mongoose = require('mongoose');

mongoose.model('Usuario', mongoose.Schema({
  login: {
    type: String,
    required: true
  },
  senha: {
    type: String,
    required: true
  }
}));
