const {
    Model,
    DataTypes
} = require('sequelize');

class Mission extends Model {
    static init(sequelize) {
        super.init({
            number: DataTypes.STRING,
            step: DataTypes.STRING(1),
            locale: DataTypes.STRING(4),
            amount: DataTypes.DECIMAL(5, 2),
            transport: DataTypes.INTEGER,
            value: DataTypes.DECIMAL(10, 2),
            start: DataTypes.DATE,
            end: DataTypes.DATE,
        }, {
            sequelize,
        });
    };

    static associate(models) {
        this.belongsToMany(models.User, {
            foreignKey: 'mission_id',
            through: 'crews',
            as: 'users',
        });
    }

}

module.exports = Mission;