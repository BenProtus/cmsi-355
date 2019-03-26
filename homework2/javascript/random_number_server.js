const net = require('net');

const server = net.createServer((socket) => {
  socket.end(`${Math.floor(Math.random() * 100)}\n`);
});

server.listen(53211);