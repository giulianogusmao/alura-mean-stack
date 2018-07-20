const mongoose = require('mongoose');

mongoose.model('Foto', mongoose.Schema({
  titulo: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  grupo: {
    type: Number,
    required: true,
  },
}));
