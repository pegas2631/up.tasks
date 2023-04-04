import { Type, Tag, Text} from 'main.core';
import './task-list.css';


export class TaskList
{
	constructor(options = {})
	{
		if (Type.isStringFilled(options.rootNodeId))
		{
			this.rootNodeId = options.rootNodeId;
		}
		else
		{
			throw new Error('TaskList: option.rootNodeId required');
		}

		this.rootNode = document.getElementById(this.rootNodeId);
		if (!this.rootNode)
		{
			throw new Error(`TaskList: element with id "${this.rootNodeId}" not found`);
		}

		this.taskList = [];
		this.reload();
	}

	reload()
	{
		this.loadList()
			.then(taskList => {
				this.taskList = taskList;
				this.render();
			});
	}

	loadList()
	{
		return new Promise((resolve, reject) => {
			BX.ajax.runAction(
					'up:tasks.task.getList',
					)
				.then((response) => {
					const taskList = response.data.taskList;
					resolve(taskList);
				})
				.catch((error) => {
					console.error(error);
					reject(error);
				})
			;
		});
	}

	deleteTask(id)
	{
		BX.ajax.runAction(
				'up:tasks.task.deleteTask',
				{
					data: {
						id: id,
					},
				})
			.then((response) => {
				if (response.data != null)
				{
					console.error('errors:', response.data);
				}
				else
				{
					this.reload();
				}

			})
			.catch((error) => {
				console.error(error);
			})
		;
	}

	createTask(name)
	{
		BX.ajax.runAction(
				'up:tasks.task.createTask',
				{
					data: {
						name: name,
					},
				})
			.then((response) => {
				if (response.data != null)
				{
					for (let i = 0; i < response.data.length; i++)
					{
						if (response.data[i].code == "BX_INVALID_VALUE"){
							alert(response.data[i].message);
						}
					}
					console.error('errors:', response.data);
				}
				else
				{
					this.reload();
				}

			})
			.catch((error) => {
				console.error(error);
			})
		;
	}

	render()
	{
		this.rootNode.innerHTML = '';
		const tasksContainerNode = Tag.render`<ul class="task-list"></ul>`;
		this.taskList.forEach(taskData => {
			const taskNode = Tag.render`
				<li class="task-item" data-task-id = "${Text.encode(taskData.ID)}">
					<span>${Text.encode(taskData.NAME)}</span>
					<button class="delete-btn button is-danger">X</button>
				</li>
			`;
			tasksContainerNode.appendChild(taskNode);
		});
		this.rootNode.appendChild(tasksContainerNode);

		const deleteButtons = document.querySelectorAll('.delete-btn');
		deleteButtons.forEach(button => {
			button.addEventListener('click', () => {
				const taskId = parseInt(button.parentNode.getAttribute('data-task-id'));
				if (!isNaN(taskId))
				{
					this.deleteTask(taskId);
				}
				else
				{
					console.error('Attribute data-task-id of this element is not a number ');
				}
			});
		});

		const input = document.getElementById('task-input');
		const enterButton = document.getElementById('enter-button');

		enterButton.addEventListener('click', () => {
			const inputValue = input.value;
			if (inputValue.trim() !== '')
			{
				this.createTask(inputValue);
				input.value = '';
			}
		});
	}
}