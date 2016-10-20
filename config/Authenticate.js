var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var helper = require('./helper');

//passport configure for serialize and deserialize
passport.serializeUser(function(user, done) {
  done(null, user._id);
});
 
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use('login',new LocalStrategy({
	    usernameField: 'email',
	    passwordField: 'password'
  	},
	function(username,password,done){
		User.findOne({email:username},function(err,user){
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