var express = require('express');
var crypt = require('crypto');
var user = require('../models/user');
var config = require('../config/config');
var helper = require('../config/helper');



var controller = {
	getLogin : function(req,res,next){
		res.render('auth/login',{page_title : 'Login'});
	},
	postLogin : function(req,res,next){
		res.render('auth/login',{page_title:'Login'});
	},

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

		if(errors.length == 0){
			//Hashing Password
			var hash = crypt.createHmac('sha512',config.mySecretKey);
			hash.update(password);
			password = hash.digest('hex');

			var data = new user({
				email : email,
				password : password,
				fullname : fullname,
				position : 'IRAN',
				reg_date : new Date(),
				lastlogin_data : new Date(),
				is_network_admin : false,
				is_email_confirm : false,
				confirm_key_value : helper.generate_string(32),
				access_aproved : false
			});
			data.save();
			res.send('sign up is completed');
		}else{
			res.render('auth/register',{page_title :'Register',errors : errors});
		}
	},
};


module.exports = controller;