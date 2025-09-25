// server/index.js
const express = require("express");
const http = require("http");
const aedes = require("aedes")();
const websocket = require("websocket-stream");

const app = express();
const PORT = process.env.PORT || 443; // Render assigns a port automatically

// Create HTTP server
const server = http.createServer(app);

// Attach WebSocket MQTT server
websocket.createServer({ server }, aedes.handle);

// Log client connections
aedes.on("client", (client) => {
  console.log("Client connected:", client ? client.id : "unknown");
});

aedes.on("clientDisconnect", (client) => {
  console.log("Client disconnected:", client ? client.id : "unknown");
});

// Log all messages
aedes.on("publish", async (packet, client) => {
  if (packet.topic && packet.payload) {
    const message = packet.payload.toString();
    console.log(`Topic: ${packet.topic} → Message: ${message}`);
    if (client) console.log("Published by client:", client.id);
    // TODO: Save to MongoDB if needed
  }
});

// Start server
server.listen(PORT, () => {
  console.log(`Broker + Express running on port ${PORT}`);
  console.log(`WebSocket URL: wss://your-domain.com`); // Render automatically provides HTTPS/WSS
});
