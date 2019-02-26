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
        client = f'{self.client_address} on {threading.currentThread().getName()}'
        print(f'Connected: {client}')
        while True:
            data = self.rfile.readline()
            if not data:
                break
            self.wfile.write(data)


with ThreadedTCPServer(('', 43210), EchoHandler) as server:
    print(f'The echo server is running...')
    server.serve_forever()
