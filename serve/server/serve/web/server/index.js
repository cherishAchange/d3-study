const Koa = require('koa');
const app = new Koa();
const server = require('http').createServer(app.callback());
const io = require('socket.io')(server);
const router = require('./src/Router');

// socket.io
const nsp = io.of('/chat');
let roomName = `${Math.random()}`;
nsp.on('connection', (socket) => {
    console.log(`[房间名称：${roomName}]`);
    socket.join(roomName);

    nsp.to(roomName).emit('people-join', { message: 'One people join us' });

    socket.on('one-request', function (data) {
        console.log(data);
        nsp.to(roomName).emit('response-all', { message: data.message });
    });
});

// 路由
app
    .use(router.routes())
    .use(router.allowedMethods());

server.listen(5599);

console.log('[地址为:http://localhost:5599]');