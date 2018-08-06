'use strict';

const mongoose = require('mongoose');
const Task = mongoose.model('Tasks');

exports.list_all_tasks = (req,res) => {
	Task.find({}, (err,task) => {
		if(err) { res.send(err); }
		res.json(task);
	});
};

exports.create_a_task = (req,res) => {
	var new_task = new Task(req.body);
	console.log(new_task);
	new_task.save((err,task) => {
		if(err) { res.send(err); }
		res.json(task);
	});
};

exports.read_a_task = (req,res) => {
	Task.findById(req.params.taskId, (err,task) => {
		if(err) { res.send(err); }
		res.json(task);
	});
};

exports.update_a_task = (req, res) => {
	console.log(res.body);
	Task.findOneAndUpdate(
		{_id: req.params.taskId},
		req.body,
		{new: true},
		(err,task) => {
			if(err) { res.send(err); }
			res.json(task);
		}
	);
};

exports.delete_a_task = (req, res) => {
	Task.remove(
		{ _id: req.params.taskId },
		(err, task) => {
			if (err) { res.send(err); }
			res.json(task);
		}
	)
};

exports.get_status_list = (req,res) => {
	res.json(Task.schema.path('status').caster.enumValues);
};

exports.get_categories_list = (req,res) => {
	res.json(Task.schema.path('category').caster.enumValues);
};