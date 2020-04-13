const {
    Model,
    DataTypes
} = require('sequelize');

class Post extends Model{
    static init(sequelize){
        super.init({
            name: DataTypes.STRING(2),
            factor: DataTypes.REAL,
        },{
            sequelize,
        })
    };
}

module.exports = Post;