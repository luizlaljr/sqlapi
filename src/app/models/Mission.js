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
            income: DataTypes.FLOAT,
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
        this.hasMany(models.Crew, {
            as: 'crews',
        })
    }

}

module.exports = Mission;