'use strict';
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
