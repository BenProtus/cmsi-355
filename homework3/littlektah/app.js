const path = require('path');
const express = require('express');
const WebSocket = require('ws');

const app = express();
app.use(express.static('public'));
app.use(express.urlencoded());
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'welcome.html')));
app.get('/game', (req, res) => res.sendFile(path.join(__dirname, 'public', 'littlektah.html')));
app.post('/name', handleName);
app.listen(50000, () => console.log('Little K\'tah server is running'));

const state = new Map();
const names = new Set();

function randomColor() {
  const [r, g, b] = Array(3).fill(0).map(() => Math.floor(Math.random() * 200));
  return `rgb(${r}, ${g}, ${b})`;
}

function handleName(req, res) {
  const name = req.body.name;
  // if name is in the set res.redirect('/')
  // else
  // 
  // state.players.put(ws, [name, 0, 0])
  res.redirect('/game')
  
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
        names.add(name);
        socket.send('NAMEACCEPTED');
      }
    } else if (data.startsWith('READY')) {
      state.set(socket, { location: [0, 0], color: randomColor(), health: 20, points: 0 });
    } else if (data.startsWith('MOVE')) {
      state.get(socket).location = JSON.parse(data.substring(5));
      const renderData = JSON.stringify(Array.from(state.values()));
      Array.from(state.keys()).forEach(sock => sock.send(`COORD ${renderData}`));
    } else if (data.startsWith('COLLISION')) {
      state.get(socket).health -= 1;
      Array.from(state.keys()).forEach(sock => sock.send(`HEALTH ${state.get(socket).health}`));
    }
  });
});