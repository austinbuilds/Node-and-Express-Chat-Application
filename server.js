// Require
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Socket.io
const http = require('http').Server(app);
const io = require('socket.io')(http);

// Middleware
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Test
let messages = [
  { name: 'Bob', message: 'Hi' },
  { name: 'Teddy', message: 'Hello' }
];

// Get messages
app.get('/messages', (req, res) => {
  res.send(messages);
});

// Post messages
app.post('/messages', (req, res) => {
  messages.push(req.body);
  // Socket.io notification
  io.emit('message', req.body);
  // Send status
  res.sendStatus(200);
});

// Socket.io user connection
io.on('connection', (socket) => {
  console.log('a user connected');
});

// Server
var server = http.listen(3000, () => {
  console.log('server is listening on port', server.address().port);
});
