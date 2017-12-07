var express = require('express')();
var load = require('express-load');

var app = express();

app.set('view engine','ejs');
app.set('views','./app/views');//setando localização das views pro express

module.exports = function(){
    return app;
}
