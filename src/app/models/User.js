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
            date_query: DataTypes.DATE,
            modulus: DataTypes.BOOLEAN,
            prevision: DataTypes.INTEGER,
            document: DataTypes.STRING,
            operationality: DataTypes.STRING,
            activity: DataTypes.STRING,
            project: DataTypes.STRING,
            sex: DataTypes.STRING,
            skin: DataTypes.STRING,
            status: DataTypes.BOOLEAN,
            password: DataTypes.STRING,
            profile: DataTypes.STRING,
        }, {
            sequelize,
        })
    }

    static associate(models) {
        this.belongsToMany(models.Post, {
            foreignKey: 'user_id',
            through: models.Promotion,
            as: 'posts',
        });
        this.hasMany(models.Promotion, {
            as: 'promotions',
        })
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
