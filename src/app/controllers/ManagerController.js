const User = require('../models/User');

module.exports = {
    async index (req, res) {
        try {

            const users = await User.sequelize.query(`SELECT view_base.id, view_base.antique, view_base.post, view_base.name, view_base.condition,  view_base.date_condition, view_base.operationality, view_base.activity, view_base.project, SUM(CEILING(amount)) as amount ,SUM(income) * view_base.factor + Sum(transport) * 95 as income 
            FROM view_base 
            LEFT OUTER JOIN ( crews INNER JOIN missions ON missions.id = crews.mission_id) ON view_base.id = crews.user_id  
            WHERE missions.start >= view_base.date_condition AND view_base.condition = true AND crews.link = 'C'
            GROUP BY view_base.id, view_base.post, view_base.name, view_base.antique, view_base.condition, view_base.date_condition, view_base.operationality, view_base.activity, view_base.project, view_base.factor
            UNION
            SELECT view_base.id, view_base.antique, view_base.post, view_base.name, view_base.condition,  view_base.date_condition, view_base.operationality, view_base.activity, view_base.project, SUM(amount) as amount ,SUM(income) * view_base.factor + Sum(transport) * 95 as income 
            FROM view_base 
            LEFT OUTER JOIN ( crews INNER JOIN missions ON missions.id = crews.mission_id) ON view_base.id = crews.user_id 
            WHERE missions.start >= view_base.date_condition AND view_base.condition = false AND crews.link = 'D'
            GROUP BY view_base.id, view_base.post, view_base.name, view_base.antique, view_base.condition, view_base.date_condition, view_base.operationality, view_base.activity, view_base.project, view_base.factor
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
