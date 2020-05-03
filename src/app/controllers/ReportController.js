const User = require('../models/User');
const {
    Op
} = require('sequelize');
const { base_date_condition } = require('../utils/BaseDateConditions');

module.exports = {

    async show(req, res) {
        try {
            const {
                user_id
            } = req.params;

            const {
                condition,
                date_condition
            } = await User.findByPk(user_id);

            initDate = base_date_condition(condition,date_condition);
            
            const users = await User.sequelize.query(`SELECT crews.link, kind, number, locale, start, missions.end, amount, income, transport, income * posts.factor + transport * 95 as income FROM users LEFT OUTER JOIN ( crews INNER JOIN missions ON missions.id = crews.mission_id) ON users.id = crews.user_id LEFT OUTER JOIN posts ON users.post_id = posts.id WHERE users.id = ${user_id} AND missions.start >= ${initDate} ORDER BY start`, {
                model: User,
                mapToModel: true,
                nest: true,
            });
            
            res.status(200).json(users);


        } catch (error) {
            console.log(error)
            return res.status(500).json({
                "message-error": "There was a problem when handling this request to generate report.",
            });
        }
    }

}