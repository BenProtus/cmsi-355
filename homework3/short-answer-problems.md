# Short Answer Solutions

## 6.20 - If the maximum frequency audible to a human ear is 20,000 Hz, at what rate must the analog signal from a microphone be sampled when converting it to digital?

According to the Nyquist Theorem, the analog signal from a microphone would need to be sampled at a rate of __40,000 samples per second__.

## 7.2 - What are the three energy types used when classifying physical media according to energy used?

The three energy types used for classifying physical media according to energy used are __light, electrical, and electromagnetic__.

## 7.8 - Explain why light does not leave an optical fiber when the fiber is bent into an arc.

A substance called __cladding__ forms a boundary when bonded to an optical fiber and the cladding reflects light off of this boundary when the light strikes the fiber at an angle less than the critical angle, thereby preventing the light from leaving the optical fiber.

## 7.23 - If a system has an average power level of 100, an average noise level of 33.33, and a bandwidth of 100 MHz, what is the effective limit on channel capacity?

According to Shannon's Theorem, the effective limit on channel capacity (C) can be measured by multiplying the bandwidth (B) by the log-base 2 of one plus the signal-to-noise ratio (S/N). Thus, C = B * log <sub>2</sub> (1 + S/N) = 10<sup>8</sup> * log <sub>2</sub> (1 + 100/33.33) = __2 * 10<sup>8</sup> bits per second__

## 13.8 - What are the four basic LAN topologies?

__Bus, Ring, Star, and Mesh__

## 13.11 - Given an IEEE MAC address, how can one tell if the address refers to unicast?

The least significant bit of the most significant byte of an IEEE MAC address indicates whether the address refers to unicast (0) or multicast (1). So an address refers to unicast if the eigth bit of the 48-bit address is a 0.

## 18.12 - What are the two basic approaches used to perform a distributed route computation, and how does each work?

The two basic approaches used to perform a distributed route computation are __Link-State Routing__ and __Distance-Vector Routing__. Link-State Routing uses Dijkstra's Algorithm to compute the shortest distance from a source node to every other node, and then updates a graph of the network with weighted edges at each source node using these computations. Alternatively, Distance-Vector Routing computes an updated forwarding table at each source node using DV messages from the neighboring nodes containing a list of destinations paired with the distance from the node sending the DV message; thus the forwarding table updates if a shorter path becomes available according to these DV messages and ultimately reflects the shortest path between nodes in a network.

## 21.4 - Write a computer program that accepts a dotted decimal address as input and displays a string of 32 bits.

    def dotted_decimal_to_bits(address):
        print(' '.join([bin(int(x) + 256)[3:] for x in address.split('.')]))

## 21.5 - Write a computer program that reads an IP address in dotted decimal form and determines whether the address is a multicast address.

    def is_ip_multicast(address):
        return 224 <= int(address.split('.')[0]) <= 239

## 21.6 - Write a computer program that translates between CIDR slash notation and an equivalent dotted decimal value.

    def cidr_to_dotted_decimal(cidr):
        return cidr.split('/')[0]

## 21.7 - If an ISP assigned you a / 28 address block, how many computers could you assign an address?

A 28 bit address block leaves 4 bits to assign to various hosts. The first value of all zeros is assigned to the server and the last value of all ones is the broadcast signal, therefore you could assign up to __14 computers__ to a / 28 address block (2<sup>4</sup>-2 = 14 unique addresses).

## 21.8 - If an ISP offers a / 17 address block for N dollars per month and a / 16 address block for 1.5 N dollars per month, which has the cheapest cost per computer?

A / 17 address block can host up to 32,766 computers whereas a / 16 address block can host up to 65,534 computers, essentially offering double the available computers at only one and a half times the cost (for the / 16 address block). Therefore __the / 16 address block__ has the cheapest cost per computer.

## 21.9 - Is the CIDR prefix 1.2.3.4 / 29 valid? Why or why not?

In binary, 1.2.3.4 translates to the bits 00000001 00000010 00000011 00000100, with a mask size of 29 bits denoted by the / 29 address block. This means that the last 3 bits are reserved to signify the specific host and these bits should contain all zeros in the CIDR prefix. This is not the case for the CIDR prefix 1.2.3.4 and therefore __the prefix is invalid__.

## 21.10 - Suppose you are an ISP with a / 24 address block. Explain whether you accommodate a request from a customer who needs addresses for 255 computers. (Hint: consider the special addresses.)

Supposing that I am an ISP with a / 24 address block, I would not be able to accommodate a request from a customer requiring addresses for 255 computers. While a / 24 address block leaves 8 bits to denote the host (e.g. 255 hosts theoretically possible), two of the host addresses are reserved as the network's special addresses. The host address containing zeros for all eight bits signifies the host address of the network itself. The host address with eight one-bits is reserved as the directed broadcast address and is used when sending the same IP packet(s) to all hosts on the specified network. Therefore, a / 24 address block can only accommadate up to 253 computers.

## 21.11 - Suppose you are an ISP that owns a / 22 address block. Show the CIDR allocation you would use to allocate address blocks to four customers who need addresses for 60 computers each.

A / 22 address block indicates that only the last 10 bits of the address are mutable. Each customer needs 60 computers, therefore the last 6 bits must be reserved for the host. This means that we can use bits 23-26 to divide the address block four ways to accommodate each of the customers.

* 192.168.0.0/26
* 192.168.0.64/26
* 192.168.0.128/26
* 192.168.0.192/26

## 21.12 - Suppose you are an ISP that owns a / 22 address block. Can you accommodate requests from six customers who need addresses for 9, 15, 20, 41, 128, and 260 computers, respectively? If so, how? If not, explain why.

A / 22 address block is unable to accommodate these six customers' needs because there is no way to divide the block to host all the computers of each client simultaneously. As above, a / 22 address block indicates that only the last 10 bits of the address are mutable. In order to host the maximum of 260 computers, a / 23 address block must be assigned to the client, leaving only the 23rd bit available to distinguish between clients. One bit cannot distinguish six different clients, therefore it is impossible to accommodate the requests of all the customers with a / 22 address block.

## 21.13 - Write a computer program that reads an address in CIDR notation and prints the resulting address and mask in binary.

    def cidr_to_binary(cidr):
        network, netmask_bits = cidr.split('/')
        address = '.'.join([bin(int(x) + 256)[3:] for x in network.split('.')])
        host_bits = 32 - int(netmask_bits)
        netmask = "".join(list(('1' * host_bits).zfill(32))[::-1])
        print("Address: ", address)
        print("   Mask: ", netmask)

## 23.2 - What term is used to describe the mapping between a protocol address and a hardware address?

__Address resolution__ describes the mapping between a protocol address and a hardware address.

## 23.5 - How many octets does an ARP message occupy when used with IP and Ethernet addresses?

__28 octets__

## 23.22 - Many NAT devices choose the 10.0.0.0 /8 address block from Figure 23.10 because it provides the most generality. Explain why.

Devices typically choose this address because 10.0.0.0 /8 provides a private network with 24 host bits that can be used by any user or organization, supporting a wide range of valid IPs.

## 24.3 - List the major features of IPv6, and give a short description of each.

* __Address Size__: Each IPv6 address contains 128 bits.
* __Header Format__: The IPv6 datagram header is drastically different than its IPv4 counterpart.
* __Extension Headers__: A datagram consists of an IPv6 header followed by zero or more extension headers, followed by the data.
* __Support For Real-Time Traffic__: A sender and receiver can establish a high-quality path through the associated network and send datagrams along this path, enabling a steady data-stream between the two.
* __Extensible Protocol__: IPv6 provides a scheme that permits additional information to be added to the datagram by the sender, allowing new features to be added to the design as needed.

## 24.9 - Write a computer program that reads a 128-bit binary number and prints the number in colon hex notation.
