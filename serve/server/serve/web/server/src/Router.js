const Router = require('koa-router');
const router = new Router();
const controller = require('./Controller');

// 使用接口的最后一级分发
router
    .post('/api/userRegister', controller.userRegister)
    .post('/api/userLogin', controller.userLogin)
    .post('/api/userLogout', controller.userLogout)
    .post('/api/submitArticle', controller.submitArticle)
    .post('/api/getTitleList', controller.getTitleList)
    .post('/api/getArticleById', controller.getArticleById)

module.exports = router;
