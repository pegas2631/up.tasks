<?php
namespace Up\Tasks\Controller;

use Bitrix\Landing\Repo;
use Bitrix\Main\Error;
use Up\Tasks\Task\Repository;

class Task extends \Bitrix\Main\Engine\Controller
{

	protected function getDefaultPreFilters()
	{
		return array_merge(
			parent::getDefaultPreFilters(),
			[
				new \Bitrix\Main\Engine\ActionFilter\HttpMethod(
					[\Bitrix\Main\Engine\ActionFilter\HttpMethod::METHOD_POST]
				),
				new \Bitrix\Main\Engine\ActionFilter\Scope(
					\Bitrix\Main\Engine\ActionFilter\Scope::AJAX
				),
			]
		);
	}

	public function getListAction(): ?array
	{
		$taskList = Repository::getPage();
		return [
			'taskList' => $taskList
		];
	}

	public function deleteTaskAction(int $id): ?array
	{
		return Repository::deleteTask($id);
	}

	public function createTaskAction(string $name): ?array
	{
		if (!empty( trim($name)))
		{
			return Repository::createTask($name);
		}
		return null;
	}
}

/*
 *
 */