// Node
var io = require('socket.io').listen(8080);
var count = 0

io.sockets.on('connection', function(socket) {
    count++;
    io.sockets.emit('message', { count: count });

    socket.on('disconnect', function(){
        count--;
        io.sockets.emit('message', { count: count });
    })
});