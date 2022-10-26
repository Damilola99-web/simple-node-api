const express = require('express');
const userRoutes = require('./routes/users');
const articleRouter = require('./routes/articles');
const bodyParser = require('body-parser')
const cors = require('cors')

const server = express();
server.use(cors())

server.use(express.json())
server.use('/api/users', userRoutes)
server.use('/api/articles', articleRouter)

server.use('', (req, res) => {
	res.status(404).json({ error: 'page not found' });
});
server.listen(3001);
