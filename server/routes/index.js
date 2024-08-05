const router = require('express').Router();
const UserController = require('../controllers/user');
const errorHandler = require('../middlewares/errorhandler');

router.get('/', (req, res) => {
    res.status(200).json('Server Running');
});
router.post('/register', UserController.register);
router.post('/login', UserController.login);

router.use(errorHandler);

module.exports = router;