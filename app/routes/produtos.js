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
        res.render('produtos/form',
            {errosValidacao:{}}
        );
    });

    app.post("/produtos",function(req, res) {

        //middleware pega a requisição e transforma em json.
        var produto = req.body;

        /**
         * O Express Validator vai adicionar algumas funções no request, onde podemos acessar através das variáveis req.
            Após instalar essa biblioteca, vamos no arquivo produtos-js, dentro da função de mapeamento do /produtos. Uma função que é adicionada no request é a req.assert(), onde nós passamos o campo que queremos validar e a mensagem que será associada a nossa validação. req.assert() nos retorna um objeto que representa a validação para o titulo.
         */
        req.assert('titulo','Titulo é obrigatório').notEmpty();
        req.assert('preco','Formato invalido').isFloat();

        //Com o objeto do validator, vamos chamar a função que sinaliza erro caso o valor seja vazio notEmpty().c
        //validadorTitulo.notEmpty();
        //Com isso estamos dizendo que se algo estiver errado, não passará. Agora vamos chamar o req.validationErrors(); para verificar se ouve algum erro, e nos retorna um JSON com os erros.
        var erros = req.validationErrors();
        //Verificamos se ouve erros com o if(erros), caso a variável erros seja preenchida com algum erro, o JavaScript vai considerar como true. Caso haja erros, renderizamos o formulário novamente e usamos um return; vazio, para que ele saia do método app.post() sem cadastrar.
        if(erros){
            res.render('produtos/form',{errosValidacao: erros});
            return;
        }

        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);
        produtosDAO.salva(produto,function(erros,results){

            //redireciona para lista
            res.redirect('/produtos');
        })

    });
}