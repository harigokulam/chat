const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
app.get('/script.js', (req, res) => {
    res.sendFile(__dirname + '/script.js');
  });
  app.get('/js/chat', (req, res) => {
    res.sendFile(__dirname + '/js/chat.js');
  });

io.on('connection', (socket) => {
  console.log('a user connected');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        io.emit('chat-message',  {'name': socket.id, 'message': "Left"})
    });
    socket.on('login-action', (name) => {
        socket.id = name;
        io.emit('chat-message',  {'name': name, 'message': "Joined"})
    })
    socket.on('chat-message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat-message', {'name': socket.id, 'message':msg});
      });
  });

server.listen(3000, () => {
  console.log('listening on *:3000');
});