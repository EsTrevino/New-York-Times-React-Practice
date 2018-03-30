var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const articleSchema = new Schema({  

	title: String,
	text: String,
	date: String,
	url: String

});

module.exports = mongoose.model("Article", articleSchema);