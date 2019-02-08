# A server program which accepts requests from clients to capitalize strings. When
 # clients connect, a new thread is started to handle a client. The receiving of the
 # client data, the capitalizing, and the sending back of the data is handled on the
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
        self.wfile.write(data.decode('utf-8').upper().encode('utf-8'))

if __name__ == '__main__':
    server = ThreadedTCPServer(('', 9898), EchoHandler)
    with server:
        print(f'The capitalization server is running')
        server.serve_forever()