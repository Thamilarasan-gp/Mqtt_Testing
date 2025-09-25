// server/index.js
const express = require("express");
const http = require("http");
const aedes = require("aedes")();
const websocket = require("websocket-stream");

const app = express();
const PORT = process.env.PORT || 8080;

// Create HTTP server
const server = http.createServer(app);

// Attach WebSocket MQTT server
websocket.createServer({ server }, aedes.handle);

// Optional: subscribe to all topics and save to MongoDB
aedes.on("publish", async (packet, client) => {
  if (packet.topic && packet.payload) {
    const message = packet.payload.toString();
    console.log(`Topic: ${packet.topic} → Message: ${message}`);
    // Save to MongoDB here
  }
});

server.listen(PORT, () => {
  console.log(`Broker + Express running on port ${PORT}`);
});
