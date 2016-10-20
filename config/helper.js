var crypt = require('crypto');
var config = require('./config');
var nodemailer = require('nodemailer');

var helper = {
	generate_string : function(length){
	  var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890'
	  var new_str = '';
	  for(i=0;i<length;i++){
	    new_str += str[Math.floor(Math.random()*str.length)-1]
	  }
	  return new_str;
	},
	check_password : function(password,hashedPassword){
			var hash = crypt.createHmac('sha512',config.mySecretKey);
			hash.update(password);
			password = hash.digest('hex');
			if(password == hashedPassword){
				return true;
			}
			return false;
	},
	send_confirm_email : function(email,str){
		var transporter = nodemailer.createTransport({
	        service: 'Gmail',
	        auth: {
	            user: 'hw0java0iut0course0950email', // Your email id
	            pass: '1234567890*' // Your password
	        }
	    });
		var link = 'http://localhost:3000/confirm/e/'+encodeURIComponent(email)+'/c/'+str
		var text = "<h3>Confirm your email</h3><br><p>Please Click On Bottom Link</p><br><a href=\""+link+"\" target=\"_blank\">"+link+"</a>";
		var mailOptions = {
		    from: '<hw0java0iut0course0950email>', // sender address
		    to: email, // list of receivers
		    subject: 'Confirm Your Email', // Subject line
		    text: text, //, // plaintext body
		    html : text
		};
		transporter.sendMail(mailOptions, function(error, info){
		    if(error){
		    	console.log('error');
		    }else{
		        console.log('success');
		    };
		});
		return true;
	}
};

module.exports = helper;