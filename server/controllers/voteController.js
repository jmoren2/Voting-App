'use strict';

var db = require('sequelize-connect');
/*
Followed this tutorial to learn the backend and implement it

https://youtu.be/M7g76xnRxmA

Followed this series of tutorials to better understand sequelize

https://youtu.be/qsDvJrGMSUY
 */

var voteController = {};

voteController.handlePost = async function (req, res) {
    await db.models.vote.create({
        pollOptionId: req.body.pollOptionId
    })

    res.sendStatus(201)

};


module.exports = voteController;