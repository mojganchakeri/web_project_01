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
	    passwordField: 'password',
	    passReqToCallback: true
  	},
	function(req,username,password,done){
		User.findOne({email:username},function(err,user){
			if(err){return done(err);}
			if(!user){
				return done(null,false,req.flash('errors', {msg:'کاربری با مشخصات ورودی یافت نگردید'}));
			}
			if(!helper.check_password(password,user.password)){
				return done(null,false,req.flash('errors', {msg:'رمز عبور وارد شده اشتباه می باشد'}));
			}
			if(user.is_confirm_email == false){
				return done(null,false,req.flash('errors', {msg:'پس از تایید ایمیل قادر به ورود خواهید بود'}));
			}
			return done(null,user);
		});
	}
));

module.exports = passport;