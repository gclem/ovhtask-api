const express = require('express');
const routes = express.Router();

var importer = (require('ovhtask-js')).import.get();
var config = require('../config/default.json');

routes.get('/refresh/:uuid/:project?', function (req, res) {

    if (!req.params.uuid || req.params.uuid !== config.uuid)
    {
        res.end();
        return;
    }

    importer
        .import(req.params.project || 0, { from: 1, to: 5, withDetails: true })
        .then(() => {
            res.json({ state : 'done'});
        })
        .catch((err) => {
            res.json({ state : 'faulted', error : err});
        })
});

module.exports = routes;
