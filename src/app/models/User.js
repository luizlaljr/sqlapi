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

}

module.exports = User;