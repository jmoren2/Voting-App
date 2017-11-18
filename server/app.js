'use strict';

var express = require('express');
var db = require('sequelize-connect');
var server = express();
var port = 8080;



var discover = [__dirname + '/models', ...];



async function connect() {

    var orm = await new Connection(
        'Voting-Schema',
        'root',
        '',
       discover,
    )
}

(async function () {
    try{
    await connect();

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


