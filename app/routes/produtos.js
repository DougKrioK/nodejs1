module.exports = function(app) {
    listarProdutos = function(req, res) {
        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);

        produtosDAO.lista(function(err, results){
            //analisa o header, para responder o tipo apropriado
            /**
            Content Negotiation é um mecanismo definido no HTTP que torna possível servir diferentes formatos de um mesmo conteúdo a partir da mesma url. Evitando assim que se precisasse criar novas urls para cada formato necessário para exibir a lista de produtos, por exemplo.
            Ele funciona através do Header Accept, em que o cliente que está consumindo a url informa qual tipo de dados, ele aceita receber no response de sua requisição. Os navegadores tradicionais, por exemplo, utilizam por default o valor “text/html” em seu Accept.
             */
            res.format({
                html: function(){
                    res.render('produtos/lista', {lista: results});
                },
                json: function(){
                    res.json(results);
                }
                
            })
        });

        connection.end();
    };

    app.get("/produtos",listarProdutos);

    app.get("/produtos/form",function(req, res) {
        res.render('produtos/form');
    });

    app.post("/produtos",function(req, res) {

        //middleware pega a requisição e transforma em json.
        var produto = req.body;

        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);
        produtosDAO.salva(produto,function(erros,results){

            //redireciona para lista
            res.redirect('/produtos');
        })

    });
}