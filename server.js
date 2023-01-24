const app = require('./app.js');
const http = require('http');
const myServer = http.createServer(app);
const { Server } = require('socket.io');
const mySocket = new Server(myServer);

myServer.listen(5500, () => {
  console.log('Server is on');
});

mySocket.on('connection', (socket) => {
  console.log('a user has connected');
  socket.on('disconnect', () => {
    console.log('a user has disconnected');
  });
});

// https://socket.io/get-started/chat