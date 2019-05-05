# Short Answer Solutions

## 25.4 - Calculate the size of the largest possible UDP message. (Hint: the entire UDP message must fit in an IP datagram.)

The largest possible UDP message is __65,507 bytes__ because the theoretical maximum of 65,535 bytes is limited by the 8 byte UDP header and the 20 byte IP header.

## 26.4 - What are the main problems a transport protocol must solve to achieve reliable transfer?

The mains problems solved by a transport protocol are:
* *Unreliable Communication*: Messages sent across the Internet can be lost, duplicated, corrupted, delayed, or delivered out of order.
* *End System Reboot*: Sessions must remain consistent even if a system involved in that session were to reboot.
* *Heterogenous End Systems*: Powerful computers may overrun the inferior systems they send messages to.
* *Congestion in the Internet*: Too much transmitted data can slow down/block traffic over routers and switches.

## 26.6 - When using a sliding window of size N, how many packets can be sent without requiring a single ACK to be received?

The throughput achieved is T<sub>W</sub> = min(B, T<sub>G</sub> * N), where B is the hardware bandwidth of the network and T<sub>G</sub> is the throughput achieved by receiving ACK statements. This means that the number of packets that can be sent without requiring a single ACK to be received is either the hardware capacity or the window size N.

## 26.12 - How does TCP compute a timeout for retransmission?

Whenever TCP transmits a message, it starts a timer and waits for an acknoledgment. If the timer runs out before an ACK is received, TCP retransmits the data.

## 26.15 - Suppose two programs use TCP to establish a connection, communicate, terminate the connection, and then open a new connection. Further suppose a FIN message sent to shut down the first connection is duplicated and delayed until the second connection has been established. If a copy of the old FIN is delivered, will TCP terminate the new connection? Why or why not?

If a copy of the old FIN is delivered, TCP will not terminate the new connections immediately because of the three-way handshake required to both start and end a connection. So the other computer will send FIN-ACK back when the old FIN is delivered. Likely the host receiving the FIN-ACK will recognize that it did not send a FIN message, and continue to use the connection rather than send an ACK statement back and end it.

## 27.2 - What two entries are needed in the forwarding table of a typical host?

1. The network to which the host attaches.
2. A default entry that directs all other traffic to a specific router.

## 30.8 - List and describe the eight basic security techniques.

1. *Hashing*:
2. *Encryption*:
3. *Digital Signatures*: A host authenticates the sender of a message using an encryption technique known only by the host.
4. *Digital Certificates*:
5. *Firewalls*:
6. *Intrusion Detection*:
7. *Deep Packet Inspection & Content Scanning*:
8. *VPNs*:

## 30.11 - Read about the Data Encryption Standard (DES). What size key should be used for data that is extremely important?

Each DES key has an effective size of 56 bits. To protect extremely important data, a triple DES should be used to encrypt data three times over with three separate keys, allowing 168 indepedent bits to protect the data.

## 30.14 - How can two parties use public key encryption to sign a contract that is then sent to a third party?

Party A and party B sign the contract with their digital signatures then encrypt it with the third party's public key. The third party can verify the data is unmodified and is the only one who can decrypt it.

## 30.17 - Many commercial firewall products allow a manager to specify packets to deny as well as packets to accept. What is the disadvantage of a configuration that allows denial?

Specifying what type of packets are allowed is the better implementation of packet filtering called whitelisiting. Creating a packet whitelist clearly defines the packets allowed into a network whereas a blacklist would need to be much longer and more comprehensive to block everything.

## 30.21 - Consider a DPI system that searches for a string of K bytes in each packet. If a packet contains 1486 bytes of payload, what is the worst case number of comparisons that must be made to examine the packet assuming a straightforward matching algorithm?

The worst case number of comparisons would be 1486. Iterating through each K byte combinations.