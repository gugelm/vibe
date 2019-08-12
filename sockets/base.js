var ioSocket;
var ioVar;
var users;
var srvSockets;
module.exports = {
    initialize: function(io) {
        ioVar = io;
        io.on('connection', function (socket) {
            ioSocket = socket;
            srvSockets = io.sockets.sockets;
            users = Object.keys(srvSockets).length;
            console.log(users);
            
            ioVar.emit('vibers', {
                vibers: users
            });

            socket.on('disconnect', function () {
                ioVar.emit('vibers', {
                    vibers: users
                });
            });
            // ioSocket.on('my other event', function (data) {
            //     console.log(data);
            // });
        });
    },
    emit: function (name = 'news', data = {
            hello: 'world'
        }) {
        srvSockets = ioVar.sockets.sockets;
        users = Object.keys(srvSockets).length;
        console.log(users);

        ioVar.emit('vibers', {
            vibers: users
        });
        ioVar.emit(name, data);
    }
} 