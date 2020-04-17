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

            let total_amount = 0.0;
            let total_value = 0.0;
            for (let i = 0; i < user.missions.length; i++) {

                total_amount += user.missions[i].amount;
                total_value += parseFloat((user.missions[i].value * user.post.factor + user.missions[i].transport * 95).toFixed(2));
            }

            res.status(200).json({
                total_amount: total_amount,
                total_value: total_value
            });

        } catch (error) {
            return res.status(500).json({
                "message-error": "There was a problem when handling this request of totalizer.",
            });
        }
    }

}