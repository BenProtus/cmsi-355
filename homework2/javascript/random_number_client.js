const WebSocket = require('ws');

const host = process.argv[2];
const socket = new WebSocket(`ws://${host}:53211`);
socket.addEventListener('message', (event) => {
  console.log(event.data);
  socket.close();
});