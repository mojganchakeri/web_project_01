var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { page_title: 'Express' });
});

/* Get Login Page */
router.get('/login',function(req,res,next){
	res.render('auth/login',{page_title : 'Login'});
});

/* Get Register Page */
router.get('/register',function(req,res,next){
	res.render('auth/register',{page_title : 'Register'});
});



router.post('/login',function(req,res,next){
	//TODO complete login post page
	res.render('auth/login',{page_title:'Login'});
});

router.post('/register',function(req,res,next){
	//TODO complete register post page
	res.render('auth/register',{page_title :'Register'});
});


module.exports = router;
