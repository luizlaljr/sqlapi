const User = require('../models/User');

module.exports = {
    async index (req, res) {
        try {

            const users = await User.sequelize.query(`SELECT users.id, users.antique, posts.name, users.name, users.condition,  users.date_condition, users.operationality, users.activity, users.project, SUM(CEILING(amount)) as amount ,SUM(income) * posts.factor + Sum(transport) * 95 as income 
            FROM users 
            LEFT OUTER JOIN ( crews INNER JOIN missions ON missions.id = crews.mission_id) ON users.id = crews.user_id 
            LEFT OUTER JOIN posts ON users.post_id = posts.id 
            WHERE missions.start >= users.date_condition AND users.condition = true AND crews.link = 'C'
            GROUP BY users.id, posts.name, users.name, users.antique, users.condition, users.date_condition, users.operationality, users.activity, users.project, posts.factor
            UNION
            SELECT users.id, users.antique, posts.name, users.name, users.condition,  users.date_condition, users.operationality, users.activity, users.project, SUM(CEILING(amount)) as amount ,SUM(income) * posts.factor + Sum(transport) * 95 as income 
            FROM users 
            LEFT OUTER JOIN ( crews INNER JOIN missions ON missions.id = crews.mission_id) ON users.id = crews.user_id 
            LEFT OUTER JOIN posts ON users.post_id = posts.id 
            WHERE missions.start >= users.date_condition AND users.condition = false AND crews.link = 'D'
            GROUP BY users.id, posts.name, users.name, users.antique, users.condition, users.date_condition, users.operationality, users.activity, users.project, posts.factor
            ORDER BY antique`, {
                model: User,
                mapToModel: true,
                nest: true,
            });

            res.status(200).json(users);
        } catch (error) {
            return res.status(500).json({
                "message-error": "There was a problem when handling this request to list users.",
            });
        }
    }
}