
import socketserver
import threading

names = {}

class ThreadedTCPServer(socketserver.ThreadingMixIn, socketserver.TCPServer):
    pass

class ChatHandler(socketserver.StreamRequestHandler):
    def handle(self):
        client = f'{self.client_address} on {threading.currentThread().getName()}'
        print(f'Connected: {client}')

        while True:
            self.wfile.write(f'Submit Username: '.encode('utf-8'))
            name = self.rfile.readline()
            name = name.decode('utf-8').rstrip()
            if name and name not in names:
                names[name] = self
                print(f'Username accepted: {name}')
                for address in names.values():
                    address.wfile.write(f'{name} has joined the chat.\n'.encode('utf-8'))
                break

        while True:
            text = self.rfile.readline().decode('utf-8').rstrip()
            if text.lower().startswith('/quit'):
                for address in names.values():
                    address.wfile.write(f'{name} has left\n'.encode('utf-8'))
                del names[name]
                break
            while not text:
                self.wfile.write("~No empty messages~\n".encode('utf-8'))
                text = self.rfile.readline().decode('utf-8').rstrip()
            response = f'{name}: {text}\n'
            for address in names.values():
                address.wfile.write(response.encode('utf-8'))  


with ThreadedTCPServer(('', 43210), ChatHandler) as server:
    print(f'The chat server is running...')
    server.serve_forever()