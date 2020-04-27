"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Model_1 = require("../Model");
const crypto = require("crypto");
exports.default = async (ctx) => {
    try {
        const model = new Model_1.default();
        // 库中存的是密码的MD5后的值
        const password = crypto
            .createHash('md5')
            .update(ctx.request.query.password)
            .digest('hex');
        await model.insertDocuments('users', [{ ...ctx.request.query, password }]);
        ctx.body = { status: 200, message: '注册成功！' };
    }
    catch (e) {
        console.error(`[<====注册错误: ${e}====>]`);
        ctx.body = '注册失败！';
    }
};
