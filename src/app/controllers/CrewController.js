const Mission = require('../models/Mission');
const User = require('../models/User');

module.exports = {
    async store(req, res) {
        try {
            const {
                mission_id,
            } = req.params;
            const {
                trigram,
            } = req.body;

            const mission = await Mission.findByPk(mission_id);

            const user = await User.findOne({
                where: {
                    trigram: trigram
                },
            });

            await mission.addUser(user);

            return res.status(201).json({
                "message": "Crew created with sucess.",
            });

        } catch (error) {

            return res.status(500).json({
                "message-error": "There was a problem when handling this request to create crew.",
            });
        };

    },

    async destroy(req, res) {
        try {
            const {
                mission_id,
            } = req.params;
            const {
                trigram,
            } = req.body;

            const mission = await Mission.findByPk(mission_id);

            const user = await User.findOne({
                where: {
                    trigram: trigram
                },
            });

            await mission.removeUser(user);

            return res.status(202).json({
                "message": "Crew removed with sucess.",
            });

        } catch (error) {

            return res.status(500).json({
                "message-error": "There was a problem when handling this request to remove crew.",
            });
        };

    },

}