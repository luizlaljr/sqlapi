const {
    Model,
    DataTypes
} = require('sequelize');

class User extends Model {
    static init(sequelize) {
        super.init({
            trigram: DataTypes.STRING(3),
            name: DataTypes.STRING,
            condition: DataTypes.BOOLEAN,
            date_condition: DataTypes.DATE,
            status: DataTypes.BOOLEAN,
        }, {
            sequelize,
        })
    }

    static associate(models) {
        this.belongsTo(models.Post, {
            foreignKey: 'post_id',
            as: 'post',
        });
        this.belongsToMany(models.Mission, {
            foreignKey: 'user_id',
            through: 'crews',
            as: 'missions',
        })
    }
}

module.exports = User;