const fs = require('fs')
const path = require('../utils/path');

const usersData = fs.readFileSync(`${path}/data/user.json`).toString()

const users = JSON.parse(usersData)

exports.getUsers = (req, res) => {
	res.status(200).json(users);
}