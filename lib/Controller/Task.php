<?php
namespace Up\Tasks\Controller;

use Bitrix\Landing\Repo;
use Bitrix\Main\Error;
use Up\Tasks\Task\Repository;

class Task extends \Bitrix\Main\Engine\Controller
{

	protected const TASK_PER_PAGE = 20;

	public function getListAction(int $pageNumber = 1): ?array
	{
		if ($pageNumber < 1){
			$this->addError(new Error('pageNumber should be greater than 0', 'invalid_page_number'));
			return null;
		}

		$taskList = Repository::getPage(self::TASK_PER_PAGE, $pageNumber);

		return [
			'pageNumber' => $pageNumber,
			'taskList' => $taskList,
		];
	}

	public function deleteTaskAction(int $id): ?array
	{
		return Repository::deleteTask($id);
	}

	public function createTaskAction(string $name): ?array
	{
		return Repository::createTask($name);
	}
}

/*
 *
 */