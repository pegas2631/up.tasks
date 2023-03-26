import {Type, Tag, Loc} from 'main.core';
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
			})
	}

	loadList()
	{
		return new Promise((resolve, reject) => {
			BX.ajax.runAction(
					'up:tasks.task.getList',
					{
						data: {
							pageNumber: 1,
						}
					})
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
					}
				})
			.then((response) => {
				if (response.data != null)
				{
					console.error('errors:', response.data);
				}else{
					this.reload();
				}

			})
			.catch((error) => {
				console.error(error);
			})
		;
	}

	createTask(name){
		BX.ajax.runAction(
				'up:tasks.task.createTask',
				{
					data: {
						name: name,
					}
				})
			.then((response) => {
				if (response.data != null)
				{
					console.error('errors:', response.data);
				}else{
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
		this.taskList.forEach(taskData=>{
			const taskNode = Tag.render`
				<li class="task-item" data-task-id = "${taskData.ID}">
					<span>${taskData.NAME}</span>
					<button class="delete-btn button is-danger">X</button>
				</li>
			`;
			tasksContainerNode.appendChild(taskNode);
		});
		this.rootNode.appendChild(tasksContainerNode);


		const deleteBtns = document.querySelectorAll('.delete-btn');
		deleteBtns.forEach(btn => {
			btn.addEventListener('click', () => {
				const taskId = parseInt(btn.parentNode.getAttribute('data-task-id'));
				if ( !isNaN(taskId) )
				{
					this.deleteTask(taskId);
				}else{
					console.error('Attribute data-task-id of this element is not a number ');
				}
			});
		});

		const input = document.getElementById('task-input');
		const enterButton = document.getElementById('enter-button');
		const self = this;
		enterButton.addEventListener('click', function() {
			const inputValue = input.value;
			if ( inputValue.trim() != '')
			{
				self.createTask(inputValue);
				input.value = '';
			}
		});
	}
}