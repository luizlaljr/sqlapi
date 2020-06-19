const {
    Model,
    DataTypes
} = require('sequelize');

class Promotion extends Model{
    static init(sequelize){
        super.init({
            date_promotion: DataTypes.DATE,
        },{
            sequelize,
        })
    };

    static associate(models) {
        this.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'users',
        });
        this.belongsTo(models.Post, {
            foreignKey: 'post_id',
            as: 'posts',
        });
    }
}

module.exports = Promotion;