var socket= io();
socket.on('connect', () =>{
  console.log('connected to server');
});

socket.on('newMessage',(message) =>{
  console.log(message);
});

socket.emit('createMessage', {
  from: "siddharth",
  text: "hello"
})
socket.on('disconnect', () =>{
  console.log('disconnect to server');
});
