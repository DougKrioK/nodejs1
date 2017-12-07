var mysql = require('mysql');

function createDbConnection(){
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'casadocodigo_nodejs'
    });
}
//wrapper, assim o createDbConnection só vai ser invocado no momento que carregar o objeto
module.exports = function(){
    return createDbConnection;
}