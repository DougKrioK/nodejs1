module.exports = function(app){
    app.get('/promocoes/form',function(req,res){
        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);
        produtosDAO.lista(function(erros,resultados){
            if(erros) {
                //estou repassando as responsabilidade dos erros pro express.
                return next(erros);
            }
            res.render('promocoes/form',{lista:resultados});
        });
        connection.end();

    });

    app.post('/promocoes',function(req,res){
        var promocao = req.body;
        console.log(promocao);
        res.redirect('promocoes/form');
    })
}