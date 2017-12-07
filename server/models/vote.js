'use strict';
/*
Followed this tutorial to learn the backend and implement it

https://youtu.be/M7g76xnRxmA

Followed this series of tutorials to better understand sequelize

https://youtu.be/qsDvJrGMSUY
 */

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
