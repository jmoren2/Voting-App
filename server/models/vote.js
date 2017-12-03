'use strict';
module.exports = function createVoteModel (sequelize, DataTypes) {
    var vote = sequelize.define('vote', {
    }, {
        timestamps: false,
        classMethods: {
            associate (models) {
                vote.belongsTo(models.pollOption)
            }
        }
    })

    return vote
};
