const Model = require('./Model');

module.exports = {
    submitArticle: (ctx) => {
        const model = new Model();
        model.insertDocuments('articleInfo', [ctx.request.query], (result) => {
            ctx.status = 200;
            ctx.body = result;
        });
    },
    getTitleList: () => {

    },
    getArticleById: () => {

    }
};
