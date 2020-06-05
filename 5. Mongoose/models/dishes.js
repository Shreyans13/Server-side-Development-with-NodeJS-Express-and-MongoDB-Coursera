const mongoose = require('mongoose');
const schema = mongoose.Schema

const dishSchema = new Schema({
	name : {
		type: String,
		required: true,
		unique: true
	},
	description: {
		type: String,
		required: true
	}
},{
	timestamps: true
});

let dishes = mongoose.model('dish', dishSchema);

module.exports = dishes