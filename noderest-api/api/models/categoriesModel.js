'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var CategoriesSchema = new Schema({
	name: {
		type: String,
		required: 'Enter name of category'
	}
});

module.exports = mongoose.model('Categories', CategoriesSchema);