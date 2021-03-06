const Mission = require('../models/Mission');
const User = require('../models/User');
const Crew = require('../models/Crew');
const {
    Op
} = require('sequelize');

module.exports = {
    async index(req, res) {
        try {
            const {
                mission_id,
            } = req.params;

            const crews = await Mission.findByPk(mission_id, {
                attributes: [],
                include: {
                    association: 'users',
                    attributes: ['trigram'],
                    through: {
                        attributes: [],
                    },
                },
            });

            const listCrews = [];

            crews.users.map( c => (listCrews.push(c.trigram)))

            return res.status(200).json(listCrews);

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                "message-error": "There was a problem when handling this request to list crews.",
            });
        };
    },

    async store(req, res) {
        try {
            const {
                mission_id,
            } = req.params;
            const {
                trigram,
                link
            } = req.body;

            const mission = await Mission.findByPk(mission_id);

            const user = await User.findOne({
                where: {
                    trigram: trigram
                },
            });
            
            userLink = user.getDataValue('condition') ? 'C' : 'D';
            const user_added = await mission.addUser(user, {
                through: {
                    link: link != null ? link : userLink, 
                }
            });

            if (!user_added) {
                return res.status(409).json({
                    "message": "User is already in the mission.",
                });
            }

            return res.status(201).json({
                "message": "Crew created with sucess.",
            });

        } catch (error) {
            return res.status(500).json({
                "message-error": "There was a problem when handling this request to create crew.",
            });
        };

    },

    async show(req, res) {
        try {
            const {
                mission_id,
                trigram,
            } = req.params;

            const mission = await Mission.findByPk(mission_id);

            const user = await User.findOne({
                where: {
                    trigram
                },
            });

            const userExists = await mission.hasUser(user);

            if (userExists) {
                const crew = await Crew.findOne({
                    where: {
                        [Op.and]: [{
                            user_id: user.id,
                        }, {
                            mission_id,
                        }],
                    },
                });

                return res.status(200).json(crew.link);

            }

            return res.status(200).json(userExists);

        } catch (error) {
            return res.status(500).json({
                "message-error": "There was a problem when handling this request to show link.",
            });
        };
    },

    async update(req, res) {
        try {
            const {
                mission_id,
                trigram,
            } = req.params;

            const {
                link,
            } = req.body;

            const user = await User.findOne({
                where: {
                    trigram
                },
            });

            const crew = await Crew.update({link:link}, {
                where: {
                    [Op.and]: [{
                        user_id: user.id,
                    }, {
                        mission_id,
                    }],
                },
            });

            return res.status(200).json({
                "message": "Crew updated with sucess.",
            });

        } catch (error) {
            return res.status(500).json({
                "message-error": "There was a problem when handling this request to update crew.",
            });
        };
    },

    async destroy(req, res) {
        try {
            const {
                mission_id,
                trigram,
            } = req.params;

            const mission = await Mission.findByPk(mission_id);

            const user = await User.findOne({
                where: {
                    trigram
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
