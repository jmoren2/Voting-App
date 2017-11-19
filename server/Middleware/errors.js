'use strict';
var chalk = require('chalk');
module.exports = function (err, req, res, next) {
    if (err) {
        res.status(500).json({
            message: 'An internal server error occured'
        });
        console.log(
            chalk.red('An internal server error occurred: ' + err)
        )
    } else {
        next()
    }
};