var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var db = require('./mongo');
var helper = require('./helper');

passport.use(new LocalStrategy(
	function(username,password,done){
		db.collection('users').findOne({username:username},function(err,user){
			if(err){return done(err);}
			if(!user){
				return done(null,false,{message:'این نام کاربری موجود نیست'});
			}
			if(!helper.check_password(password,user.password)){
				return done(null,false,{message:'رمز عبور صحیحی نمی باشد'});
			}
			return done(null,user);
		});
	}
));

module.exports = passport;