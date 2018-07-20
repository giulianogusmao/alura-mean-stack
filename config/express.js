var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var app = express();

app.set('secret', 'meanstack_alurapic_L@1K#S$d3jf!4S=!21d3l_kj1-47F')
app.use(express.static('./public'));

app.use(bodyParser.json());

consign({cwd: 'app'})
	.include('models')
	.then('api')
	.then('routes/auth') // garantinod que o auth seja carregado primeiro
	.then('routes')
	.into(app);

module.exports = app;
