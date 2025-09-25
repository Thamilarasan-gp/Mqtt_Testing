const aedes = require("aedes")();
const http = require("http");
const websocket = require("websocket-stream");

const PORT = process.env.PORT || 9001;

const server = http.createServer();
websocket.createServer({ server }, aedes.handle);

aedes.on("client", (client) => console.log("Client connected:", client.id));
aedes.on("clientDisconnect", (client) => console.log("Client disconnected:", client.id));

aedes.on("publish", (packet, client) => {
  if (packet.topic && packet.payload) {
    console.log(`Topic: ${packet.topic} → Message: ${packet.payload.toString()}`);
    if (client) console.log("Published by client:", client.id);
  }
});

server.listen(PORT, () => {
  console.log(`MQTT WebSocket Broker running on ws://localhost:${PORT}`);
});
