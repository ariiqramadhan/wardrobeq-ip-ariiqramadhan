const router = require('express').Router();
const UserController = require('../controllers/user');
const PaymentController = require('../controllers/payment');
const authentication = require('../middlewares/authentication');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({storage: storage});

router.use(authentication);
router.get('/', UserController.userInfo);
router.put('/', UserController.updateProfile);
router.patch('/img', upload.single('userImg'), UserController.uploadPhoto);
router.get('/payment/midtrans', PaymentController.initiateMidtrans);
router.patch('/upgrade', UserController.upgrade);

module.exports = router;