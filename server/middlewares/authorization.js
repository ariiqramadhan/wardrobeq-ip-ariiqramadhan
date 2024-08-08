const { Item, Profile } = require('../models')

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

const premiumAuth = async (req, res, next) => {
    try {
        const userProfile = await Profile.findOne({
            where: {
                UserId: req.user.id
            }
        });
        if (userProfile.type !== 'Premium') {
            throw {name: 'OnlyPremium'};
        }

        next();
    } catch (err) {
        next(err);
    }
}

module.exports = {
    authorization,
    premiumAuth
};