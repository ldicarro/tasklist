const container = document.querySelector('.tasks-container');
const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const monthNamesAbbr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const HOST = 'http://localhost:3000/';
const TASK = 'tasks';

let selectedId = '';

document.querySelector('#newTaskSubmit').addEventListener('click',addTask);
document.querySelector('#editTaskSubmit').addEventListener('click',updateTask);
document.querySelector('#editTaskMonth').addEventListener('change',updateNumberOfDays);
document.querySelector('#editTaskYear').addEventListener('change',updateNumberOfDays);
document.querySelector('#newTaskMonth').addEventListener('change', updateNumberOfDays);
document.querySelector('#newTaskYear').addEventListener('change', updateNumberOfDays);
document.querySelector('.new-task-button').addEventListener('click',showNewTaskModal);

document.querySelectorAll('.button-cancel').forEach(el => el.addEventListener('click',hideTaskModal));

(function init()
{
	fetchTaskList();
	fetchStatusList();
	fetchCategoriesList();

	let tempD = new Date();
	let selYearEdit = document.querySelector('#editTaskYear');
	let selYearNew = document.querySelector('#newTaskYear');
	let selMonthEdit = document.querySelector('#editTaskMonth');
	let selMonthNew = document.querySelector('#newTaskMonth');
	
	let selDaysEdit = document.querySelector('#editTaskDay');
	let selDaysNew = document.querySelector('#newTaskDay');

	for(let i = tempD.getFullYear(); i < tempD.getFullYear() + 5; i++)
	{
		let op = document.createElement('option');
		op.innerText = i;
		op.value = i;
		selYearEdit.appendChild(op);
		selYearNew.appendChild(op.cloneNode(true));
	}

	monthNamesAbbr.forEach((el,pos) => {
		let op = document.createElement('option');
		op.innerText = el;
		op.value = pos;
		selMonthEdit.appendChild(op);
		selMonthNew.appendChild(op.cloneNode(true));
	})


	updateNumberOfDays({currentTarget: selDaysEdit});
	updateNumberOfDays({ currentTarget: selDaysNew });
})();

function fetchTaskList()
{
	fetch(`${HOST}${TASK}`)
		.then((res) => { return res.json(); })
		.then((data) => { createTaskList(data); });
}

function fetchStatusList()
{
	fetch(`${HOST}statuses`)
		.then((res) => { return res.json(); })
		.then((data) => {
			const set0 = document.querySelector('#newTaskStatus');
			const set1 = document.querySelector('#editTaskStatus');

			data.forEach((el) => {
				let opt = document.createElement('option');
				opt.value = el;
				opt.innerText = el.toTitleCase()

				set0.appendChild(opt);
				set1.appendChild(opt.cloneNode(true));
			})
		})
}

function fetchCategoriesList() {
	fetch(`${HOST}categories`)
		.then((res) => { return res.json(); })
		.then((data) => {
			const sel0 = document.querySelector('#newTaskCategories');
			const sel1 = document.querySelector('#editTaskCategories');

			data.forEach((el) => {
				let opt = document.createElement('option');
				opt.value = el;
				opt.innerText = el.toTitleCase()

				sel0.appendChild(opt);
				sel1.appendChild(opt.cloneNode(true));
			})
		})
}

/*---- task related ----*/
function addTask() {

	let name = document.querySelector('#newTaskName');
	let desc = document.querySelector('#newTaskDescription');
	let catmenu = document.querySelector('#newTaskCategories');
	let cat = catmenu.options[catmenu.selectedIndex].value.toLowerCase();
	let newtask = `\
name=${name.value ? encodeURI(name.value) : ''}&\
details=${desc.value ? encodeURI(desc.value) : ''}&\
due_date=${new Date().getTime()}&\
category=${encodeURI(cat)}\
`;

	if(name.value)
	{
		fetch(
			`${HOST}${TASK}`,
			{
				method: 'POST',
				body: newtask,
				headers: headers
			}
		)
		.then((res) => { return res.json(); })
		.then((data) => { console.log(data); clearTaskList(); })
		.catch((err) => { console.error(err); });
	}
	else
	{
		return false;
	}
	console.log('click');
}

function deleteTask(e)
{

	fetch(`${HOST}${TASK}/${selectedId}`,
		{
			method: 'DELETE'
		}
	)
		.then((res) => { return res.text(); })
		.then((data) => { clearTaskList(); hideTaskModal(e); });
}

function completeTask(e)
{
	fetch(`${HOST}${TASK}/${selectedId}`,
		{
			method: 'PUT',
			body: 'status=completed',
			headers: headers
		})
		.then((res) => { return res.json(); })
		.then((data) => { clearTaskList(); hideTaskModal(e); });
}

function updateTask(e)
{
	let id = document.querySelector('#editTaskId').innerText;
	let name = document.querySelector('#editTaskName');
	let desc = document.querySelector('#editTaskDescription');
	let catmenu = document.querySelector('#editTaskCategories');
	let cat = catmenu.options[catmenu.selectedIndex].value.toLowerCase();
	let statmenu = document.querySelector('#editTaskStatus');
	let status = statmenu.options[statmenu.selectedIndex].value.toLowerCase();

	let m = document.querySelector('#editTaskMonth').value;
	let d = document.querySelector('#editTaskDay').value;
	let y = document.querySelector('#editTaskYear').value;

	let timestring = new Date(`${y}-${m}-${d}`).getTime();

	let newtask = `\
id=${id}&\
name=${name.value ? encodeURI(name.value) : ''}&\
details=${desc.value ? encodeURI(desc.value) : ''}&\
due_date=${timestring}&\
category=${encodeURI(cat)}&\
status=${encodeURI(status)}\
`;
console.log(newtask);
	fetch(`${HOST}${TASK}/${id}`,
		{
			method: 'PUT',
			body: newtask,
			headers: headers
		})
		.then((res) => { return res.json(); })
		.then((d) => { console.log(d); clearTaskList(); hideTaskModal(e); });
}


/*--- gui related ---*/
var dd = [];

function createTaskList(data) {
	if (!'content' in document.createElement('template')) { console.log('false'); return false; }

	let template = document.querySelector('#list-item-template');

	dd = data;
	data.sort((a, b) => { return a.status[0] < b.status[0]; });

	const now = new Date();

	data.forEach((el) => {
		let listitem = document.importNode(template.content, true);

		listitem.querySelector('.list-item').classList.add(el.status);
		listitem.querySelector('.list-item').classList.add(now.getTime() > el.due_date ? 'overdue' : el.status);
		listitem.querySelector('.list-item').classList.add(el.category);

		listitem.querySelector('.list-item-title').setAttribute('data-id', el._id);

		listitem.querySelector('.task-name').innerText = el.name;
		listitem.querySelector('.status').innerText += el.status;
		listitem.querySelector('.id').innerText += el._id;
		listitem.querySelector('.details').innerText += el.details;

		listitem.querySelector('.expand').onclick = (e) => { expandCollapseTask(e); };
		listitem.querySelector('.delete-task').onclick = (e) => { showConfirmModal(e,0); };
		listitem.querySelector('.complete').onclick = (e) => { showConfirmModal(e,1); };
		listitem.querySelector('.edit').onclick = (e) => { showUpdateTaskModal(e); }

		let d = new Date(el.created_date);
		listitem.querySelector('.created').innerText += `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;

		let due = new Date(el.due_date);
		listitem.querySelector('.duedate').innerText += `${due.getMonth() + 1}/${due.getDate()}/${due.getFullYear()}`;
		listitem.querySelector('.duedate').setAttribute('data-month', due.getMonth());
		listitem.querySelector('.duedate').setAttribute('data-day', due.getDate());
		listitem.querySelector('.duedate').setAttribute('data-year', due.getFullYear());

		container.appendChild(listitem);
	});
}

function showConfirmModal(e,id) {
	let msg = MESSAGES.message.find((el) => { return el.id === id });
	selectedId = e.currentTarget.parentElement.getAttribute('data-id');
	console.log(selectedId); 
	document.querySelector('.new-task').classList.remove('overlay');
	document.querySelector('.container').classList.add('overlay');
	document.querySelector('.new-task-container').classList.add('overlay');

	let modal =	document.querySelector('#messageModal');
	modal.querySelector('h3').innerText = msg.title;
	modal.querySelector('.formrow').innerText = msg.message;
	modal.querySelector('.button-confirm').innerText = msg.buttons[0];
	modal.querySelector('.button-confirm').onclick = window[msg.callback];
	modal.querySelector('.button-cancel').innerText = msg.buttons[1];
	modal.classList.add('overlay');
}

function showNewTaskModal(e)
{
	document.querySelector('.new-task').classList.remove('overlay');
	document.querySelector('.container').classList.add('overlay');
	document.querySelector('.new-task-container').classList.add('overlay');
	document.querySelector('#newTaskContainer').classList.add('overlay');

}

function showUpdateTaskModal(e)
{
	let editWindow = document.querySelector('#editTaskContainer');
	let parent = e.currentTarget.parentElement;

	editWindow.querySelector('#editTaskName').value = parent.querySelector('.task-name').innerText;
	editWindow.querySelector('#editTaskId').innerText = parent.getAttribute('data-id');
	editWindow.querySelector('#editTaskDescription').value = parent.parentElement.querySelector('.details').innerText.substr(9);
	editWindow.querySelector('#editTaskStatus').value = parent.parentElement.classList[1];
	editWindow.querySelector('#editTaskCategories').value = parent.parentElement.classList[2];

	editWindow.querySelector('#editTaskMonth').value = parent.parentElement.querySelector('.duedate').getAttribute('data-month');
	editWindow.querySelector('#editTaskDay').value = parent.parentElement.querySelector('.duedate').getAttribute('data-day');
	editWindow.querySelector('#editTaskYear').value = parent.parentElement.querySelector('.duedate').getAttribute('data-year');

	document.querySelector('.container').classList.add('overlay');
	document.querySelector('.new-task-container').classList.add('overlay');
	document.querySelector('#editTaskContainer').classList.add('overlay');
	
}

function hideTaskModal(e)
{
	let tgt = e.currentTarget ? e.currentTarget : e.target;
	tgt.parentElement.classList.remove('overlay');
	document.querySelector('.container').classList.remove('overlay');
	document.querySelector('.new-task-container').classList.remove('overlay');

}

function expandCollapseTask(e)
{
	let statusElement = e.currentTarget.parentElement.parentElement.querySelector('.task-info');

	if (e.currentTarget.className.match('expanded')) {
		e.currentTarget.classList.remove('expanded');
		statusElement.classList.remove('task-info-showing');
		statusElement.classList.add('task-info-collapse');
	}
	else {
		e.currentTarget.classList.add('expanded');
		statusElement.classList.remove('task-info-collapse');
		statusElement.classList.add('task-info-showing');
	}
}

function getDaysInMonth(y,m)
{
	return new Date(y,m,0).getDate();
}

function updateNumberOfDays(e)
{
	const parent = e.currentTarget.parentElement;

	const selDays = parent.querySelector('[name="selDay"]');
	const selMonth = parent.querySelector('[name="selMonth"]');
	const selYear = parent.querySelector('[name="selYear"]');

	const tempYr = parseInt(selYear.options[selYear.selectedIndex].value);
	const tempMt = parseInt(selMonth.options[selMonth.selectedIndex].value) + 1;

	selDays.innerHTML = '';


	for (let i = 1; i <= getDaysInMonth(tempYr,tempMt); i++) {
		let op = document.createElement('option');
		op.innerText = i;
		op.value = i;
		selDays.appendChild(op);
	}
}

function clearTaskList()
{
	container.innerHTML = '';
	fetchTaskList();
}

String.prototype.toTitleCase = function() {
	let tempstr = '';
	let process = this.split('')

	process.forEach((ltr,pos) => {
		tempstr +=  (pos === 0 || ltr[pos - 1] === ' ') ? ltr.toUpperCase() : ltr;
	});

	return tempstr;
}

const MESSAGES = {
	"message": [
		{
			"id": 0,
			"title": "Confirm",
			"message": "Are you sure you want to delete the task?",
			"buttons": ["Delete", "Cancel"],
			"callback": "deleteTask"
		},
		{
			"id": 1,
			"title": "Confirm",
			"message": "Are you sure you want to mark this task complete?",
			"buttons": ["Update", "Cancel"],
			"callback": "completeTask"
		}
	]
}
