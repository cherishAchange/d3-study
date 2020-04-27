import Model from '../Model';

export default async (ctx: any) => {
  try {
    const model = new Model();
    await model.insertDocuments('articleInfo', [ctx.request.query]);
    ctx.status = 200;
    ctx.body = { status: 200, message: '文章提交成功！' };
  } catch (e) {

  }
};
