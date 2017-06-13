const express = require('express');
const routes = express.Router();

var ovhtask = require('ovhtask-js');
var scrapper = ovhtask.scrapper.get();
var feed = ovhtask.feed.get();

routes.get('/:from?/:to?', function (req, res) {
    req.params.from = parseInt(req.params.from) || 1;
    req.params.to = parseInt(req.params.to) || (parseInt(req.params.from) + 200);
    console.log(req.params)
    feed.list(req.params.from, req.params.to)
    .then((data) => {
        res.json(data);
    })
    .catch((err) => { res.status(500); res.json({ error : err}) });
});

routes.get('/fresh', function (req, res) {

    var task = req.params.task;
    var refresh = req.query.refresh;

    if(!task || isNaN(task))
        res.status(400);

    scrapper.list(0, req.query.limit || 500)
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