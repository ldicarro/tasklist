'use strict';
module.exports = function (app) {
	const todoList = require('../controllers/todoListController');
	const auth = require('../controllers/authenticationController');

	app.use(auth.check_token);

	app.route('/')
		.get(todoList.list_all_tasks);

	app.route('/tasks')
		.get(todoList.list_all_tasks)
		.post(todoList.create_a_task);

	app.route('/tasks/:taskId')
		.get(todoList.read_a_task)
		.put(todoList.update_a_task)
		.delete(todoList.delete_a_task);

	app.route('/statuses')
		.get(todoList.get_status_list);

	app.route('/categories')
		.get(todoList.get_categories_list);

};