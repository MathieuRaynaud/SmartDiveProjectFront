var EventEmitter = require('events').EventEmitter;
var fs = require('fs');
var express = require('express');
var http = require('http');
var app = express();
var HTTPserver = http.createServer(app);
var io = require('socket.io').listen(HTTPserver);

var app_logs = new EventEmitter();

app.use(express.static('style'));
app.use(express.static('scripts'));
app.use(express.static('datas'));
app.use(express.static('images'));

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

if(HTTPserver.listen(8080)){
    app_logs.emit('listening');
}

/*********************/
/***** Functions *****/
/*********************/

function processData(allText) {
    /* Example of data to process:
        [timestamp  , temperature   , pressure  , lat   , long  , depth             ]
        [1541692273 , 12.4          , 1.2       , 0.0   , 0.0   , 1.9999999999999996]
     */
    var record_num = 6;  // or however many elements there are in each row
    var allTextLines = allText.split('\n');
    var data_matrix = new Array(allTextLines.length);
    for (var d = 0; d < allTextLines.length; d++) {
        data_matrix[d] = new Array(record_num);
    }
    for (var j = 0; j < allTextLines.length; j++) {
        var entries = allTextLines[j].split(',');

        for (var i = 0; i < entries.length; i++) {

            data_matrix[j][i] = entries[i];
        }
    }
    return data_matrix;
}

function myfun(filePath, cb){
    fs.readFile(filePath, 'utf8', function (err,data) {
        if (err) {
            return console.log(err);
        }
        cb(data);
    });
}

var data_tab;

myfun('/home/mathieu/Documents/INSA/5ème année ISS/Merckathon/SmartDiveProjectFront/datas/output.csv', function(data) {
    data_tab = processData(data);
} );


io.sockets.on('connection', function(socket) {
    console.log('Client connected...');
    socket.emit('datas', data_tab);
});