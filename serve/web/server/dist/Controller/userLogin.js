"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Model_1 = require("../Model");
const crypto = require("crypto");
exports.default = async (ctx) => {
    try {
        const model = new Model_1.default();
        const password = crypto
            .createHash('md5')
            .update(ctx.request.query.password)
            .digest('hex');
        const result = await model.queryDocuments('users', { ...ctx.request.query, password });
        if (result.length) {
            ctx.body = { status: 200, message: '登录成功！' };
        }
        else {
            ctx.body = { status: 200, message: '密码或用户名错误！' };
        }
    }
    catch (e) {
        console.error(`[<====登录错误: ${e}====>]`);
        ctx.body = '登录失败！';
    }
};
