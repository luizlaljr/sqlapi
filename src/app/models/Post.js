const {
    Model,
    DataTypes
} = require('sequelize');

class Post extends Model{
    static init(sequelize){
        super.init({
            name: DataTypes.STRING,
            factor: DataTypes.FLOAT,
        },{
            sequelize,
        })
    };
}

module.exports = Post;