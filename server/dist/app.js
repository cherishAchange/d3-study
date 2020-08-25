"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const app = new Koa();
const http = require("http");
const server = http.createServer(app.callback());
const io = require('socket.io')(server);
const Router_1 = require("./Router");
// socket.io
const nsp = io.of('/chat');
let roomName = `${Math.random()}`;
nsp.on('connection', (socket) => {
    console.log(`[房间名称：${roomName}]`);
    socket.join(roomName);
    // console.log('[调试一下广播]', nsp.to(roomName).server);
    // nsp.to(roomName).emit('people-join', { message: 'One people join us' });
    socket.broadcast.emit('people-join', { message: 'One people join us' });
    socket.on('one-request', function (data) {
        console.log(data);
        // nsp.to(roomName).emit('response-all', { message: data.message });
        socket.broadcast.emit('response-all', { message: data.message });
    });
});
// 路由
app
    .use(Router_1.default.routes())
    .use(Router_1.default.allowedMethods());
server.listen(5599);
console.log('[地址为:http://localhost:5599]');
