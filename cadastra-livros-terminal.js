var http = require('http');
var configuracoes = {
    hostname: 'localhost',
    port: 3000,
    method:'post',
    path: '/produtos',
    //aceito json, e envio json
    /**
     * que serve para informar para o servidor em qual formato de dados os parâmetros do form estão sendo enviados.
     */
    headers: {
        'Accept': 'application/json',
        'Content-type':'application/json'
    }
};

var client = http.request(configuracoes,function(res){
    console.log(res.statusCode);
    res.on('data',function(body) {
        console.log('Corpo '+body);
        
    })
    
});
var produto = {
    titulo: '',
    descricao: 'node, javascript',
    preco: '100'
};
/**
 * A grande novidade nesse arquivo com relação ao criado no exercício anterior é que agora precisamos guardar a função http.request() numa variável que chamamos de client. Para depois invocar a função client.end() que é quem de fato envia a requisição.
 */
client.end(JSON.stringify(produto));