var mongoose = require ('mongoose')
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose')
var passport = require('passport')

var UserSchema = new Schema({
	firstname: {
		type: String,
		default: ''
	},
	lastname: {
		type: String,
		default: ''
	},
	admin: {
		type: Boolean,
		default: false
	}
})

UserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model ('User', UserSchema)