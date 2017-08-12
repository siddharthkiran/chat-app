const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const publicPath = path.join(__dirname , '../public');
const PORT = process.env.PORT || 3000;
const {generateMessage, generateLocationMessage} = require('./utils/message');

var app = express();
app.use(express.static(publicPath));
console.log(publicPath);
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection' , (socket) =>{
  console.log('new user connected');

  socket.emit('newMessage',generateMessage('admin','hello and welcome'));


  socket.broadcast.emit('newMessage',generateMessage('admin', 'new user joined'));

  socket.on('disconnect', () =>{
    console.log('user disconnected');
  });

  socket.on('createMessage',(message,callback) =>{
    console.log(message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback();
  });

  socket.on('createLocationMessage', (coords)=>{
    io.emit('locationMessage', generateLocationMessage('admin', coords.latitude, coords.longitude))
  });
});



server.listen(PORT, ()=>{
  console.log('server is up and running');
})
