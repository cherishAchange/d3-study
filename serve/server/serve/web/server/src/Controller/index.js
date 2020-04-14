const userRegister = require('./userRegister');
const userLogin = require('./userLogin');
const userLogout = require('./userLogout');
const submitArticle = require('./submitArticle');
const getTitleList = require('./getTitleList');
const getArticleById = require('./getArticleById');

module.exports = {
    userRegister,
    userLogin,
    userLogout,
    submitArticle,
    getTitleList,
    getArticleById
};
