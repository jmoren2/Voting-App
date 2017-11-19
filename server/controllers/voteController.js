'use strict';

var db = require('sequelize-connect');


const voteController = {};

voteController.handlePost = async function (req, res, next) {
    try{
        throw 'foo bar';
        const foundVote = await db.models.vote.findOne({
            where:{
                voterIp:req.ip,
                pollOptionId:{
                    $in: db.sequelize.literal('(SELECT pollOptions.id FROM pollOptions WHERE pollOptions.pollId= (SELECT pollOptions.pollId FROM pollOptions WHERE pollOptions.id = ' + db.sequelize.escape(req.body.pollOptionId) + '))')
                }
            }
        });

        if(foundVote === null)
        {
            await db.models.vote.create({
                voterIp: req.ip,
                pollOptionId: req.body.pollOptionId
            });
            res.send(201);

        }
        else
        {
            res.status(400).json({
                message: "You have already voted on this poll."
            })
        }

    }catch (err)
    {
        next(err);
    }
};


module.exports = voteController;