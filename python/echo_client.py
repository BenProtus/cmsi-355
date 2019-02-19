import socket

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
    host = input('Enter the IP address of a machine running the capitalization server: ')
    sock.connect((host, 43210))
    phrase = input('Enter a string to send to the server: ') + '\n'
    sock.sendall(phrase.encode('utf-8'))
    print(f'Echo says: {sock.recv(2048).decode("utf-8")}')
