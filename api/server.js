const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const Router = require('../users/users-router.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api', Router);

server.get('/', (req, res) => {
    res.status(200).json({ anakin: `IT'S WORKING! IT'S WORKING!!!`})
});

module.exports = server;