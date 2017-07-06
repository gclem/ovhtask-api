var feed = (require('ovhtask-js')).feed.get();

let EventManager = {};

EventManager.init = (io) => {

    EventManager.io = io;
    io.on('connection', function (socket) {
        console.log("IO | New connection approved.");
        socket.emit('connected', { });
    });

    feed.listen();
    feed.on('new', (data) => { EventManager.handle('new', data);} );
    feed.on('update', (data, update) => { EventManager.handle('update', data, update); } );
    feed.on('delete', (data) => { EventManager.handle('delete', data); } );
}

EventManager.handle = (type, data, update) => {
    var payload = {};
    payload['new'] = update || data;
    payload['prev'] = update;
    EventManager.log(type, data);
}

EventManager.log = (type, message, payload) => {
    EventManager.io.emit(type, { message : message, payload : payload });
}

module.exports = EventManager.init;
