'use strict';

var express = require('express');
var db = require('sequelize-connect');
var path = require('path');
var bodyParser = require('body-parser');
var pollController = require('./controllers/pollController');
var voteController = require('./controllers/voteController');
var errorHandler = require('./Middleware/errors');
var chalk = require('chalk');
var webpack = require('webpack');
var webpackMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('../webpack.config');


const compiler = webpack(config);

const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
        colors: true,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false,
        modules: false
    }
});

async function connect () {
    db.discover = path.join(__dirname, 'models');
    db.matcher = function shouldImportModel(modelFileName) {
        return true;
    };
    await db.connect('voting_schema', 'root', '',{
        force:false
    });

};

(async function () {
    try{
    await connect();
    console.log('Connection Successful');
    }
    catch (err)
    {
        console.log(chalk.red('An error occurred when connecting: ' + err));
    }

    var server = express();
    var port = 8080;
    server.use(bodyParser.json());
    server.post('/api/poll', pollController.handlePost);
    server.get('/api/poll/:pollId', pollController.handleGet);
    server.post('/api/vote/', voteController.handlePost);


    server.use(middleware);
    server.use(webpackHotMiddleware(compiler));
    server.get('*', function response (req, res) {
        res.write(middleware.fileSystem.readFileSync(path.join(__dirname, '../dist/index.html')));
        res.end();
    });
    server.use(errorHandler);

    server.listen(process.env.PORT || port, function () {
        console.log("\nRunning on port.." + port);
    });

})();


