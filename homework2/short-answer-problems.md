# Short Answer Solutions

## Problem 1: What are the two basic communication paradigms used in the Internet?
- The Stream Paradigm, which is built on TCP is used for 1-to-1 connections.
- The Message Paradigm is built on UDP and is for multiple connections.

## Problem 2: Give six characteristics of Internet stream communication.
- Connection oriented
- Uses 1-to-1 communication
- Uses sequence of individual bytes
- Length of transfer is arbitrary
- Used in many applications
- Built on TCP

## Problem 3: Give six characteristics of Internet message communication.
- Connectionless
- Many-to-many communication
- Uses sequence of messages
- Each message must be less than 64Kbs
- Used widely in multimedia
- Built on UDP

## Problem 4: If a sender uses the stream paradigm and always sends 1024 bytes at a time, what size blocks can the Internet deliver to a receiver?
The stream paradigm does not restrict block size.

## Problem 5: If a sender wants to have copies of each data block being sent to three recipients, which paradigm should the sender choose?
The message paradigm because it allows for multiple connections.

## Problem 6: What are the three surprising aspects of the Internet’s message delivery semantics?
- Messages may never be delivered (__lost__)
- Messages may send more than one copy (__duplicated__)
- Messages may be delivered out of order

## Problem 7: Give the general algorithm that a connection-oriented system uses.
    // Interaction over connection-oriented systems
    Two applications request to establish a connection with each other
    Both applications share data over established connection
    Both applications terminate the connection once the data has been shared

## Problem 9: Compare and contrast a client and server application by summarizing characteristics of each.
A client and a server are both applications that share information back-and-forth while performing designated tasks. A client is a generalized application that runs on a user's machine to actively connect to a specific server. Alternatively, a server is a highly specific application that requires powerful hardware and software to accept and maintain many arbitrary connections with several clients simultaneously.

## Problem 10: What is the difference between a server and a server-class computer?
A server is a program that continuously waits for connection, not the physical machine that is running the program. A server-class computer is a machine that is built to run one or more servers.

## Problem 11: Can data flow from a client to a server? Explain.
Data can flow from a client to a server, but the server must send the initial message and then waits for the client's connection.

## Problem 12: List the possible combinations of clients and servers a given computer can run.
- A single server
- A single client
- Multiple copies of a client that contact a given server
- Multiple clients that each contact a particular server
- Multiple servers, each for a particular service

## Problem 13: Can all computers run multiple services effectively? Why or why not?
Some computers are more well-suited to run multiple services concurrently as compared to less powerful machines. Each individual service requires a distinct amount of memory and CPU power, which quickly accumulate and can overwhelm simpler computers that lack the necessary processing power.

## Problem 14: What two identifiers are used to specify a particular server?
- The __IP__ identifies the computer on which the server is running.
- The __port number__ specifies the service.

## Problem 15: List the steps a client uses to contact a server after a user specifies a domain name for the server.
- Use DNS to translate the domain name specified to IP address
- Specify that the service uses a predetermined port (N)
- Contact server and interact

## Problem 16: What basic operating system feature does a concurrent server use to handle requests from multiple clients simultaneously?
Concurrent servers use threads to handle requests from multiple clients simultaneously, while a main thread accepts new connections assigning new clients with a separate handling thread.

## Problem 17: What performance problem motivates peer-to-peer communication?
Many client-server architectures are prone to bottlenecks such that information cannot flow from the clients to a server and back efficiently. Rather than storing all the shared information on a single server, divide the information between many clients evenly. That way the information is only accessed a fraction of the rate that a dedicated server computer would be, saving resources over all.

## Problem 18: Name two operating systems that offer the socket API.
Microsoft Windows and UNIX systems (Linux)

## Problem 19: Once a socket is created, how does an application reference the socket?
When a socket is created, the operating system returns an integer value to reference the socket with.

## Problem 20: What are the main functions in the socket API?
accept, bind, close, connect, getpeername, getsockopt, listen, recv, recvmsg, recvfrom, send (write), sendmsg, sendto, setsockopt, shutdown, socket

## Problem 21: Give the typical sequence of socket calls used by a client and by a server.
| client         | server         |
| :------------- | :------------- |
|                | socket         |
|                | bind           |
| socket         | listen         |
| connect        | accept         |
| send           | recv           |
| recv           | send           |
| close          | close          |

## Problem 22: To what socket functions do __*read*__ and __*write*__ correspond?
__read__ corresponds to the socket function `recv` and __write__ corresponds to the socket function `send` in most operating systems.

## Problem 23: Does a client ever use __*bind*__? Explain.
No, the __blind__ function is used by the server to supply a protocol port number at which the server will wait for contact.
