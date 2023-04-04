<?php

namespace Up\Tasks\Task;

use Up\Tasks\Model\TasksTable;

class Repository
{
	public static function getPage(): array
	{
		$taskList = TasksTable::getList([
			'select' => [
				'ID',
				'NAME'
			]
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