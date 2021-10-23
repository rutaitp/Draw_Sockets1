//STEP 2. setup
//express
let express = require('express');
let app = express();
app.use('/', express.static('public'));

//http server
let http = require('http');
let server = http.createServer(app);
let port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log('Server listening at port: ' + port);
});

//socket connection
let io = require('socket.io');
io = new io.Server(server);

//STEP 3. Socket connection
io.sockets.on('connection', (socket) => {
  console.log('We have a new client: ' + socket.id);

  //STEP 6. Listen for mousePos data
  socket.on('data', (data) => {
    console.log(data);

    //STEP 7. broadcast data to other clients
    //Send to all clients including this one
    io.sockets.emit('data', data);

    //Send the data to all other clients, not including this one
    // socket.broadcast.emit('data', data);

    //Send the data to just this client
    // socket.emit('data', data);
  });

  socket.on('colorChange', (data) => {
    io.sockets.emit('colorChange', data);
  });

  //client disconnecting
  socket.on('disconnect', () => {
    console.log('A client disconnected: ' + socket.id);
  });
});
