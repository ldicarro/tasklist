'use strict';
module.exports = function (app) {
	const auth = require('../controllers/authenticationController');
	const todo = require('../controllers/todoListController');
	const cats = require('../controllers/categoriesController');

	app.use(auth.check_token);

	app.route('/')
		.get(todo.list_all_tasks);

	app.route('/tasks')
		.get(todo.list_all_tasks)
		.post(todo.create_a_task);

	app.route('/tasks/:taskId')
		.get(todo.read_a_task)
		.put(todo.update_a_task)
		.delete(todo.delete_a_task);

	app.route('/statuses')
		.get(todo.get_status_list);

	app.route('/categories')
		.get(cats.get_categories_list)
		.post(cats.create_a_category);

};