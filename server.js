var http = require('http');
var app = require('./config/express');
require('./config/database')('mongodb://localhost', 'alurapic'); // conecta no mongodb

http.createServer(app)
.listen(3000, function() {
	console.log('Servidor iniciado');
});

