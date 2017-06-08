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
var categories = require('./categories');
var tasks = require('./tasks');

routes.use('/categories', categories);
routes.use('/tasks', tasks);

module.exports = routes;