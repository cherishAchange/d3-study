"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Controller_1 = require("../Controller");
const Router = require("koa-router");
const router = new Router();
// 使用接口的最后一级分发
router
    .get('/', (ctx) => { ctx.body = 'hello world! 你好，世界，再改变一下，我又改变一下'; })
    .post('/api/userRegister', Controller_1.default.userRegister)
    .post('/api/userLogin', Controller_1.default.userLogin)
    .post('/api/userLogout', Controller_1.default.userLogout)
    .post('/api/submitArticle', Controller_1.default.submitArticle)
    .post('/api/getTitleList', Controller_1.default.getTitleList)
    .post('/api/getArticleById', Controller_1.default.getArticleById);
exports.default = router;
