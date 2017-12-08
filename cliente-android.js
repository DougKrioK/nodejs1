var http = require('http');


var configuracoes = {
    hostname: 'localhost',
    port: 3000,
    path: '/produtos',
    //estou dizendo no header da requisicao, que só aceito json como resposta.
    // assim o endereço /produtos podera ser aceitar tanto html como json
    headers: {
        'Accept': 'application/json'
    }
};

http.get(configuracoes,function(res){
    console.log(res.statusCode);
    res.on('data',function(body) {
        console.log('Corpo '+body);
        
    })
    
})