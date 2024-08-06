const { verifyToken } = require("../helpers/jwt");
const { User } = require('../models');

const authentication = async (req, res, next) => {
    try {
        const access_token = req.headers.authorization;
        if (!access_token) throw {name: 'InvalidToken'}

        const [type, token] = access_token.split(' ');
        if (type !== 'Bearer') throw {name: 'InvalidToken'}
        if (!token) throw {name: 'InvalidToken'}

        const { id } = verifyToken(token);
        const findUser = await User.findByPk(id);
        if (!findUser) throw {name: 'InvalidToken'}

        req.user = { id };
        next();
    } catch (err) {
        next(err);
    }
}

module.exports = authentication;