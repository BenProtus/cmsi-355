# Short Answer Solutions

## Problem 1: What was the name of the famous 1974 paper by Cerf and Kahn and why was it so influential?

The most radical paper of 1974 was titled _A Protocol for Packet Network Intercommunication_ by Vint Cerf and Bob Kahn. It was so influential because it solved the problem of inter-networking using the Transmission Control Protocol (TCP). In the early days of ARPANET, the variety of software and hardware protocols made communication between unique systems nearly impossible. Cerf and Kahn invented TCP (which later split into TCP and IP in 1978) to break data into smaller "packets" of information while accounting for data fragmentation. This allowed networks to communicate with other networks using one (later two) additional protocols, and thus the inter-networking "Internet" was created.

## Problem 2: Contrast packet switching and circuit switching in a couple sentences.

Packet switching is a more efficient and effective way of transmitting data as compared to circuit switching. Circuit switching requires a pre-existing physical path between two nodes to share data between them and limits the overall available bandwidth in the circuit. On the other hand, packet switching does not require a physical path between nodes, making new connections cheap/easy to establish. Also, packet switching breaks the data into individual packets of data which prevents wasted bandwidth and allows for store and forward communication.

## Problem 3: Who publishes the RFCs?

The Internet Engineering Task Force (IETF), the Internet Research Task Force (IRTF), and the Internet Architecture Board (IAB). An announcement is sent to their mailing list which can be subscribed to here: https://www.ietf.org/mailman/listinfo/ietf-announce

## Problem 4: What command do you use to show your host’s routing table?

`netstat -r`

## Problem 5: What does the transport layer take care of? What does it not need to know?

The transport layer breaks up the data stream in the application layer into transport-layer packets to then send to the network layer. The transport layer is also responsible for assigning source and destination addresses to the header of each packet. Once the network layer has reached the appropriate destination, the transport layer sends the data to the appropriate application host. Therefore the transport layer is not concerned with the data's IP destination, but rather ensures the data finds the right application.

## Problem 6: What was the first message sent on the ARPANET? The second?

"Lo" was the first message sent on the ARPANET because the system crashed before the full intended message "Login" was written. "Login" was the second message sent on the ARPANET about an hour later after debugging the system. _Lo_ now symbolizes _Low and Behold_.

## Problem 7: Contrast TCP and UDP in a couple sentences.

TCP and UDP both accomplish the same goal of sending packets of data to the Internet layer, and then send those data packets to the appropriate application. However, TCP ensures a more secure data transmission than UDP using several checks and balances. TCP organizes that packets of data in a specific order and communicates with the recipient to ensure that all the data packets reach the appropriate application in the right order. Alternatively, UDP continuously sends the data packets to the intended application without communicating with the recipient. This means that not all the data packets are guaranteed to reach the destination, but also eliminates time wasted from the back-and-forth communication between the client and server that is required by TCP.

## Problem 8: What is the smallest possible IP packet size?

The smallest possible IP packet size is 20 bytes. This packet would reserve 20 bytes for the header and contain 0 bytes of data.

## Problem 9: What is the largest possible IP packet size that has zero data bytes?

The minimum required bytes of an IP packet is 20 bytes reserved for the header, with zero data bytes. Therefore the largest possible IP packet size that has zero data bytes is also the smallest possible IP packet size: 20 bytes.

## Problem 10: Why don’t Node.js servers need threads?
Node.js servers follows an asynchronous model rather than taking a multi-threaded approach. Rather than having multiple threads running concurrently, Node.js divides all actions on the server into different events with expiration values. This model speeds up concurrent processes by dedicating more processing power in order of events raised. The asynchronous approach also eliminates locking altogether, and therefore removes race conditions and deadlock from the server.
