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

const names = new Set();
const sockets = new Set();
let name = false;

server.on('connection', (ws, req) => {
  console.log('Connection from', req.connection.remoteAddress);

  ws.on('error', (error) => {
    console.log('WebSocket Error: ' + error);
  });

  ws.on('message', (message) => {
    console.log(message)
    if (message.startsWith('NAME')) {
      let name = message.substring(5);
      console.log(name);
      if (!names.has(name)) {
        ws.send('NAMEACCEPTED ' + name);
        names.add(name);
        sockets.add(ws);
        for (var user of sockets) {
          user.send(name + ' has joined the chat.');
        }
      }
    } else if (message.startsWith('MESSAGE')) {
      message = message.substring(8);
      text = message.substring(message.indexOf(':') + 2)
      if (text.startsWith('/quit')) {
        ws.close();
      } else if (text.startsWith('/yell')) {
        message = message.substring(0, message.indexOf(':')+1) + ' ' + text.substring(6).toUpperCase();
        for (var user of sockets) {
          user.send(message);
        }
      } else if (text.startsWith('/whisper')) {
        message = message = message.substring(0, message.indexOf(':')+1) + ' ' + text.substring(9).toLowerCase();
        for (var user of sockets) {
          user.send(message);
        }
      } else if (text.startsWith('/heart')) {
        message = message.substring(0, message.indexOf(':')+1) + ' \u2764';
        for (var user of sockets) {
          user.send(message);
        }
      } else if (text.startsWith('/help')) {
        message = '/quit: exit chat app<br>/yell: sends screaming text<br>/whisper: sends lowercase text<br>/heart: heart emote<br>/help: dialogue options';
        ws.send(message);
      } else {
        for (var user of sockets) {
          user.send(message);
        }
      }
    }
  });

  ws.on('close', (connection) => {
    for (var user of sockets) {
      user.send(name + ' has left the chat.');
    }
    names.delete(ws);
  });
});
