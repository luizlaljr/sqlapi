const Mission = require('../models/Mission');
const User = require('../models/User');

module.exports = {

    async show(req, res) {
        try {
            const {
                user_id
            } = req.params;

            const user = await User.findByPk(user_id,{
                attributes: [],
                include: [{
                    association: 'missions',
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

            res.status(200).json(user);

        } catch (error) {
            return res.status(500).json({
                "message-error": "There was a problem when handling this request to generate report.",
            });
        }
    }

}