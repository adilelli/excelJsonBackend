const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser'); // Import body-parser


const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(bodyParser.json());
const secretKey = 'yourSecretKey'; // Replace with a strong secret key in production

// HTTP request authentication with JWT
app.post('/login', (req, res) => {
  // For simplicity, assume the client sends credentials in the request body
  const { username, password } = req.body;

  // Perform authentication logic (e.g., verify username and password)
  // If authentication succeeds, create a JWT
  const token = jwt.sign({ username, role: 'user' }, secretKey, { expiresIn: '1h' });

  // Send the JWT token to the client
  res.json({ token });
});

// WebSocket connection initialization and authorization
wss.on('connection', (ws, req) => {
  // Extract JWT from the headers of the WebSocket handshake request
  const token = req.headers.authorization;

  // Verify JWT
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      // JWT verification failed, reject WebSocket connection
      console.log('Denied');
      ws.terminate();
    } else {
      // JWT verification succeeded, authorize WebSocket connection
      const { username, role } = decoded;

      // For simplicity, allow all authenticated users
      if (role === 'user') {
        console.log(`WebSocket connection authorized for user: ${username}`);

        // Handle WebSocket events for the authorized connection
        ws.on('message', (message) => {
          console.log(`Received WebSocket message from ${username}: ${message}`);
          // Process WebSocket messages
        });

        ws.on('close', () => {
          console.log(`WebSocket connection closed for user: ${username}`);
          // Clean up or handle disconnection
        });
      } else {
        // Role not authorized, reject WebSocket connection
        ws.terminate();
      }
    }
  });
});

const PORT = 3050;

server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
