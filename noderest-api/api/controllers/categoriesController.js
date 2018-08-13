'use strict';

const mongoose = require('mongoose');
const Category = mongoose.model('Categories');
const Task = mongoose.model('Tasks');

exports.get_categories_list = (req, res) => {
	//res.json(Task.schema.path('category').caster.enumValues);
	Category.find({}, (err, cat) => {
		if (err) { res.send(err); }
		res.json(cat);
	});
};

exports.create_a_category = (req, res) => {
	console.log(req.body);

	let temp_str = req.body.name.replace(' ','-');
	let temp_data = {
		'name': req.body.name,
		'value': temp_str,
		'description': req.body.description,
		'color': req.body.color
	}

	var new_category = new Category(temp_data);
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