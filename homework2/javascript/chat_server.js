const WebSocket = require('ws');

const server = new WebSocket.Server({
  port: 53211
});

const names = new Set();
const sockets = new Set();

server.on('connection', (ws, req) => {
  console.log('Connection from', req.connection.remoteAddress);

  name = null;
  ws.on('message', (message) => {
    console.log(message)
    if (message.startsWith('NAME')) {
      name = message.substring(5);
      console.log(name);
      if (!names.has(name)) {
        ws.send('NAMEACCEPTED');
        names.add(name);
        sockets.add(ws);
        for (var user of sockets) {
          user.send(name + ' has joined the chat.');
        }
      }
    } else if (message.startsWith('MESSAGE')) {
      message = message.substring(8);
      if (message.startsWith('/quit')) {
        ws.close();
      } else if (message.startsWith('/yell')) {
        message = message.toUpperCase();
        for (var user of sockets) {
          user.send(name + ": " + message);
        }
      } else if (message.startsWith('/whisper')) {
        message = message.toLowerCase();
        for (var user of sockets) {
          user.send(name + ": " + message);
        }
      } else if (message.startsWith('/heart')) {
        message = '\u2764';
        for (var user of sockets) {
          user.send(name + ": " + message);
        }
      } else if (message.startsWith('/')) {

      } else {
        for (var user of sockets) {
          user.send(name + ": " + message);
        }
      }
    }
  });

  ws.on('close', (connection) => {
    sockets.delete(ws);
    for (var user of sockets) {
      user.send(name + ' has left the chat.');
    }
    names.delete(name);
  });
});