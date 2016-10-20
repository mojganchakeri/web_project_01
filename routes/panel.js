var express = require('express');
var router =  express.Router();
var PanelController = require('../controllers/PanelController');

router.get('/',PanelController.getIndex);

//TODO add user id param for finding show whose info
router.get('/info/:email' ,PanelController.getInfo);


module.exports = router;
