module.exports = function(app) {

	var api = new app.api.foto(app);

	// mudando a declaração da rota e adicionando suporte ao verbo POST
	app.route('/v1/fotos')
		.get(api.lista)
		.post(api.adiciona);

	app.route('/v1/fotos/:id')
		.get(api.buscaPorId)
		.delete(api.removePorId)
		.put(api.atualiza);
};
