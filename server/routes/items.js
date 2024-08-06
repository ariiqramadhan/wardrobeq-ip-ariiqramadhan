const router = require('express').Router();
const authentication = require('../middlewares/authentication');
const ItemController = require('../controllers/item');
const authorization = require('../middlewares/authorization');

router.use(authentication);
router.get('/', ItemController.items);
router.get('/cat', ItemController.catItems);
router.post('/', ItemController.addItem);
router.put('/:itemId', authorization, ItemController.updateItem);

module.exports = router;