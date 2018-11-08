var http = require('http');
var test_module = require('test_module');
var EventEmitter = require('events').EventEmitter;
var express = require('express');

var app = express();
var map = new EventEmitter();

/*var server = http.createServer(function(req, res) {
    res.writeHead(200, {"Content-Type": "text/html"});
    res.write('<!DOCTYPE html>'+
        '<html>'+
        '    <head>'+
        '        <meta charset="utf-8" />'+
        '        <title>Smart Dive Project</title>'+
        '    </head>'+
        '    <body>'+
        '     	<h1>Smart Dive Project</h1>'+
        '    </body>'+
        '</html>');
    res.end();
});

server.listen(8080);*/

app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.send('Vous êtes à l\'accueil');
});

app.get('/etage/:etagenum/chambre', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Vous êtes à la chambre de l\'étage n°' + req.params.etagenum);
});

app.listen(8080);

map.on('pin_clicked', function(message){
    console.log(message);
});

map.emit('pin_clicked', 'Vous avez cliqué sur un pin !');

test_module.direBonjour();