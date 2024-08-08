const router = require('express').Router();
const UserController = require('../controllers/user');
const authentication = require('../middlewares/authentication');
const errorHandler = require('../middlewares/errorhandler');
const itemRouter = require('./items');
const openAIRouter = require('./openai');
const userRouter = require('./user');
 
router.get('/', (req, res) => {
    res.status(200).json('Server Running');
});
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/google-login', UserController.googleLogin);
router.use('/user', userRouter);
router.use('/items', itemRouter);
router.use('/openai', openAIRouter);

router.use(errorHandler);

module.exports = router;