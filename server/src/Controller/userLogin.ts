import Model from '../Model';
import * as crypto from 'crypto';

export default async (ctx: any) => {
  try {
      const model: Model = new Model();
      const password = crypto
          .createHash('md5')
          .update(ctx.request.query.password)
          .digest('hex');
      const result = await model.queryDocuments('users', {...ctx.request.query, password});
      if (result.length) {
          ctx.body = { status: 200, message: '登录成功！' };
      } else {
          ctx.body = { status: 200, message: '密码或用户名错误！' };
      }
  } catch (e) {
      console.error(`[<====登录错误: ${e}====>]`);
      ctx.body = '登录失败！';
  }
};
