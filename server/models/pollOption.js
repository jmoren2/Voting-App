'use strict';

/*
Followed this tutorial to learn the backend and implement it

https://youtu.be/M7g76xnRxmA

Followed this series of tutorials to better understand sequelize

https://youtu.be/qsDvJrGMSUY
 */

module.exports = function createPollOptionModel (sequelize, DataTypes) {
    var pollOption = sequelize.define('pollOption', {
        option: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false,
        classMethods: {
            associate (models) {
                pollOption.belongsTo(models.poll)
                pollOption.hasMany(models.vote)
            }
        }
    })

    return pollOption
}
