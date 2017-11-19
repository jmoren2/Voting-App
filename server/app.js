'use strict';

var express = require('express');
var db = require('sequelize-connect');
var server = express();
var port = 8080;
var path = require('path');





async function connect () {
    db.discover = path.join(__dirname, 'models');
    db.matcher = function shouldImportModel(modelFileName) {
        return true;
    };
    await db.connect('voting_schema', 'root', '');
    /*var orm = new db(
        'voting_schema',
        'root',
        '',
        {
            host: 'localhost',
            dialect: "mysql",
            port:    3306
        },
        db.discover,
        db.matcher
    )*/
}

(async function () {
    try{
    await connect();
    console.log('Connection Successful');
    }
    catch (err)
    {
        console.log('An error occurred when connecting: ' + err);
    }
    server.get('*', function (req,res) {
        res.send("hello");
    });

    server.listen(process.env.PORT || port, function () {
        console.log("\nRunning on port.." + port);
    });

})();


