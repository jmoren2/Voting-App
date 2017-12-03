'use strict';
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