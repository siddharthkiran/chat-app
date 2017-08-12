var socket= io();
socket.on('connect', () =>{
  console.log('connected to server');
});


socket.on('newMessage',(message) =>{
  console.log(message);
  var li =$('<li></li>');
  li.text(`${message.from}  :${message.text}`)
  $('#messages').append(li);
});


socket.on('locationMessage',(message) =>{
  var li =$('<li></li>');
  var url = $('<a target="_blank"> My location</a>');
  li.text(`${message.from} :`);
  url.attr('href',message.url);
  li.append(url);
  $('#messages').append(li);

});
socket.on('disconnect', () =>{
  console.log('disconnect to server');
});

$('#message-form').on('submit',function(e){
  e.preventDefault();
  var msgtextbox =$('[name=message]');
  socket.emit('createMessage', {
    from: 'user',
    text : msgtextbox.val()
  }, function(){
  msgtextbox.val('');
  });
});

var locationbutton = $('#send-location');

locationbutton.on('click', function(){
  if(!navigator.geolocation)
  {
    return alert('geolocation not supported');
  }

  locationbutton.attr('disabled','disabled').text('sending location...');
  navigator.geolocation.getCurrentPosition(function(position){
      locationbutton.removeAttr('disabled').text('send location');
      socket.emit('createLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      })
  }, function(){
    alert('unable to fetch location');
        locationbutton.removeAttr('disabled').text('send location');
  })
});
