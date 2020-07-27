const User = require('../models/User');

module.exports = {

    async show(req, res) {
        try {
            const {
                user_id
            } = req.params;

            const users = await User.sequelize.query(
                `SELECT view_base.wage, crews.link, missions.id, kind, number, locale, start, missions.end, amount, income, 
                transport, income * view_base.factor + transport * 95 as income 
                FROM view_base 
                LEFT OUTER JOIN ( crews INNER JOIN missions ON missions.id = crews.mission_id) ON view_base.id = crews.user_id 
                WHERE view_base.id = ${user_id} AND missions.start >= view_base.date_condition 
                ORDER BY start DESC`, {
                    model: User,
                    mapToModel: true,
                    nest: true,
                }
            );

            res.status(200).json(users);

        } catch (error) {
            return res.status(500).json({
                "message-error": "There was a problem when handling this request to generate report.",
            });
        }
    }

}
