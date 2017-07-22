'use strict';

/**
 *   --- Tim's Demo App
 */

var express   = require('express');
var app       = express();

var http      = require('http');
var server    = http.Server(app);
var io        = require('socket.io')(server);    

var PORT      = process.env.PORT || 3000;

var clients   = [];

// Define static file directory
app.use(express.static('public'));

// Server static page
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

// Handle new connection
io.on('connection', function(socket) {

    console.log('A client has connected...');
    
    // Message the user
    socket.emit('notification', { 'message' : 'You have sucessfully connected.' });
    
    clients.push(socket);

    // Message the group
    socket.broadcast.emit('notification', {'message' : 'A new user has joined!'});

    // Handle message from client...
    socket.on('update', function(data) {
        console.log('Update received...');


        socket.broadcast.emit('notification', data);
    });

    // Handle disconnection...
    socket.on('disconnect', function(socket) {

        // Find and remove the disconnected socket
        var idx = clients.indexOf(socket);
        if (idx > -1) {
            clients.splice(idx, 1);
        }

        io.sockets.emit('notification', { 'message' : 'A user has disconnected...'});

    });

});

server.listen(PORT, function() {
    console.log('Listening on port: ' + PORT);
    console.log('Speak to me... !!!');
});