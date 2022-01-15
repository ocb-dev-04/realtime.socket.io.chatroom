const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// run when a client connects
io.on('connection', (socket) => {
    // welcome current user
    socket.emit('message', 'Welcome to the chat app');

    // broadcast to all other clients without the connected client
    socket.broadcast.emit('message', 'New user joined');

    // emit when a client left
    io.on('disconnect', () => {
        io.emit('message', 'A user has left');
    });
});

// run when a client disconnects
io.on('disconnect', () => {
    socket.emit('message', 'Goodbye');
});

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Listening on port => ${PORT}`));