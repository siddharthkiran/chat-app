var socket= io();
socket.on('connect', () =>{
  console.log('connected to server');
});

function scrollToBottom(){

  var messages = $('#messages');
  var newMessage= messages.children('li:last-child');

  var scrollHeight = messages.prop('scrollHeight');
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();
  if(clientHeight+ scrollTop+ newMessageHeight+ lastMessageHeight>=scrollHeight)
    messages.scrollTop(scrollHeight);
}

socket.on('newMessage',(message) =>{
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = $('#message-template').html();
  var html = Mustache.render(template,{
    text: message.text,
    from: message.from,
    createdAt:formattedTime
  });

  $('#messages').append(html);
  scrollToBottom();
  // console.log(message);
  // var li =$('<li></li>');
  // li.text(`${message.from} : ${formattedTime} :${message.text}`)
  // $('#messages').append(li);
});


socket.on('locationMessage',(message) =>{
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = $('#location-message-template').html();
  var html = Mustache.render(template,{
    from: message.from,
    createdAt: formattedTime,
    url: message.url
  });

  // var li =$('<li></li>');
  // var url = $('<a target="_blank"> My location</a>');
  // li.text(`${message.from} : ${formattedTime} :`);
  // url.attr('href',message.url);
  // li.append(url);
  $('#messages').append(html);
  scrollToBottom();
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
