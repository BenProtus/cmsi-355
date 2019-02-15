# A TCP server that runs on port 9090. When a client connects, it sends the client the
# current date and time, then closes the connection with that client. This is arguably
# just about the simplest server you can write. While simple, it has the disadvantage
# that a client has to be completely served its date before the server will be able to
# handle another client.

import socketserver
from datetime import datetime

class RandomNumberHandler(socketserver.StreamRequestHandler):
    def handle(self):
        self.wfile.write(datetime.now().isoformat().encode('utf-8'))
        # Convert to String for conversion

if __name__ == '__main__':
    with socketserver.TCPServer(('', 53211), RandomNumberHandler) as server:
        print('The date server is running')
        server.serve_forever()
