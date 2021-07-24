const User = require('../models/User');

module.exports = {

    async show(req, res) {
        try {
            const {
                user_id
            } = req.params;

            const wantedUser = await User.sequelize.query(`SELECT * FROM view_base WHERE view_base.id = ${user_id}`, {
                model: User,
                mapToModel: true,
                nest: true,
            });
            const user = wantedUser[0].dataValues;

            users = await User.sequelize.query(
                `SELECT crews.link, SUM(CEILING(amount)) as amount ,SUM(income) * view_base.factor + Sum(transport) * 95 as income FROM view_base 
                LEFT OUTER JOIN ( crews INNER JOIN missions ON missions.id = crews.mission_id) ON view_base.id = crews.user_id 
                WHERE view_base.id = ${user_id} AND missions.start >= view_base.date_query AND crews.link = 'C'
                GROUP BY crews.link, view_base.factor
                UNION
                SELECT crews.link, SUM(amount) as amount ,SUM(income) * view_base.factor + Sum(transport) * 95 as income FROM view_base 
                LEFT OUTER JOIN ( crews INNER JOIN missions ON missions.id = crews.mission_id) ON view_base.id = crews.user_id 
                WHERE view_base.id = ${user_id} AND missions.start >= view_base.date_query AND NOT crews.link = 'C'
                GROUP BY crews.link, view_base.factor`, {
                    model: User,
                    mapToModel: true,
                    nest: true,
                }
            );

            const result = {
                post: user.post,
                name: user.name,
                condition: user.condition,
                date_condition: user.date_condition,
                modulus: user.modulus,
                document: user.document,
                operationality: user.operationality,
                activity: user.activity,
                project: user.project,
                prevision: user.prevision,
                sex: user.sex,
                skin: user.skin,
                wage: user.wage,
                reports: users,
            }

            res.status(200).json(result);

        } catch (error) {
            return res.status(500).json({
                "message-error": "There was a problem when handling this request of totalizer.",
            });
        }
    }

}
