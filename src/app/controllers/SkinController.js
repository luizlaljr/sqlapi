const User = require('../models/User');

module.exports = {
    async show(req, res) {
        try {
            const {
                user_id,
            } = req.params;

            const user = await User.findByPk(user_id);
            
            return res.status(200).json({
                "skin": user.skin,
            });
        } catch (error) {
            
            return res.status(500).json({
                "message-error": "There was a problem when handling this request to show user skin.",
            });
        };
    },

    async update(req, res) {
        try {
            const {
                user_id,
                skin,
            } = req.params;

            await User.update({
                skin: skin
            }, {
                where: {
                    id: user_id
                },
            });
            
            return res.status(200).json({
                "skin": skin,
            });
        } catch (error) {

            return res.status(500).json({
                "message-error": "There was a problem when handling this request to update user skin.",
            });
        };
    }
}
