import Koa = require('koa');
const app = new Koa();
import * as http from 'http';
const server = http.createServer(app.callback());
const io = require('socket.io')(server);
import router from './Router';

// socket.io
const nsp = io.of('/chat');
let roomName = `${Math.random()}`;
nsp.on('connection', (socket: any) => {
    console.log(`[房间名称：${roomName}]`);
    socket.join(roomName);
    // console.log('[调试一下广播]', nsp.to(roomName).server);
    // nsp.to(roomName).emit('people-join', { message: 'One people join us' });
    socket.broadcast.emit('people-join', { message: 'One people join us' });

    socket.on('one-request', function (data: any) {
        console.log(data);
        // nsp.to(roomName).emit('response-all', { message: data.message });
        socket.broadcast.emit('response-all', { message: data.message });
    });
});

// 路由
app
    .use(router.routes())
    .use(router.allowedMethods());

server.listen(5599);

console.log('[地址为:http://localhost:5599]');