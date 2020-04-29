const {
    Model,
    DataTypes
} = require('sequelize');

class Mission extends Model {
    static init(sequelize) {
        super.init({
            number: DataTypes.STRING,
            step: DataTypes.STRING,
            locale: DataTypes.STRING,
            amount: DataTypes.FLOAT,
            transport: DataTypes.INTEGER,
            value: DataTypes.FLOAT,
            start: DataTypes.DATE,
            end: DataTypes.DATE,
        }, {
            sequelize,
        });
    };

    static associate(models) {
        this.belongsToMany(models.User, {
            foreignKey: 'mission_id',
            through: models.Crew,
            as: 'users',
        });
    }

}

module.exports = Mission;