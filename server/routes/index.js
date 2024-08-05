const router = require('express').Router();
const UserController = require('../controllers/user');

router.get('/', (req, res) => {
    res.status(200).json('Server Running');
});
router.post('/register', UserController.register);

module.exports = router;