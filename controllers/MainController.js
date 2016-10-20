var controller = {
	getIndex : function(req,res,next){
  		res.render('index', { page_title: 'Express' });
	}
};

module.exports = controller;