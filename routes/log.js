const express = require('express');
const routes = express.Router();
const path = require('path');

routes.get('/', function (req, res) {
    res.sendFile(path.join(__dirname+'/../views/log.html'));
});

module.exports = routes;
