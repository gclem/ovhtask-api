const express = require('express');
const routes = express.Router();

var importer = (require('ovhtask-js')).import.get();
var config = require('../config/default.json');

routes.get('/refresh/:uuid', function (req, res) {

    if (!req.params.uuid || req.params.uuid !== config.uuid)
    {
        res.end();
        return;
    }

    importer
        .import(0, 100, { withDetails : true })
        .then(() => {
            res.json({ state : 'done'});
        })
        .catch((err) => {
            res.json({ state : 'faulted', error : err});
        })
});

module.exports = routes;