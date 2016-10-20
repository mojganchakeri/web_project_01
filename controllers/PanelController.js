var controller = {
	getIndex : function(req,res,next){
		if(req.user == undefined){
			res.redirect('/login');
		}
		if(req.user.is_network_admin == true){
			res.redirect('/admin');
		}
		user = req.user;
		errors=  req.flash('errors');
		res.render('panel/index',{page_title : 'Panel',user:user,errors:errors});
	},
	getInfo : function(req,res,next){
		if(req.user == undefined){
			res.redirect('/login');
		}
		if(req.user.is_network_admin == true){
			res.redirect('/admin');
		}
	}
};

module.exports = controller;