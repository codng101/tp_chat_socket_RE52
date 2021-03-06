var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var port = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket, pseudo){
  
  console.log('a user connected');
  socket.broadcast.emit('hi');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('nouveau_client', function(pseudo) {
    
    socket.pseudo = pseudo;
    socket.broadcast.emit('nouveau_client', pseudo);
});
  socket.on('chat message', function(msg){
    
    console.log('message: ' + msg);
    io.emit('chat message', {pseudo: socket.pseudo, msg: msg});
  });
});

http.listen(port, function(){
  console.log('listening on *: '+ port);
});