const router = require('express').Router();
const UserController = require('../controllers/user');
const authentication = require('../middlewares/authentication');

router.use(authentication);
router.get('/', UserController.userInfo);
router.put('/', UserController.updateProfile)

module.exports = router;