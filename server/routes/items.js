const router = require('express').Router();
const authentication = require('../middlewares/authentication');
const ItemController = require('../controllers/item');
const authorization = require('../middlewares/authorization');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({storage: storage});

router.use(authentication);
router.get('/', ItemController.items);
router.post('/', ItemController.addItem);
router.get('/cat', ItemController.catItems);
router.get('/cat/all', ItemController.catItemsAll);
router.get('/cat/:catId', ItemController.itemByCat);
router.get('/:itemId', authorization, ItemController.itemDetail);
router.put('/:itemId', authorization, ItemController.updateItem);
router.delete('/:itemId', authorization, ItemController.deleteItem);
router.patch('/:itemId/img', authorization, upload.single('itemImg'), ItemController.uploadPhoto);

module.exports = router;