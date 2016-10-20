var helper = {
	generate_string : function(length){
	  var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890'
	  var new_str = '';
	  for(i=0;i<length;i++){
	    new_str += str[Math.floor(Math.random()*str.length)-1]
	  }
	  return new_str;
	}
};

module.exports = helper;