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

    static associate(models) {
        this.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'users',
        });
        this.belongsTo(models.Mission, {
            foreignKey: 'mission_id',
            as: 'missions',
        });
    }
}

module.exports = Crew;