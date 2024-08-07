const router = require('express').Router();
const UserController = require('../controllers/user');
const authentication = require('../middlewares/authentication');
const errorHandler = require('../middlewares/errorhandler');
const itemRouter = require('./items');
 
router.get('/', (req, res) => {
    res.status(200).json('Server Running');
});
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/google-login', UserController.googleLogin);
router.get('/user', authentication, UserController.userInfo);
router.use('/items', itemRouter);

router.use(errorHandler);

module.exports = router;