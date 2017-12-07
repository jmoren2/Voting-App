'use strict';

var pollController = {};
var db = require('sequelize-connect');

/*
Followed this tutorial to learn the backend and implement it

https://youtu.be/M7g76xnRxmA

Followed this series of tutorials to better understand sequelize

https://youtu.be/qsDvJrGMSUY
 */


pollController.handlePost= function (req, res, next) {
  db.sequelize.transaction(async function () {


      if(req.body.options.length < 2){
          res.status(400).json({
              message: 'You need to give option to vote for!'
          });
            return;
      }

      if (req.body.options.length > 50) {
          res.status(400).json({
              message: 'Too many poll options'
          });
          return
      }
      
      
      
      var createdPoll = await db.models.poll.create({
          question: req.body.question
      });


      var pollOptions = req.body.options.map(option => {
          return {
              option: option,
              pollId: createdPoll.dataValues.id
          }
      });

      await db.models.pollOption.bulkCreate(pollOptions);


      res.status(201).json({
          createdPollId: createdPoll.dataValues.id
      });

  }).catch(next)
};

pollController.handleGet = async function (req, res) {
        try {
            var poll = await db.models.poll.findOne({
                where: {
                    id: req.params.pollId
                },
                group: ['pollOptions.id'],
                attributes: ['question'],
                include: {
                    model: db.models.pollOption,
                    attributes: [
                        ['id', 'optionId'],
                        'option',
                        [db.sequelize.fn('COUNT', db.sequelize.col('pollOptions.votes.id')), 'voteCount']
                    ],
                    include: {
                        model: db.models.vote,
                        attributes: []
                    }
                }
            });

            res.status(200).json(poll.dataValues);

        }catch(err)
        {
            console.log(err);
            res.status(400).json({
                message: 'Poll not found!'
            });

        }
};

/*

handle get all was implemented by me

*/

pollController.handleGetAll = async (req, res)=> {
    var polls = await db.models.poll.findAll();
    res.status(200).json(polls);

    };


module.exports = pollController;

