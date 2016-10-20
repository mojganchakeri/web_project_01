var User = require('../models/user');
var controller = {
	getIndex : function(req,res,next){
		if(req.user == undefined){
			res.redirect('/login');
		}
		if(req.user.is_network_admin == false){
			req.flash('errors',{msg:'سطح دسترسی شما کافی نمی باشد'});
			res.redirect('/panel');
		}
		res.render('admin/index' , {page_title : 'Admin Page'});
	},
	getInfo : function(req,res,next){
		if(req.user == undefined){
			res.redirect('/login');
		}
		if(req.user.is_network_admin == false){
			req.flash('errors',{msg:'سطح دسترسی شما کافی نمی باشد'});
			res.redirect('/panel');
		}
		res.render('admin/info' , {page_title : 'Admin Info'});
	},
	getChange : function(req,res,next){
		/*if(req.user == undefined){
			res.redirect('/login');
		}
		if(req.user.is_network_admin == false){
			req.flash('errors',{msg:'سطح دسترسی شما کافی نمی باشد'});
			res.redirect('/panel');
		}*/
		var users = [];
		var u = User.find(function(err,user){
			if(err){
				console.log(err);
			}
			return user;
		});
		
		res.render('admin/change' , {page_title :'Change Accessibility',users : users});
	},
	postChange :function(req,res,next){
		if(req.user == undefined){
			res.send('error');
		}
		if(req.user.is_network_admin == false){
			res.send('error');
		}
		res.render('admin/change' , {page_title : 'Change Accessibility'});
	}
};

module.exports = controller;