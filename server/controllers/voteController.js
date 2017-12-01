'use strict';

var db = require('sequelize-connect');


var voteController = {};

voteController.handlePost = async function (req, res, next) {
    try{
        await db.models.vote.create({
            pollOptionId: req.body.pollOptionId
        })

        res.sendStatus(201)
    }catch (err)
    {
        next(err);
    }

};


module.exports = voteController;