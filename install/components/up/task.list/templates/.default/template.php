<?php

/**
 * @var array $arResult
 * @var array $arParams
 */

\Bitrix\Main\UI\Extension::load('up.task-list');

if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true) die();
?>
<h1 class="title has-text-centered">Список задач</h1>
<div class="field has-addons">
	<div class="control is-expanded">
		<input id="task-input" class="input" type="text" placeholder="Введите новую задачу">
	</div>
	<div class="control">
		<button id="enter-button" class="button is-info">Добавить</button>
	</div>
</div>
<div id="tasks-list-app"></div>

<script>
	BX.ready( function(){
		window.TasksTaskList = new Up.Tasks.TaskList({
			rootNodeId: 'tasks-list-app',
		});
	});
</script>
