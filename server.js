const aedes = require("aedes")();
const net = require("net");
const PORT = process.env.PORT || 1883;

const server = net.createServer(aedes.handle);

// Log all client connections/disconnections
aedes.on("client", (client) => console.log("Client connected:", client.id));
aedes.on("clientDisconnect", (client) => console.log("Client disconnected:", client.id));

// Log messages for debugging
aedes.on("publish", (packet, client) => {
  if (packet.topic && packet.payload) {
    console.log(`Topic: ${packet.topic} → Message: ${packet.payload.toString()}`);
    if (client) console.log("Published by client:", client.id);
  }
});

// Start server
server.listen(PORT, () => {
  console.log(`MQTT TCP Broker running on port ${PORT}`);
});
