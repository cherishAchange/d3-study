import controller from '../Controller';
import * as Router from 'koa-router';
const router = new Router();

// 使用接口的最后一级分发
router
    .get('/', (ctx: any) => { ctx.body = 'hello world! 你好，世界，再改变一下，我又改变一下'; })
    .post('/api/userRegister', controller.userRegister)
    .post('/api/userLogin', controller.userLogin)
    .post('/api/userLogout', controller.userLogout)
    .post('/api/submitArticle', controller.submitArticle)
    .post('/api/getTitleList', controller.getTitleList)
    .post('/api/getArticleById', controller.getArticleById)

export default router;
