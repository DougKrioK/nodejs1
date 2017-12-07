var connectionFactory = require('../infra/connectionFactory');
module.exports = function(app){
    app.get('/produtos', function(req,res){
        
        //conexão ao banco
        var connection = connectionFactory();
        connection.query('select * from produtos',function(err,results){

            res.render('produtos/lista',{lista:results});

        });
        connection.end();
    });

}
