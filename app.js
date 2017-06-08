/*
* Lighweight Web API publishing overwatch-js npm package functionnalities
*/

var express = require('express');
var http = require('http');

var winston = require('winston');
var config = require('./config/default.json');

var app = express();
var morgan = require('morgan');

/* Logger */
var logger = new winston.Logger({
    transports: [
        new winston.transports.File({
            level: 'info',
            filename: 'main.log',
            handleExceptions: true,
            json: false,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            colorize: true
        }),
        new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true
        })
    ],
    exitOnError: false
});

logger.stream = {
    write: function (message, encoding) {
        logger.info(message);
    }
}; 

/* Configuration */
app.set('trust proxy', '127.0.0.1');
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});
app.use(morgan('combined', { "stream": logger.stream }));

/* Configuration : SSL */
var privateKey = config.ssl && config.ssl.enabled ? fs.readFileSync(config.ssl.key, 'utf8') : '';
var certificate = config.ssl && config.ssl.enabled ? fs.readFileSync(config.ssl.cert, 'utf8') : '';
var credentials = { key: privateKey, cert: certificate };

/* Routes */
const routes = require('./routes/index');

//  Connect all our routes to our application
app.use('/', routes);

// Setup server.
var port = process.env.PORT || 3001;
(config.ssl && config.ssl.enabled ? http.createServer(credentials, app) : http.createServer(app)).listen(port, function () {
    logger.log('info', `Starting web server on port : ${port}.`);
});