var express = require('express');
var router = express.Router();
var AuthController = require('../controllers/AuthController');
var MainController = require('../controllers/MainController');
/* GET home page. */
router.get('/', MainController.getIndex);


router.get('/login',AuthController.getLogin);
router.get('/register',AuthController.getRegister);

router.post('/login',AuthController.postLogin);
router.post('/register',AuthController.postRegister);

router.get('/confirm/e/:email/c/:code',AuthController.getConfirm);

module.exports = router;
