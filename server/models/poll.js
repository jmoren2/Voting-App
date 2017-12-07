'use strict';

/*
Followed this tutorial to learn the backend and implement it

https://youtu.be/M7g76xnRxmA

Followed this series of tutorials to better understand sequelize

https://youtu.be/qsDvJrGMSUY
 */

module.exports = function createPollModel (sequelize, DataTypes) {
    var poll = sequelize.define('poll', {
        question: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false,
        classMethods: {
            associate (models) {
                poll.hasMany(models.pollOption)
            }
        }
    });

    return poll
};