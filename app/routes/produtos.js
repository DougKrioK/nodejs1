module.exports = function(app) {
    listarProdutos = function(req, res) {
        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);

        produtosDAO.lista(function(err, results){
            //analisa o header, para responder o tipo apropriado
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