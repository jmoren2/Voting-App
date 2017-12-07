'use strict';

/*
Followed this tutorial to learn the backend and implement it

https://youtu.be/M7g76xnRxmA

Followed this series of tutorials to better understand sequelize

https://youtu.be/qsDvJrGMSUY
 */

module.exports = function (err, req, res) {
    if (err) {
        res.status(500).json({
            message: 'An internal server error occured'
        });
        console.log('An internal server error occurred: ' + err);
    }
};