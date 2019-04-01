const path = require('path');
const express = require('express');
const WebSocket = require('ws');

const app = express();
app.use(express.static('public'));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'chat.html')));
app.listen(53211, () => console.log('Chat server is running'));

const server = new WebSocket.Server({
  port: 53210
});

const names = {};
const sockets = new Set();

server.on('connection', (ws, req) => {
  console.log('Connection from', req.connection.remoteAddress);

  ws.on('error', (error) => {
    console.log('WebSocket Error: ' + error);
  });

  ws.on('message', (message) => {
    console.log(message)
    if (message.startsWith('NAME')) {
      name = message.substring(5);
      console.log(name);
      if (!Object.values(names).indexOf(name) > -1) {
        ws.send('NAMEACCEPTED');
        names[ws] = name;
        sockets.add(ws);
        for (var user of sockets) {
          user.send(name + ' has joined the chat.');
        }
      }
    } else if (message.startsWith('MESSAGE')) {
      name = names[ws];
      message = message.substring(8);
      if (message.startsWith('/quit')) {
        ws.close();
      } else if (message.startsWith('/yell')) {
        message = message.substring(6).toUpperCase();
        for (var user of sockets) {
          user.send(name + ": " + message);
        }
      } else if (message.startsWith('/whisper')) {
        message = message.substring(9).toLowerCase();
        for (var user of sockets) {
          user.send(name + ": " + message);
        }
      } else if (message.startsWith('/heart')) {
        message = '\u2764';
        for (var user of sockets) {
          user.send(name + ": " + message);
        }
      } else if (message.startsWith('/help')) {
        message = '/quit: exit chat app\n/yell: sends screaming text\n/whisper: sends lowercase text\n/heart: heart emote\n/help: dialogue options';
        ws.send(message);
      } else {
        for (var user of sockets) {
          user.send(name + ": " + message);
        }
      }
    }
  });

  ws.on('close', (connection) => {
    for (var user of sockets) {
      user.send(name + ' has left the chat.');
    }
    sockets.delete(ws);
    delete names.ws;
  });
});
