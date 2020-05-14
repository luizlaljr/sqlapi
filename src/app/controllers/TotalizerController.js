const User = require('../models/User');
const { base_date_condition } = require('../utils/BaseDateConditions');

const con = require('../index');

module.exports = {

    async show(req, res) {
        try {
            const {
                user_id
            } = req.params;

            const user = await User.findByPk(user_id, {
                attributes: ['name','condition','date_condition'],
                include: {
                    association: 'post',
                    attributes: ['name'],
                },
            });

            initDate = base_date_condition(user.condition,user.date_condition);
            
            const users = await User.sequelize.query(`SELECT crews.link, SUM(amount) as amount ,SUM(income) * posts.factor + Sum(transport) * 95 as income FROM users LEFT OUTER JOIN ( crews INNER JOIN missions ON missions.id = crews.mission_id) ON users.id = crews.user_id LEFT OUTER JOIN posts ON users.post_id = posts.id WHERE users.id = ${user_id} AND missions.start >= ${initDate} GROUP BY crews.link, posts.factor`, {
                model: User,
                mapToModel: true,
                nest: true,
            });
            
            const result = {
                post: user.post.name,
                name: user.name,
                condition: user.condition,
                date_condition: user.date_condition,
                report: users,
            }

            res.status(200).json(result);

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                "message-error": "There was a problem when handling this request of totalizer.",
            });
        }
    }

}