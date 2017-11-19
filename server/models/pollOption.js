'use strict';
module.exports = function createPollOptionModel (sequelize, DataTypes) {
    const pollOption = sequelize.define('pollOption', {
        text: {
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
