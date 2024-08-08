const router = require('express').Router();
const ItemController = require('../controllers/item');
const authentication = require('../middlewares/authentication');

router.post('/fun-fact', authentication, ItemController.funFact);
router.post('/outfit', authentication, ItemController.genOutfit)

module.exports = router;