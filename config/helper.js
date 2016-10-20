var crypt = require('crypto');
var config = require('config');

var helper = {
	generate_string : function(length){
	  var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890'
	  var new_str = '';
	  for(i=0;i<length;i++){
	    new_str += str[Math.floor(Math.random()*str.length)-1]
	  }
	  return new_str;
	},
	check_assword : function(password,hashedPassword){
			var hash = crypt.createHmac('sha512',config.mySecretKey);
			hash.update(password);
			password = hash.digest('hex');
			if(password == hashedPassword){
				return true;
			}
			return false;
	}
};

module.exports = helper;