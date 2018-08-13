'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const d = new Date( new Date().getTime() + (365 * 24 * 3600 * 1000));

var TaskSchema = new Schema({
	name: {
		type: String,
		required: 'Enter name of task'
	},
	details: {
		type: String,
		default: ''
	},
	due_date: {
		type: Date,
		default: d
	},
	created_date: {
		type: Date,
		default: Date.now
	},
	status: {
		type: [{
			type: String,
			enum: ['pending', 'ongoing', 'completed']
		}],
		default: ['pending']
	},
	category: {
		type: String
	}
});

module.exports = mongoose.model('Tasks', TaskSchema);