var express = require('express');
var router =  express.Router();


router.get('/',function(req ,res , next){
	res.render('panel/index' , {page_title: 'Panel Page'});
});

//TODO add user id param for finding show whose info
router.get('/info' ,function(req , res , next){
	res.render('panel/info' , {page_title: 'User Info Page'});
});