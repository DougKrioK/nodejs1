var mysql = require('mysql');



function createDBConnection(){

    console.log(process.env.NODE_ENV);
    
    return mysql.createConnection({
                host:'localhost',
                user:'root',
                password:'',
                database:'casadocodigo_nodejs'
          });

}

module.exports = function(){
    return createDBConnection;
}