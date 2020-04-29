const {
    Model,
    DataTypes
} = require('sequelize');

class Crew extends Model{
    static init(sequelize){
        super.init({
            link: DataTypes.STRING,
        },{
            sequelize,
        })
    };
}

module.exports = Crew;