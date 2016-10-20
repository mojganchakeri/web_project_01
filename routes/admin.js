var express = require('express');
var router = express.Router();
var AdminController = require('../controllers/AdminController');

router.get('/',AdminController.getIndex);

router.get('/info',AdminController.getInfo);

//TODO add user id param for showing data
router.get('/change' , AdminController.getChange);

router.post('/change' , AdminController.postChange);

module.exports = router;
