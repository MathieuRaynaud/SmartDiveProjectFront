var test_module = require('test_module');
var EventEmitter = require('events').EventEmitter;
var express = require('express');

var app = express();
var app_logs = new EventEmitter();

app.use(express.static('style'));

app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.render('map.ejs');
});

/******************/
/***** Events *****/
/******************/

app_logs.on('listening', function(){
    console.log('App listening at localhost:8080');
});

if(app.listen(8080)){
    app_logs.emit('listening');
}

test_module.direBonjour();