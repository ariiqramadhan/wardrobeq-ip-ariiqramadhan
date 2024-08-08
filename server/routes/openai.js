const router = require('express').Router();
const ItemController = require('../controllers/item');
const authentication = require('../middlewares/authentication');
const { premiumAuth } = require('../middlewares/authorization');

router.post('/fun-fact', authentication, ItemController.funFact);
router.post('/outfit', authentication, premiumAuth, ItemController.genOutfit)

module.exports = router;