var http = require('http');//incluindo o modulo http
var porta = 3000; // configura a porta
var ip = "localhost";

var server = http.createServer(function(request, response) {
    console.log("Recebendo request");
    if(request.url=='/produtos'){
        response.end('<html><body>Listando os produtos da loja!</body></html>');
    } else {
        response.end('<html><body>Pagina inicial!</body></html>');
        
    }

    response.writeHead(    200, {'Content-Type': 'text/html'});
    response.end('<html><body>Request recebido!</body></html>');
});

server.listen(porta, ip);

console.log("Server running at http://" + ip + ":" + porta + "/");