const Model = require('../Model');

module.exports = async (ctx) => {
  try {
    const model = new Model();
    const result = await model.insertDocuments('articleInfo', [ctx.request.query]);
    ctx.status = 200;
    ctx.body = { status: 200, message: '文章提交成功！' };
  } catch (e) {

  }
};
