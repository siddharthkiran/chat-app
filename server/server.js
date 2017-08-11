const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const publicPath = path.join(__dirname , '../public');
const PORT = process.env.PORT || 3000;
var app = express();
app.use(express.static(publicPath));
console.log(publicPath);
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection' , (socket) =>{
  console.log('new user connected');

  socket.on('disconnect', () =>{
    console.log('user disconnected');
  });

  // socket.emit('newMessage', {
  //     from :'abc',
  //     text: 'hi how r u?',
  //     createdAt: 123
  // });

  socket.on('createMessage',(message) =>{
    console.log(message);
    io.emit('newMessage',{
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
  });

});



server.listen(PORT, ()=>{
  console.log('server is up and running');
})
