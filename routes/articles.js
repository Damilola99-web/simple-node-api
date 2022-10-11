const express = require('express');
const { getArticle, getArticles, postArticle, deleteArticle, editArticles } = require('../controllers/article');

const articleRouter = express.Router();

articleRouter.get('/', getArticles);

articleRouter.get('/:id', getArticle);

articleRouter.post('/', postArticle);

articleRouter.delete('/:id', deleteArticle);

articleRouter.put('/:id', editArticles);

module.exports = articleRouter;
