const app = require('./app.js');
const http = require('http');
const myServer = http.createServer(app);
const { Server } = require('socket.io');
const port = 8090;
const mySocket = new Server(myServer);

myServer.listen(port, () => {
  console.log('Server is online on port ' + port);
});

mySocket.on('connection', (socket) => {
  socket.on('disconnect', () => {
  });
});
