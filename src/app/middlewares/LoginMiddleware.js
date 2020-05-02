const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
    try {
        const { user_id } = req.params;
        const token = req.headers.authorization.split(' ')[1];
        const decode = jwt.verify(token, process.env.JWT_KEY);
        
        token_user = await User.findOne({ where: {trigram:decode.trigram}});
        
        if ( user_id != token_user.id){
            throw error;
        }

        next();
    } catch (error) {
        return res.status(401).send({message_error: 'Authentication failed.',
        user: token_user,
        trigram: token_user.trigram,
        id: token_user.id,        
        user_id: user_id,
    });
    }
}