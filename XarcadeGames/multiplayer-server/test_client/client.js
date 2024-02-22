const WebSocket = require('ws');

// Replace 'your-jwt-token' with the actual JWT token obtained during authentication
const jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIiLCJyb2xlIjoidXNlciIsImlhdCI6MTcwODU2ODA4NywiZXhwIjoxNzA4NTcxNjg3fQ.OVz0KddfulYhsgugreodYWnpeYXm8n7kYeQLmz6MJRA';

// WebSocket connection URL (replace with your actual WebSocket server URL)
const wsUrl = 'ws://localhost:3050';

// Construct WebSocket headers with the JWT token
const headers = {
  Authorization: `Bearer ${jwtToken}`,
};

// Establish WebSocket connection with headers
const ws = new WebSocket(wsUrl, { headers });

// WebSocket event handlers
ws.on('open', () => {
  console.log('WebSocket connection opened: 1234555');
  
  // You can send messages, perform actions, etc. once the connection is open
  ws.send('Hello, WebSocket Server!');
});

ws.on('message', (message) => {
  console.log(`Received message from WebSocket server: ${message}`);
});

ws.on('close', (code, reason) => {
  console.log(`WebSocket connection closed: ${code} - ${reason}`);
});

ws.on('error', (error) => {
  console.error(`WebSocket error: ${error.message}`);
});
