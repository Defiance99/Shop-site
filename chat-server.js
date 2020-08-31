const socket = require('socket.io');
const app = require('./server');

const server = app.app;
const io = socket(server);
io.on('connection', function(socket) {
    console.log('Connected user:', socket.id);

/*     socket.on('chat', data => {
        
    }); */
});