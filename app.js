var app = require('./config/express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//assosiando a variavel io, dentro do express
app.set('io',io);
http.listen(3000, function(){
    console.log('Servidor rodando');
});