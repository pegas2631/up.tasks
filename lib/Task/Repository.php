<?php

namespace Up\Tasks\Task;

use Up\Tasks\Model\TasksTable;

class Repository
{
	public static function getPage(int $itemsPerPage, int $pageNumber): array
	{

		if ($pageNumber>1)
		{
			$offset = $itemsPerPage * ($pageNumber - 1);
		}
		else
		{
			$offset = 0;
		}

		$taskList = TasksTable::getList([
			'select' => [
				'ID',
				'NAME'
			],
			'limit' => $itemsPerPage,
			'offset' => $offset,
		])->fetchAll();

		return $taskList;
	}

	public static function createTask(string $name): ?array
	{
		$result = TasksTable::add([
			'NAME' => $name
		]);
		if ($result->isSuccess())
		{
			return null;
		}
		else
		{
			return $result->getErrors();
		}
	}

	public static function deleteTask(int $id): ?array
	{
		$result = TasksTable::delete($id);
		if ($result->isSuccess())
		{
			return null;
		}
		else
		{
			return $result->getErrors();
		}
	}
}