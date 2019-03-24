# A server program which accepts requests from clients to echo strings. When
# clients connect, a new thread is started to handle a client. The receiving of the
# client data and the sending back of the data is handled on the
# worker thread, allowing much greater throughput because more clients can be handled
# concurrently.

import socketserver
import threading

class ThreadedTCPServer(socketserver.ThreadingMixIn, socketserver.TCPServer):
    pass

class EchoHandler(socketserver.StreamRequestHandler):
    def handle(self):
        print(f'Handling a client on {threading.currentThread().getName()}')
        data = self.rfile.readline().strip()
        self.wfile.write(data)

if __name__ == '__main__':
    server = ThreadedTCPServer(('', 43210), EchoHandler)
    with server:
        print(f'The echo server is running')
        server.serve_forever()
