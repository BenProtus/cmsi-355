const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 53211 });

server.on('connection', (socket) => {
  socket.send(`${Math.floor(Math.random() * 100)}\n`);
});