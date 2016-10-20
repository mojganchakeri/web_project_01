var express = require('express');
var crypt = require('crypto');
var user = require('../models/user');
var config = require('../config/config');
var helper = require('../config/helper');
var passport = require('../config/authenticate');

var controller = {
	getLogin : function(req,res,next){
		register_redirect = req.query.register == 'ok' ? true : false;
		var errors = req.flash('errors');
		res.render('auth/login',{page_title : 'Login',errors:errors,register : register_redirect});
	},
	postLogin : passport.authenticate('login' , {successRedirect : '/panel',failureRedirect : '/login' }),
	getRegister : function(req,res,next){
		res.render('auth/register',{page_title : 'Register'});
	},
	postRegister : function(req,res,next){
		
		var email = req.body.email;
		var password = req.body.password;
		var confirmPassword = req.body.confirm_password;
		var fullname = req.body.fullname;

		var errors = new Array();

		//email validate section
		var validateEmail = new RegExp( /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g);
		if(email.length == 0 || password.length == 0 || confirmPassword == 0 || fullname.length == 0){
			errors.push({msg:'تمامی فیلد های ستاره دار الزامی هستند'});
		}
		if(!validateEmail.test(email)){
			errors.push({msg : 'ایمیل مورد نظر صحیح نمی باشد'});
		}

		if(password.length < 6){
			errors.push({msg:'طول رمز عبور حداقل باید 6 کاراکتر باشد'});
		}
		if(password !== confirmPassword){
			errors.push({msg:'رمز های عبور با هم منطبق نمی باشند'});
		}

		//create user data and intialize for save
		var hash = crypt.createHmac('sha512',config.mySecretKey);
		hash.update(password);
		password = hash.digest('hex');
		var random_str = helper.generate_string(32);
		var data = new user({
			email : email,
			password : password,
			fullname : fullname,
			position : 'IRAN',
			reg_date : new Date(),
			lastlogin_data : new Date(),
			is_network_admin : false,
			is_email_confirm : false,
			confirm_key_value : random_str,
			access_aproved : false
		});


		user.findOne({email:email},function(err,user){
			if(err){
				return null;
			}
			if(user){
				errors.push({msg:'کاربری با این ایمیل از قبل موجود است'});
				res.render('auth/register',{page_title :'Register',errors : errors});
				return null;
			}else{
				if(errors.length == 0){
				//Hashing Password
					
					if(helper.send_confirm_email(email,random_str)){
						data.save();
						res.redirect('/login?register=ok');
					}else{
						errors.push({msg : 'خطایی در ارسال ایمیل ئیش امد مجددا تلاش کنید'});
						res.render('auth/register',{page_title :'Register',errors : errors});
					}
				}else{
					res.render('auth/register',{page_title :'Register',errors : errors});
				}
			}
		});
	},
	getConfirm : function(req,res,next){
		email = decodeURIComponent(req.params.email);
		console.log(email);
		code = req.params.code;
		errors = new Array();
		user.findOne({email:email},function(err,usr){
			if(err){
				errors.push({msg:'خطایی در یافتن کاربر رخ داد. مجدد تلاش کنید'});
				res.render('auth/login',{page_title : 'Login',register : false,errors: errors});
				return false;
			}
			if(!usr){
				errors.push({msg:'لینک وارد شده با توجه به ایمیل معتبر نمی باشد'});
				res.render('auth/login',{page_title : 'Login',register : false,errors: errors});
				return false;
			}
			console.log(code);
			if(usr.confirm_key_value != code){
				errors.push({msg:'لینک وارد شده معتبر نمی باشد'});
				res.render('auth/login',{page_title : 'Login',register : false,errors: errors});
				return false;
			}else{
				user.update({email : email},{is_email_confirm : true,confirm_key_value : "null"},{multi:false},function(err,AffectedRows){
					if(!err){
						console.log(AffectedRows);
						res.render('auth/login',{page_title : 'Login',register : false,confirmed:true});
						return false;
					}else{
						errors.push({msg:'خطایی در به روز رسانی اطلاعات به وجود آمد. مجدد تلاش کنید'})
						res.render('auth/login',{page_title : 'Login',register : false,errors: errors});
						return false;
					}
				})
			}
		})
	}
};


module.exports = controller;