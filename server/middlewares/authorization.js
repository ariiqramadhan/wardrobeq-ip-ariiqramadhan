const { Item } = require('../models')

const authorization = async (req, res, next) => {
    try {
        const { itemId } = req.params;
        const findItem = await Item.findByPk(itemId);
        if (!findItem) throw {name: 'DataNotFound'}

        if (findItem.UserId !== req.user.id) throw {name: 'Forbidden'}

        next();
    } catch (err) {
        next(err);
    }
}

module.exports = authorization;