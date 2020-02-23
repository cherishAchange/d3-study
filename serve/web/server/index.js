const Koa = require('koa');
const app = new Koa();
const server = require('http').createServer(app.callback());
const io = require('socket.io')(server);

let roomName = `${Math.random()}`;
io.on('connection', (socket) => {
    console.log(`[房间名称：${roomName}]`);
    socket.join(roomName);

    io.to(roomName).emit('people-join', { message: 'One people join us' });

    socket.on('one-request', function (data) {
        console.log(data);
        io.to(roomName).emit('response-all', { message: data.message });
    });
});

server.listen(5599);

console.log('[地址为:http://localhost:5599]');