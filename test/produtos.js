var express = require('../config/express')();
var request = require('supertest')(express);

describe('#ProdutosController',function(){
    //pra limpar todas tabelas de uma vez, pesquisar por node-database-cleaner
    beforeEach(function(done){
        var conn = express.infra.connectionFactory();
        conn.query("delete from produtos", function(ex,result){
            if(!ex) {
                done();
            }
        });
    });


    it('#listagem json', function(done){

        request.get('/produtos')
            .set('Accept','application/json')
            .expect('Content-Type',/json/)
            .expect(200,done);
    });

    it('$listagem html', function(done){
        
        request.get('/produtos')
            .set('Accept','text/html')
            .expect('Content-Type',/html/)
            .expect(200,done);
    });

    //testando com dados invalidos
    it('#Cadastro de novo produto com dados invalidos', function(done){
        request.post('/produtos')
            //enviando argumentos como se fosse cadastrar um novo produto
            .send({
                titulo: '',
                descricao: 'novo livro'
            }).expect(400,done);
    });
    //testando com dados validos
    it('#Cadastro de novo produto com dados validos', function(done){
        request.post('/produtos')
            .send({
                titulo: 'titulo',
                descricao: 'novo livro',
                preco:20.50
            }).expect(302,done);
    });
    
})