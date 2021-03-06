const Mission = require('../models/Mission');
const { Op } = require('sequelize');

module.exports = {
    async index(req, res) {
        try {
            const missions = await Mission.findAll({
                order: [ 'start', ['users', 'antique' ] ],
                include: {
                    association: 'users',
                    attributes: ['trigram'],
                    through: {
                        attributes: ['link'],                        
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
                kind,
                number,
                step,
                locale,
                amount,
                transport,
                income,
                start,
                end,
            } = req.body;

            const existMission = await Mission.findAll({
                where: {
                    kind: {[Op.eq] : kind},
                    number: { [Op.eq] : number},
                    step: { [Op.eq] : step},
                    start: { [Op.eq] : new Date(start)},
                },
            });
            

            if (existMission[0] == null) {
                const newMission = await Mission.create({
                    kind,
                    number,
                    step,
                    locale,
                    amount,
                    transport,
                    income,
                    start,
                    end,
                });

                return res.status(201).json({
                    "id": newMission.id,
                    "message": "Mission created with sucess.",
                });
            }else{
                return res.status(200).json({
                    "id": existMission[0].id,
                    "message": "Mission is already in the database.",
                });
            }

        } catch (error) {
            return res.status(500).json({
                "message-error": "There was a problem when handling this request to create mission.",
                error:error,
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
                    attributes: ['trigram'],
                    through: {
                        attributes: [],
                    },
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
                kind,
                number,
                step,
                locale,
                amount,
                transport,
                income,
                start,
                end,
            } = req.body;

            const mission = Mission.findByPk(mission_id);

            const number_missions = await Mission.update({
                kind: kind != null ? kind : mission.kind,
                number: number != null ? number : mission.number,
                step: step != null ? step : mission.step,
                locale: locale != null ? locale : mission.locale,
                amount: amount != null ? amount : mission.amount,
                transport: transport != null ? transport : mission.transport,
                income: income != null ? income : mission.income,
                start: start != null ? start : mission.start,
                end: end != null ? end : mission.end,
            }, {
                where: {
                    id: mission_id,
                },
            });

            if (number_missions != 1) {
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
                kind,
                number,
                step,
                start
            } = req.query;

            const findMission = await Mission.findOne({
                where: {
                    kind,
                    number,
                    step: step==''?null:step,
                    start: new Date(start)
                }
            });

            if (findMission) {
                await findMission.destroy();
                return res.status(202).json({
                    "message": "Mission deleted with sucess.",
                });
            }

            return res.status(204);

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                "message-error": "There was a problem when handling this request to delete mission.",
            });
        };
    },
};
