// ------------------------------------------------------------------------------------------
// Tasks
// ------------------------------------------------------------------------------------------
/**
 * @api {get} /tasks Get list of all tasks
 * @apiName ListAllTasks
 * @apiGroup Tasks
 * 
 * @apiSuccess {Object[]} tasks Array of task objects
 * @apiSuccess {String} tasks.details Details of task
 * @apiSuccess {String} tasks.due_date Due date
 * @apiSuccess {String[]} tasks.status Status of task
 * @apiSuccess {String[]} tasks.category Category of task
 * @apiSuccess {String} tasks.created_date Date task was entered
 * @apiSuccess {String} tasks._id ID of task
 * @apiSuccess {String} tasks.name Name of task
 * @apiSuccess {Int} tasks.__v DB return
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *   [
 *     {
 *       "details":"",
 *       "due_date":"2019-08-07T17:45:07.150Z",
 *       "status":["pending"],
 *       "category":["cat-1"],
 *       "created_date":"2018-08-07T17:45:08.133Z",
 *       "_id":"5b621e8694826a160348e116",
 *       "name":"task name",
 *       "__v":0
 *     }
 *   ]
 * 
 */

/**
 * @api {post} /tasks Create a new task
 * @apiName CreateATask
 * @apiGroup Tasks
 * 
 * @apiParam {Object} task Task Object
 * @apiParam {String} task.details Details of task
 * @apiParam {String} task.due_date Due date
 * @apiParam {String[]} task.status Status of task
 * @apiParam {String[]} task.category Category of task
 * @apiParam {String} task.name Name of task
 * @apiParamExample {json} Request-Example:
 *   {
 *     "details":"Details of task",
 *     "due_date":"2019-08-07T17:45:07.150Z",
 *     "status":["pending"],
 *     "category":["cat-1"],
 *     "name":"task name",
 *   }
 * 
 * @apiSuccess {String} message Task created
 * @apiSuccess {String} id ID of created task
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "message":"Task created",
 *     "id":"5b69ea2bb5df2b4019fd3f15"
 *   }
 */

/**
 * @api {get} /tasks/:id Find a task
 * @apiName ReadATask
 * @apiGroup Tasks
 * 
 * @apiParam {id} id Task id
 * 
 * @apiSuccess {Object} task Task objects
 * @apiSuccess {String} task.details Details of task
 * @apiSuccess {String} task.due_date Due date
 * @apiSuccess {String[]} task.status Status of task
 * @apiSuccess {String[]} task.category Category of task
 * @apiSuccess {String} task.created_date Date task was entered
 * @apiSuccess {String} task._id ID of task
 * @apiSuccess {String} task.name Name of task
 * @apiSuccess {Int} task.__v DB return
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "details":"",
 *     "due_date":"2019-08-07T17:45:07.150Z",
 *     "status":["pending"],
 *     "category":["cat-1"],
 *     "created_date":"2018-08-07T17:45:08.133Z",
 *     "_id":"5b621e8694826a160348e116",
 *     "name":"task name",
 *     "__v":0
 *   }
 * 
 * @apiError TaskNotFound Task not found in database.
 * @apiErrorExample Response (example):
 *     HTTP/1.1 404 Task Not Found
 *     {
 *       "error": "TaskNotFound"
 *     }
 */
/**
 * @api {put} /tasks/:id Update a task
 * @apiName UpdateATask
 * @apiGroup Tasks
 * 
 * @apiParam {id} id Task id
 * 
 * @apiParam {Object} task Task Object
 * @apiParam {String} task.details Details of task
 * @apiParam {String} task.due_date Due date
 * @apiParam {String[]} task.status Status of task
 * @apiParam {String[]} task.category Category of task
 * @apiParam {String} task.name Name of task
 * @apiParamExample {json} Request-Example:
 *   {
 *     "details":"Details of task",
 *     "due_date":"2019-08-07T17:45:07.150Z",
 *     "status":["pending"],
 *     "category":["cat-1"],
 *     "name":"task name",
 *   }
 *
 * @apiSuccess {String} message Task Updated if successful
 * @apiSuccess {String} id ID of updated task
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "message":"Task Updated",
 *     "id":"5b69ea2bb5df2b4019fd3f15"
 *   }
 */
/**
 * @api {delete} /tasks/:id Delete a task
 * @apiName DeleteATask
 * @apiGroup Tasks
 * @apiParam {id} id Task id
 * 
 * @apiParam {id} id Task id
 * 
 * @apiSuccess {String} message Task Deleted if successful.
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *   "Task Deleted"
 */

// ------------------------------------------------------------------------------------------
// Statuses
// ------------------------------------------------------------------------------------------
/**
 * @api {get} /statuses Get a list of statuses
 * @apiName GetStatusList
 * @apiGroup Status
 * 
 * @apiSuccess {String} statusname Array of status names
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *   ["pending","ongoing","completed"]
 * 
 */

// ------------------------------------------------------------------------------------------
// Categories
// ------------------------------------------------------------------------------------------
/**
 * @api {get} /categories Get a list of categories
 * @apiName GetCategoriesList
 * @apiGroup Categories
 * 
 * @apiSuccess {String} categoryname Array of category names
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *   ["cat-1","cat-2","cat-3"]
 * 
 */