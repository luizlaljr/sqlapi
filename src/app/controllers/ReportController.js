const User = require('../models/User');
const {
    Op
} = require('sequelize');

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

            function base_date_condition() {
                initdate = new Date();
                initdate.setDate(1);
                initdate.setMonth(0);
                return condition ? date_condition : initdate;
            }

            const user = await User.findByPk(user_id, {
                attributes: [],
                order: [
                    ['missions', 'start']
                ],
                include: [{
                    association: 'missions',
                    where: {
                        start: {
                            [Op.gte]: base_date_condition()
                        }
                    },
                    attributes: {
                        exclude: ['id', 'createdAt', 'updatedAt']
                    },
                    through: {
                        attributes: []
                    },
                }, {
                    association: 'post',
                    attributes: {
                        exclude: ['id', 'createdAt', 'updatedAt']
                    }
                }]
            });

            for (let i = 0; i < user.missions.length; i++) {

                user.missions[i].income = parseFloat((user.missions[i].income * user.post.factor + user.missions[i].transport * 95).toFixed(2));
            }

            res.status(200).json(user.missions);

        } catch (error) {
            return res.status(500).json({
                "message-error": "There was a problem when handling this request to generate report.",
            });
        }
    }

}