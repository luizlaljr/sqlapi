const User = require('../models/User');

module.exports = {

    async show(req, res) {
        try {
            const {
                user_id
            } = req.params;

            const user = await User.findByPk(user_id, {
                attributes: ['name', 'condition', 'date_condition', 'document', 'operationality', 'activity', 'project', 'sex'],
                include: {
                    association: 'posts',
                    attributes: ['name'],
                },
            });


            const users = await User.sequelize.query(`SELECT crews.link, SUM(CEILING(amount)) as amount ,SUM(income) * posts.factor + Sum(transport) * 95 as income FROM users LEFT OUTER JOIN ( crews INNER JOIN missions ON missions.id = crews.mission_id) ON users.id = crews.user_id LEFT OUTER JOIN ( promotions INNER JOIN posts ON posts.id = promotions.post_id) ON users.id = promotions.user_id WHERE users.id = ${user_id} AND missions.start >= users.date_condition GROUP BY crews.link, posts.factor`, {
                model: User,
                mapToModel: true,
                nest: true,
            });

            const result = {
                post: user.posts[user.posts.length - 1].name,
                name: user.name,
                condition: user.condition,
                date_condition: user.date_condition,
                document: user.document,
                operationality: user.operationality,
                activity: user.activity,
                project: user.project,
                sex: user.sex,
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