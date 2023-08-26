import socket
import os
import struct
# Get unix socket address
f = open('x.unixSocketAddress', 'r')
path = f.read()
f.close()
# Set the path for the Unix socket
socket_path = path

# Create the Unix socket client
client = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)
client.setblocking(True)
# Connect to the server
client.connect(socket_path)

# Send a message to the server
message = 'Hello from the client!'
client.sendall(message.encode())

# Receive a response from the server

whole = bytearray()
with client:
        done=False
        while not done:
            data = client.recv(1024)
            whole.extend(data)
            if len(data)!=1024:
                done = True
                break
        message = whole.split(b"\n")
        print(message)
        data = struct.unpack('>3d', message[2])
        print(data)
        print(message)
print(whole)
print('done')

# Close the connection
client.close()
