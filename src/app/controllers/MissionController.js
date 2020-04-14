const Mission = require('../models/Mission');

module.exports = {
    async index(req, res) {
        try {
            const missions = await Mission.findAll({
                include: {
                    association: 'users',
                    attributes : [ 'trigram' ],
                    through: {
                        attributes: [],
                    },
                },
            });

            return res.status(200).json(missions);

        } catch (error) {
            return res.status(500).json({
                "message-error": "There was a problem when handling this request to list missions.",
            });
        };
    },

    async store(req, res) {
        try {
            const {
                number,
                step,
                locale,
                amount,
                transport,
                value,
                start,
                end,
            } = req.body;

            await Mission.create({
                number,
                step,
                locale,
                amount,
                transport,
                value,
                start,
                end,
            });

            return res.status(201).json({
                "message": "Mission created with sucess.",
            });

        } catch (error) {
            return res.status(500).json({
                "message-error": "There was a problem when handling this request to create mission.",
            });
        }
    },

    async show(req, res) {
        try {
            const {
                mission_id,
            } = req.params;

            const mission = await Mission.findByPk(mission_id, {
                include: {
                    association: 'users',
                },
            });

            return res.status(200).json(mission);

        } catch (error) {
            return res.status(500).json({
                "message-error": "There was a problem when handling this request to show mission.",
            });
        };
    },

    async update(req, res) {
        try {
            const {
                mission_id,
            } = req.params;
            const {
                number,
                step,
                locale,
                amount,
                transport,
                value,
                start,
                end,
            } = req.body;

            const number_missions = await Mission.update({
                number,
                step,
                locale,
                amount,
                transport,
                value,
                start,
                end,
            }, {
                where: {
                    id: mission_id,
                },
            });

            if (number_missions < 1) {
                throw error;
            };

            return res.status(200).json({
                "message": "Mission updated with sucess.",
            });

        } catch (error) {
            return res.status(500).json({
                "message-error": "There was a problem when handling this request to update mission.",
            });
        };
    },

    async destroy(req, res) {
        try {
            const {
                mission_id,
            } = req.params;

            const number_missions = await Mission.destroy({
                where: {
                    id: mission_id,
                },
            });

            if (number_missions < 1) {
                throw error;
            };

            return res.status(202).json({
                "message": "Mission deleted with sucess.",
            });

        } catch (error) {
            return res.status(500).json({
                "message-error": "There was a problem when handling this request to delete mission.",
            });
        };
    },
};