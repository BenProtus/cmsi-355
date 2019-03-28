const http = require('http');

http.createServer((request, response) => {
  if (request.url === '/random') {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end(Math.floor(Math.random() * 100).toString(), 'utf-8');
  } else if (request.url === '/') {
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end('<h1>Random Number Browser Client</h1><button><a href="/random">Something random will happen</a></button>')
  } else {
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.end('Nothing here...');
  }
}).listen(53211)

console.log('Random Number server is running at port 53211')