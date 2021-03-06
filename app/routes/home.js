module.exports = function(app){
    app.get('/',function(req,res){
        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);

        produtosDAO.lista(function(erros,resultados){
            if(erros) {
                //estou repassando as responsabilidade dos erros pro express.
                return next(erros);
            }
            res.render('home/index',{livros:resultados});
        });

        connection.end();
    })
}