// app.js
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var main = require('../Camera/app.js');

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res,next) {
  res.sendFile(__dirname + '/public/pages/index.html');
});

app.get('/dashboard', function(req, res,next) {
  res.sendFile(__dirname + '/public/pages/dashboard.html');
});

io.on('connection', function(client) {
    console.log('Client connected...');

    client.on('join', function(data) {
        // console.log(data);
        // setInterval(function() {
        //   var y = Math.random();
        //   var z = Math.random();
        //   var data = {'y': y, 'z': z}

        //   client.emit('dataUpdate', data);
        // }, 1000)
      main(client);
      setInterval(function () {
        main(client);
      }, 35000)
    });

});

server.listen(8000);
