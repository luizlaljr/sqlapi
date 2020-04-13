const User = require('../models/User');
const Post = require('../models/Post');

module.exports = {
    async index(req, res) {
        try{
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

        } catch (error) {
            return res.status(500).json({
                "message-error": "There was a problem when handling this request to list users."
            })
        }
    },

    async store(req, res) {
        try {
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
    
            await User.create({
                trigram,
                post_id: wanted_post.id,
                name,
                condition,
                date_condition,
                status,
            });
    
            return res.status(201).json({
                "message": "User created with sucess."
            });

        } catch (error) {
            return res.status(500).json({
                "message-error": "There was a problem when handling this request to create user."
            })
        }
    },

    async show(req, res) {
        try {
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

            if(!user){
                throw error;
            }
    
            return res.status(200).json(user);
            
        } catch (error) {
            return res.status(500).json({
                "message-error": "There was a problem when handling this request to show user."
            })
        }
    },

    async update(req, res) {
        try {
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
    
            const number_users = await User.update({
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
            
            if(number_users < 1){
                throw error;
            }
            
            return res.status(200).json({
                "message": "User updated with sucess."
            });
            
        } catch (error) {
            return res.status(500).json({
                "message-error": "There was a problem when handling this request to update user."
            })
        }
    },

    async destroy(req, res) {
        try {
            const {
                user_id
            } = req.params;
    
            const number_users = await User.destroy({
                where: {
                    id: user_id,
                }
            });
            if(number_users < 1){
                throw error;
            }
            return res.status(202).json({
                "message": "User deleted with sucess."
            });
            
        } catch (error) {
            return res.status(500).json({
                "message-error": "There was a problem when handling this request to delete user."
            })
        }
    }
}