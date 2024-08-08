const router = require('express').Router();
const authentication = require('../middlewares/authentication');
const ItemController = require('../controllers/item');
const authorization = require('../middlewares/authorization');

router.use(authentication);
router.get('/', ItemController.items);
router.post('/', ItemController.addItem);
router.get('/cat', ItemController.catItems);
router.get('/:itemId', authorization, ItemController.itemDetail);
router.put('/:itemId', authorization, ItemController.updateItem);
router.delete('/:itemId', authorization, ItemController.deleteItem);

module.exports = router;