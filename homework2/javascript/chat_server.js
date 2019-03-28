const WebSocket = require('ws');

const server = new WebSocket.Server({
    port: 53211
})

clients = []

server.on('request', function (request) {
    console.log('New Connection: ', request.connection.remoteAddress)
    var connection = request.accept();
    var userName = false;

    connection.on('message', function (message) {
        if (message.type === 'utf-8') {
            if (userName === false) {
                userName = message.utf8data;
                clients.push(connection);
                server.send(userName + ' has joined');
            } else {
                clients.forEach(client.send(message.utf8data));
            }
        }
    });

    connection.on('close', function(connection) {
        list.splice( list.indexOf('connection'), 1 );
    });
})