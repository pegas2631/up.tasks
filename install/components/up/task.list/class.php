<?php

class TaskListComponent extends CBitrixComponent
{
	public function executeComponent()
	{
		$this->prepareTemplateParams();
		$this->fetchTaskList();
		$this->includeComponentTemplate();
	}

	public function onPrepareComponentParams($arParams)
	{
		$arParams['DATE_FORMAT'] = $arParams['DATE_FORMAT'] ?? 'd.m.Y';

		return $arParams;
	}

	protected function prepareTemplateParams()
	{
		$this->arResult['DATE_FORMAT'] = $this->arParams['DATE_FORMAT'];
	}

	protected function fetchTaskList()
	{
		// db connect
		// select * from TASKS
		$tasks = [
			[
				'id' => 123,
				'name' => 'Bitrix University Demo',
				'description' => 'lorem ipsum simple tool for managing issues simple tool for managing issues',
				'tasks_count' => 10,
				'last_activity' => new DateTime()
			],
			[
				'id' => 456,
				'name' => 'Projector - simple tool for managing issues',
				'description' => 'lorem ipsum simple tool for managing issues simple tool for managing issues',
				'tasks_count' => 10,
				'last_activity' => new DateTime()
			]
		];

		$this->arResult['TASKS'] = $tasks;
	}
}