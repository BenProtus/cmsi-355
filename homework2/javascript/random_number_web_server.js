const http = require('http');
const util = require('util');

http.createServer((request, response) => {
  console.log('request', util.inspect(request))\
  
  if (request.url === '/random') {
    response.writeHead(200, {'Content-Type': text/plain});
    response.end(Math.floor(Math.random() * 100), 'utf-8');
  } else if (request.url === '/') {
    response.writeHead(200, {'Content-Type': text/html});
    response.end('<h1>Random Number Browser Client</h1><button id="rand">Something random will happen</button>')
  } else {
    response.writeHead(404, {'Content-Type': text/plain});
    response.end();
  }
}).listen(53211)

console.log('Random Number server is running at port 53211')