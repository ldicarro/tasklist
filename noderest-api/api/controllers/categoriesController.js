'use strict';

const mongoose = require('mongoose');
const Category = mongoose.model('Categories');
const Task = mongoose.model('Tasks');

exports.get_categories_list = (req, res) => {
	res.json(Task.schema.path('category').caster.enumValues);
};

exports.create_a_category = (req, res) => {
	var new_category = new Category(req.body);
	console.log(new_category);
	new_category.save((err, category) => {
		if (err) { res.send(err); }
		console.log(category._id);
		res.json({
			"message": "Task created",
			"id": category._id
		});
	});
};