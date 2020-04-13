const User = require('../models/User');
const Post = require('../models/Post');

module.exports = {
    async index(req, res) {
        
            const users = await User.findAll({
                attributes: {
                    exclude: ['post_id', 'createdAt', 'updatedAt']
                },
                include: {
                    association: 'post',
                    attributes: ['name'],
                },
            });

            return res.status(200).json(users);            
        
    },

    async store(req, res) {
        const {
            trigram,
            post,
            name,
            condition,
            date_condition,
            status,
        } = req.body;

        const wanted_post = await Post.findOne({
            where: {
                name: post,
            }
        });

        const user = await User.create({
            trigram,
            post_id: wanted_post.id,
            name,
            condition,
            date_condition,
            status,
        });

        return res.json(user);
    },

    async show(req, res) {
        const {
            user_id
        } = req.params;

        const user = await User.findByPk(user_id, {
            attributes: {
                exclude: ['post_id', 'createdAt', 'updatedAt']
            },
            include: {
                association: 'post',
                attributes: ['name'],
            },
        });

        return res.json(user);
    },

    async update(req, res) {
        const {
            user_id
        } = req.params;
        const {
            trigram,
            post,
            name,
            condition,
            date_condition,
            status
        } = req.body;

        const wanted_post = await Post.findOne({
            where: {
                name: post,
            }
        });

        const user = await User.update({
            trigram,
            post_id: wanted_post.id,
            name,
            condition,
            date_condition,
            status,
        }, {
            where: {
                id: user_id,
            }
        });

        return res.json(user);
    },

    async destroy(req, res) {
        const {
            user_id
        } = req.params;

        User.destroy({
            where: {
                id: user_id,
            }
        });

        return res.json();
    }
}