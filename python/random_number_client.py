# A command line client for the date server. It prompts you, at the console, to enter
# the IP address of a server, then displays the response from the server on success,
# otherwise it crashes and dumps the exception trace.

import socket

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
    host = input('Enter the IP address of a machine running the date server: ')
    sock.connect((host, 53211))
    print(f'Server says: {sock.recv(2048).decode("utf-8")}')
