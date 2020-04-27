"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Model_1 = require("../Model");
exports.default = async (ctx) => {
    try {
        const model = new Model_1.default();
        await model.insertDocuments('articleInfo', [ctx.request.query]);
        ctx.status = 200;
        ctx.body = { status: 200, message: '文章提交成功！' };
    }
    catch (e) {
    }
};
