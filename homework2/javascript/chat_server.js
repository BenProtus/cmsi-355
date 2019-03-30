const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 53211 });

const names = new Set();
const sockets = new Set();

server.on('connection', (ws, req) => {
  console.log('Connection from', req.connection.remoteAddress);

  ws.on('message', (message) => {
    if (message.startsWith('NAME ')) {
        name = message.substring(5);
        if (!names.has(name)) {
            socket.send('NAMEACCEPTED');
            names.add(name);
            sockets.add(ws);
        }
    } else if (message.startsWith('MESSAGE ')) {
        for (var user of sockets) {
            user.send(name + ": " + message.substring(8))
        }
    }
    console.log('Message is', message);
    ws.send(message.toUpperCase());
  });
});