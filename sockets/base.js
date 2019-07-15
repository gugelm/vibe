var ioSocket;
var ioVar;
module.exports = {
    initialize: function(io) {
        ioVar = io;
        io.on('connection', function (socket) {
            ioSocket = socket;
            // ioSocket.emit('news', {
            //     hello: 'world'
            // });
            // ioSocket.on('my other event', function (data) {
            //     console.log(data);
            // });
        });
    },
    emit: function (name = 'news', data = {
            hello: 'world'
        }) {
        ioVar.emit(name, data);
    }
} 