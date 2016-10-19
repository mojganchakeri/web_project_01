var express = require('express');
var router = express.Router();

router.get('/',function(req , res , next){
	res.render('admin/index' , {page_title : 'Admin Page'});
});

router.get('/info',function(req , res , next){
	res.render('admin/info' , {page_title : 'Admin Info'});
});

//TODO add user id param for showing data
router.get('/change' , function(req , res , next){
	res.render('admin/change' , {page_title :'Change Accessibility'});
});

router.post('/change' , function(req , res , next){
	res.render('admin/change' , {page_title : 'Change Accessibility'});
});