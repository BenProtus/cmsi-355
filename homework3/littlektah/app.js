const path = require('path');
const express = require('express');
const WebSocket = require('ws');

const app = express();
app.use(express.static('public'));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'welcome.html')));
app.listen(50000, () => console.log('Little K\'tah server is running'));

const state = new Map();
const names = new Set();

function randomColor() {
  const [r, g, b] = Array(3).fill(0).map(() => Math.floor(Math.random() * 200));
  return `rgb(${r}, ${g}, ${b})`;
}


new WebSocket.Server({ port: 50001 }).on('connection', (socket, req) => {
  console.log('Connection from', req.connection.remoteAddress);

  socket.on('error', (error) => {
    console.log('WebSocket Error: ' + error);
  });

  socket.on('message', (data) => {
    if (data.startsWith('NAME')) {
      let name = data.substring(5);
      if (!names.has(name)) {
        console.log("Name Accepted:", name);
        //socket.send('NAMEACCEPTED');
        names.add(name);
        app.get('/game', (req, res) => res.redirect(path.join(__dirname, 'public', 'littlektah.html')));
        //TODO: need to navigate to game page at this point, need to figure that out, execute before we send NAMEACCEPTED?
      }
    } else if (data.startsWith('READY')) {
      state.set(socket, { location: [0, 0], color: randomColor() });
    } else if (data.startsWith('MOVE')) {
      state.get(socket).location = JSON.parse(data.substring(5));
      const renderData = JSON.stringify(Array.from(state.values()));
      Array.from(state.keys()).forEach(sock => sock.send(renderData));
    }
  });
});