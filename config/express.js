var express = require('express')();
var load = require('express-load');

module.exports = function(){
    
    var app = express();

    app.set('view engine','ejs');
    app.set('views','./app/views');//setando localização das views pro express

    load('routes', { cwd: 'app'})
        .then('infra')
        .into(app)

    return app;
}
