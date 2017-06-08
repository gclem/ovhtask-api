const express = require('express');
const routes = express.Router();

var scrapper = (require('ovhtask-js')).scrapper.get();

routes.get('/', function (req, res) {

    var task = req.params.task;

    if(!task || isNaN(task))
        res.status(400);
console.log(req.query);
    scrapper.list(0, req.query.limit || 0)
        .then((data) => { 
            if (!data) 
                res.status(404);

            res.json(data);
        });
});

routes.get('/:task', function (req, res) {

    var task = req.params.task;

    if(!task || isNaN(task))
        res.status(400);

    scrapper.detail(task)
        .then((data) => { 
            if (!data) 
                res.status(404);

            res.json(data);
        });
});

routes.get('/category/:category', function (req, res) {

    var category = req.params.category;

    if(!category || isNaN(category))
        res.status(400);

    scrapper.list(category, req.query.limit || 0)
        .then((data) => res.json(data));
});

module.exports = routes;