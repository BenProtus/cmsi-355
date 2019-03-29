const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 53211 });

const names = new Set();
const sockets = new Set();

server.on('connection', (ws, req) => {
  console.log('Connection from', req.connection.remoteAddress);

  ws.send('SUBMITNAME');
  // ws.on('message', (message) => if message NAME then check for unique then if unique THEN
  // put ws in the sockets set and put name in names)

  ws.on('message', (message) => {
    if (message.startsWith('NAME')) {
        names.add(message.substring(5))
    }
    console.log('Message is', message);
    ws.send(message.toUpperCase());
  });
});