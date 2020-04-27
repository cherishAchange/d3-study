"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userRegister_1 = require("./userRegister");
const userLogin_1 = require("./userLogin");
const userLogout_1 = require("./userLogout");
const submitArticle_1 = require("./submitArticle");
const getTitleList_1 = require("./getTitleList");
const getArticleById_1 = require("./getArticleById");
exports.default = {
    userRegister: userRegister_1.default,
    userLogin: userLogin_1.default,
    userLogout: userLogout_1.default,
    submitArticle: submitArticle_1.default,
    getTitleList: getTitleList_1.default,
    getArticleById: getArticleById_1.default
};
