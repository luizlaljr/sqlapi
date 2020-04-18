const User = require('../models/User');
const Post = require('../models/Post');
const bcrypt = require('bcrypt');

module.exports = {
    async index(req, res) {
        try {
            const users = await User.findAll({
                attributes: {
                    exclude: ['post_id', 'email', 'password', 'createdAt', 'updatedAt']
                },
                include: {
                    association: 'post',
                    attributes: ['name'],
                },
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
                trigram,
                post,
                name,
                condition,
                date_condition,
                status,
                password,
            } = req.body;

            const wanted_post = await Post.findOne({
                where: {
                    name: post,
                },
            });

            const password_encrypt = await bcrypt.hash(password, 10);

            await User.create({
                email,
                trigram,
                post_id: wanted_post.id,
                name,
                condition,
                date_condition,
                status,
                password: password_encrypt,
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
                    association: 'post',
                    attributes: ['name'],
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
        try {
            const {
                user_id,
            } = req.params;
            const {
                trigram,
                post,
                name,
                condition,
                date_condition,
                status,
                profile,
            } = req.body;

            let wanted_post = '';
            if (post != null) {
                wanted_post = await Post.findOne({
                    where: {
                        name: post,
                    }
                });
            }

            const user = await User.findByPk(user_id);

            const number_users = await User.update({
                email: user.email,
                trigram: trigram != null ? trigram : user.trigram,
                post_id: post != null ? wanted_post.id : user.post,
                name: name != null ? name : user.name,
                condition: condition != null ? condition : user.condition,
                date_condition: date_condition != null ? date_condition : user.date_condition,
                status: status != null ? status : user.status,
                password: user.password,
                profile: profile != null ? profile : user.profile,
            }, {
                where: {
                    id: user_id,
                }
            });

            if (number_users != 1) {
                throw error;
            };

            return res.status(200).json({
                "message": "User updated with sucess.",
            });

        } catch (error) {
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

            const number_users = await User.destroy({
                where: {
                    id: user_id,
                },
            });
            if (number_users < 1) {
                throw error;
            }
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