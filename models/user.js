var mongoose = require('../config/mongo');

var _schema = mongoose.Schema;

var schema = new _schema({
	email : String,
	password : String,
	fullname : String,
	position : String,
	reg_date : Date,
	lastlogin_date : Date,
	is_network_admin : Boolean,
	is_email_confirm : Boolean,
	confirm_key_value : String,
	access_approved : Boolean
});

var model = mongoose.model('users',schema);

module.exports = model;