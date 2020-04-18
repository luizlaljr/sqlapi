const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    async store(req, res) {
        try {
            const {
                email,
                password,
            } = req.body;

            const userFound = await User.findOne({
                where: {
                    email: email,
                }
            });

            if (!userFound) {
                throw error;
            }

            const userAuth = await bcrypt.compare(password,userFound.password);
            
            if (!userAuth) {
                throw error;
            }

            const token = jwt.sign({
                trigram: userFound.trigram,
                email: userFound.email,
            },
            process.env.JWT_KEY,
            {
                expiresIn: '1d',
            })

            return res.status(200).json({
                message: "User authenticated with success.",
                token: token,
            });

        } catch (error) {
            return res.status(401).json({
                "message-error": "There was a problem handling this authentication.",
            });
        }
    }
}