const express = require('express');
const { getUsers } = require('../controllers/user');
const userRoutes = express.Router()

userRoutes.get('/', getUsers);

module.exports = userRoutes