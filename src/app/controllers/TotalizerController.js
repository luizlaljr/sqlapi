const User = require('../models/User');

module.exports = {

    async show(req, res) {
        try {
            const {
                user_id
            } = req.params;

            const user = await User.findByPk(user_id, {
                attributes: ['name','condition','date_condition','document','operationality','activity','project','sex'],
                include: {
                    association: 'post',
                    attributes: ['name'],
                },
            });

            const newDate = new Date();
            const initDate = `'1/1/${newDate.getFullYear()}'`;

            const dateCondition = new Date(user.date_condition);
            const newDateCondition = `'${dateCondition.getMonth()+1}/${dateCondition.getDate()+1}/${dateCondition.getFullYear()}'`;

            let users = new User();

            if(user.condition){
                users = await User.sequelize.query(`SELECT crews.link, SUM(amount) as amount ,SUM(income) * posts.factor + Sum(transport) * 95 as income FROM users LEFT OUTER JOIN ( crews INNER JOIN missions ON missions.id = crews.mission_id) ON users.id = crews.user_id LEFT OUTER JOIN posts ON users.post_id = posts.id WHERE users.id = ${user_id} AND ((missions.start >= ${initDate} AND crews.link = 'D') OR (missions.start >= ${newDateCondition} AND crews.link = 'C')) GROUP BY crews.link, posts.factor`, {
                    model: User,
                    mapToModel: true,
                    nest: true,
                });

            }else{
                users = await User.sequelize.query(`SELECT crews.link, SUM(amount) as amount ,SUM(income) * posts.factor + Sum(transport) * 95 as income FROM users LEFT OUTER JOIN ( crews INNER JOIN missions ON missions.id = crews.mission_id) ON users.id = crews.user_id LEFT OUTER JOIN posts ON users.post_id = posts.id WHERE users.id = ${user_id} AND ((missions.start >= ${initDate} AND crews.link = 'D') OR (missions.start >= ${newDateCondition} AND crews.link = 'G')) GROUP BY crews.link, posts.factor`, {
                    model: User,
                    mapToModel: true,
                    nest: true,
                });
            }
            
            
            const result = {
                post: user.post.name,
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