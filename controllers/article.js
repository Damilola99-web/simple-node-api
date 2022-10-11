const fs = require('fs');
const path = require('../utils/path');

const articleData = fs.readFileSync(`${path}/data/articles.json`).toString();
const articles = JSON.parse(articleData);

exports.getArticles = (req, res) => {
	res.status(200).json(articles);
};

exports.getArticle = (req, res) => {
	const id = req.params.id;
	const article = articles.filter((article) => article.id === id);
	if (article.length < 1) {
		return res.status(404).json({ error: `Article for id ${id} not found` });
	} else {
		return res.status(200).json(article[0]);
	}
};

exports.postArticle = (req, res) => {
	const { name: nameData, description: descriptionData } = req.body;

	if (!nameData || !descriptionData) {
		return res.status(400).json({ error: 'Please fill in all fields' });
	}
	const name = nameData.trim();
	const description = descriptionData.trim();
	if (name.length < 1 || description.length < 1) {
		return res.status(400).json({ error: 'Please enter valid inputs' });
	}
	const id = Math.random().toString().slice(2);
	console.log(name, description, id);
	articles.push({ id, description, name });
	fs.writeFileSync(`${path}/data/articles.json`, JSON.stringify(articles));
	res.status(200).json({ id, description, name });
};

exports.deleteArticle = (req, res) => {
	const id = req.params.id;
	const article = articles.filter((article) => article.id === id);
	const newArticles = articles.filter((article) => article.id !== id);
	fs.writeFileSync(`${path}/data/articles.json`, JSON.stringify(newArticles));
	res.status(200).json(article);
};

exports.editArticles = (req, res) => {
	const id = req.params.id;
	const { name : nameData, description : descriptionData } = req.body

	if (!nameData || !descriptionData) {
		return res.status(400).json({ error: 'Please fill in all fields' });
	}
	const name = nameData.trim();
	const description = descriptionData.trim();
	if (name.length < 1 || description.length < 1) {
		return res.status(400).json({ error: 'Please enter valid inputs' });
	}
	const article = articles.filter((article) => article.id === id);
	article[0].name = name
	article[0].description = description
	fs.writeFileSync(`${path}/data/articles.json`, JSON.stringify(articles));
	res.status(200).json({ id, description, name });
}
