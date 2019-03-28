const webSocketServer = require('websocket').server;
const http = require('http');
const webSocketServerPort = 59001;

var history = [];
var users = [];

const server = http.createServer((request, response) => {
  // N/A, writing WebSocket server
});
server.listen(webSocketServerPort, () => {
  console.log((new Date()) + " Server is listening on port " + webSocketsServerPort);
});

const wsServer = new webSocketServer({
  httpServer: server
});
