var express = require('express');
var socket = require('socket.io');

// app setup
var app = express();
var server = app.listen(4000, function(){
    console.log('listen on port 4000');
});

// static files
app.use(express.static('public'));

// Socket setup
var io = socket(server);

io.on('connection', function(socket){
    console.log('make socket connection', socket.id);
    
    socket.on('chat', function(data){
        io.sockets.emit('chat', data);
    });

    socket.on('typing', function(data){
        //io.sockets.emit('typing', data);  // 會發給所有人(包括當事人)
        socket.broadcast.emit('typing', data);  // 發給其它所有人
    });
});
