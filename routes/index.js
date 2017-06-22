const express = require('express');
const routes = express.Router();
var package = require('../package.json');

/* Configuration  : Routing */
var v1 = express.Router();

/* ROOT */
routes.get('/', function (req, res) {
    res.json({
        name : package.name,
        version : package.version, 
        description : package.description, 
        author : package.author,
        repo : package.repository.url
    });
});

// /* Master switch */
// app.use('/v1', v1);
// app.use('/', v1); // Set the default version to latest.
var projects = require('./projects');
var tasks = require('./tasks');
var log = require('./log');
var importer = require('./importer');

routes.use('/projects', projects);
routes.use('/tasks', tasks);
routes.use('/log', log)
routes.use('/importer', importer);

module.exports = routes;