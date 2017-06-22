const express = require('express');
const routes = express.Router();
const scrapper = (require('ovhtask-js')).scrapper.get();

routes.get('/', function (req, res) {
    scrapper.categories()
        .then((data) => res.json(data));
});

module.exports = routes;