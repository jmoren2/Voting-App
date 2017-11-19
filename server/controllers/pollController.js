'use strict';

var pollController = {};
var db = require('sequelize-connect');


pollController.handlePost= function (req, res, next) {
  db.sequelize.transaction(async transaction => {
      if(req.body.options.length < 2){
          res.status(400).json({
              message: 'You need to give option to vote for!'
          });
            return;
      }

      if (req.body.options.length > 5) {
          res.status(400).json({
              message: 'Too many poll options'
          });
          return
      }
      const createdPoll = await db.models.poll.create({
          question: req.body.question
      }, {
          transaction
      })
      const pollOptions = req.body.options.map(option => {
          return {
              text: option,
              pollId: createdPoll.dataValues.id
          }
      })
      await db.models.pollOption.bulkCreate(pollOptions, {
          transaction
      })
      res.status(201).json({
          createdPollId: createdPoll.dataValues.id
      })
  }).catch(next)
};

pollController.handleGet = async function (req, res, next) {
  try{
      const foundPoll = await db.models.poll.findOne({
          where: {
              id: req.params.pollId
          },
          group: ['pollOptions.id'],
          order: [[db.sequelize.literal('`pollOptions.voteCount`'), 'ASC']],
          attributes: ['question'],
          include: {
              model: db.models.pollOption,
              attributes: [
                  ['id', 'optionId'],
                  'text',
                  [db.sequelize.fn('COUNT', db.sequelize.col('pollOptions.votes.id')), 'voteCount']
              ],
              include: {
                  model: db.models.vote,
                  attributes: []
              }
          }
      });

      res.status(200).json(foundPoll.dataValues);

  } catch(err)
  {
      next(err);
  }
};

module.exports = pollController;

