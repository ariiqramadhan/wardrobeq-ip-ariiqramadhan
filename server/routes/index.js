const router = require('express').Router();
const UserController = require('../controllers/user');
const ItemController = require('../controllers/item');
const authentication = require('../middlewares/authentication');
const errorHandler = require('../middlewares/errorhandler');
 
router.get('/', (req, res) => {
    res.status(200).json('Server Running');
});
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/google-login', UserController.googleLogin);

router.use(authentication);
router.get('/items', ItemController.items);
router.get('/catitems', ItemController.catItems);
router.post('/items', ItemController.addItem);

router.use(errorHandler);

module.exports = router;