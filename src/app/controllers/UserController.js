const User = require('../models/User');
const Post = require('../models/Post');
const bcrypt = require('bcrypt');

module.exports = {
    async index(_req, res) {
        try {
            const users = await User.findAll({
                attributes: {
                    exclude: ['email', 'password', 'createdAt', 'updatedAt']
                },
                include: {
                    association: 'posts',
                    attributes: ['name'],
                    through: {
                        attributes: [],
                    }
                },
                order: [ 'antique'],
            });
            
            return res.status(200).json(users);

        } catch (error) {
            return res.status(500).json({
                "message-error": "There was a problem when handling this request to list users.",
            });
        };
    },

    async store(req, res) {

        try {
            const {
                email,
                antique,
                trigram,
                post,
                date_promotion,
                name,
                condition,
                date_condition,
                document,
                operationality,
                activity,
                project,
                sex,
                status,
                password,
            } = req.body;

            const password_encrypt = await bcrypt.hash(password, 10);

            const newUser = await User.create({
                email,
                antique,
                trigram,
                name,
                condition,
                date_condition,
                document,
                operationality,
                activity,
                project,
                sex,
                status,
                password: password_encrypt,
            });

            const wanted_post = await Post.findOne({
                where: {
                    name: post,
                },
            });

            await newUser.addPost(wanted_post, {
                through: {
                    date_promotion: date_promotion, 
                }
            });


            return res.status(201).json({
                "message": "User created with sucess.",
            });

        } catch (error) {
            return res.status(500).json({
                "message-error": "There was a problem when handling this request to create user.",
            });
        };
    },

    async show(req, res) {
        try {
            const {
                user_id,
            } = req.params;

            const user = await User.findByPk(user_id, {
                attributes: {
                    exclude: [
                        'post_id',
                        'password',
                        'createdAt',
                        'updatedAt',
                    ],
                },
                include: {
                    association: 'posts',
                    attributes: ['name'],
                    through: {
                        attributes: [],
                    }
                },
            });

            if (!user) {
                throw error;
            };

            return res.status(200).json(user);

        } catch (error) {
            return res.status(500).json({
                "message-error": "There was a problem when handling this request to show user.",
                
            });
        };
    },

    async update(req, res) {
        const transaction = await User.sequelize.transaction();

        try {
            const {
                user_id,
            } = req.params;
            const {
                antique,
                trigram,
                post,
                date_promotion,
                name,
                condition,
                date_condition,
                document,
                operationality,
                activity,
                project,
                sex,
                status,
                profile,
            } = req.body;

            const user = await User.findByPk(user_id);

            let wanted_post = '';
            if (post != null) {
                wanted_post = await Post.findOne({
                    where: {
                        name: post,
                    }
                });
                await user.addPost(wanted_post, {
                    through: {
                        date_promotion: date_promotion, 
                    }
                }, {transaction: transaction});
            }        

            const number_users = await User.update({
                email: user.email,
                antique: antique != null ? antique : user.antique,
                trigram: trigram != null ? trigram : user.trigram,
                name: name != null ? name : user.name,
                condition: condition != null ? condition : user.condition,
                date_condition: date_condition != null ? date_condition : user.date_condition,
                document: document != null ? document : user.document,
                operationality: operationality != null ? operationality : user.operationality,
                activity: activity != null ? activity : user.activity,
                project: project != null ? project : user.project,
                sex: sex != null ? sex : user.sex,
                status: status != null ? status : user.status,
                password: user.password,
                profile: profile != null ? profile : user.profile,
            }, {
                where: {
                    id: user_id,
                },
                transaction : transaction,
            });

            await transaction.commit();

            return res.status(200).json({
                "message": "User updated with sucess.",
            });

        } catch (error) {
            await transaction.rollback();
            return res.status(500).json({
                "message-error": "There was a problem when handling this request to update user.",
            });
        };
    },

    async destroy(req, res) {
        try {
            const {
                user_id
            } = req.params;

            await User.destroy({
                where: {
                    id: user_id,
                },
            });

            return res.status(202).json({
                "message": "User deleted with sucess.",
            });

        } catch (error) {
            return res.status(500).json({
                "message-error": "There was a problem when handling this request to delete user.",
            });
        };
    },
}