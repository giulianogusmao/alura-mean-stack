var mongoose = require('mongoose');

module.exports = (uri, db) => {
    // criando conexão
    mongoose.connect(`${uri}/${db}`);

    // acessando os eventos da minha conexão criada
    mongoose
        .connection
        .on('connected', () => console.log(`conectado ao mongodb -> ${db}`))
        .on('error', (err) => console.log(`Erro na conexão: ${err}`))
        .on('disconnected', () => console.log('Desconectado do mongodb'));

    process
        .on('SIGINT', () => {
            console.log('Aplicação encerrada');
            mongoose.connection.close();
        });
}