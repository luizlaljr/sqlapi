const {
    Model,
    DataTypes
} = require('sequelize');

class Post extends Model{
    static init(sequelize){
        super.init({
            name: DataTypes.STRING,
            factor: DataTypes.FLOAT,
            wage: DataTypes.FLOAT,
        },{
            sequelize,
        })
    };

    static associate(models) {
        this.belongsToMany(models.User, {
            foreignKey: 'post_id',
            through: models.Promotion,
            as: 'users',
        });
        this.hasMany(models.Promotion, {
            as: 'promotions',
        })
    }
}

module.exports = Post;