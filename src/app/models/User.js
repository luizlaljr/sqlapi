const {
    Model,
    DataTypes
} = require('sequelize');

class User extends Model {
    static init(sequelize) {
        super.init({
            email: DataTypes.STRING,
            antique: DataTypes.INTEGER,
            trigram: DataTypes.STRING,
            name: DataTypes.STRING,
            condition: DataTypes.BOOLEAN,
            date_condition: DataTypes.DATE,
            document: DataTypes.STRING,
            operationality: DataTypes.STRING,
            status: DataTypes.BOOLEAN,
            password: DataTypes.STRING,
            profile: DataTypes.STRING,
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
            through: models.Crew,
            as: 'missions',
        })
        this.hasMany(models.Crew, {
            as: 'crews',
        })
    }

}

module.exports = User;