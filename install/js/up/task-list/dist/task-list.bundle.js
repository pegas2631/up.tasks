this.Up = this.Up || {};
(function (exports,main_core) {
	'use strict';

	var _templateObject, _templateObject2;
	var TaskList = /*#__PURE__*/function () {
	  function TaskList() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    babelHelpers.classCallCheck(this, TaskList);
	    if (main_core.Type.isStringFilled(options.rootNodeId)) {
	      this.rootNodeId = options.rootNodeId;
	    } else {
	      throw new Error('TaskList: option.rootNodeId required');
	    }
	    this.rootNode = document.getElementById(this.rootNodeId);
	    if (!this.rootNode) {
	      throw new Error("TaskList: element with id \"".concat(this.rootNodeId, "\" not found"));
	    }
	    this.taskList = [];
	    this.reload();
	  }
	  babelHelpers.createClass(TaskList, [{
	    key: "reload",
	    value: function reload() {
	      var _this = this;
	      this.loadList().then(function (taskList) {
	        _this.taskList = taskList;
	        _this.render();
	      });
	    }
	  }, {
	    key: "loadList",
	    value: function loadList() {
	      return new Promise(function (resolve, reject) {
	        BX.ajax.runAction('up:tasks.task.getList', {
	          data: {
	            pageNumber: 1
	          }
	        }).then(function (response) {
	          var taskList = response.data.taskList;
	          resolve(taskList);
	        })["catch"](function (error) {
	          console.error(error);
	          reject(error);
	        });
	      });
	    }
	  }, {
	    key: "deleteTask",
	    value: function deleteTask(id) {
	      var _this2 = this;
	      BX.ajax.runAction('up:tasks.task.deleteTask', {
	        data: {
	          id: id
	        }
	      }).then(function (response) {
	        if (response.data != null) {
	          console.error('errors:', response.data);
	        } else {
	          _this2.reload();
	        }
	      })["catch"](function (error) {
	        console.error(error);
	      });
	    }
	  }, {
	    key: "createTask",
	    value: function createTask(name) {
	      var _this3 = this;
	      BX.ajax.runAction('up:tasks.task.createTask', {
	        data: {
	          name: name
	        }
	      }).then(function (response) {
	        if (response.data != null) {
	          console.error('errors:', response.data);
	        } else {
	          _this3.reload();
	        }
	      })["catch"](function (error) {
	        console.error(error);
	      });
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var _this4 = this;
	      this.rootNode.innerHTML = '';
	      var tasksContainerNode = main_core.Tag.render(_templateObject || (_templateObject = babelHelpers.taggedTemplateLiteral(["<ul class=\"task-list\"></ul>"])));
	      this.taskList.forEach(function (taskData) {
	        var taskNode = main_core.Tag.render(_templateObject2 || (_templateObject2 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t\t<li class=\"task-item\" data-task-id = \"", "\">\n\t\t\t\t\t<span>", "</span>\n\t\t\t\t\t<button class=\"delete-btn button is-danger\">X</button>\n\t\t\t\t</li>\n\t\t\t"])), taskData.ID, taskData.NAME);
	        tasksContainerNode.appendChild(taskNode);
	      });
	      this.rootNode.appendChild(tasksContainerNode);
	      var deleteBtns = document.querySelectorAll('.delete-btn');
	      deleteBtns.forEach(function (btn) {
	        btn.addEventListener('click', function () {
	          var taskId = parseInt(btn.parentNode.getAttribute('data-task-id'));
	          if (!isNaN(taskId)) {
	            _this4.deleteTask(taskId);
	          } else {
	            console.error('Attribute data-task-id of this element is not a number ');
	          }
	        });
	      });
	      var input = document.getElementById('task-input');
	      var enterButton = document.getElementById('enter-button');
	      var self = this;
	      enterButton.addEventListener('click', function () {
	        var inputValue = input.value;
	        if (inputValue.trim() != '') {
	          self.createTask(inputValue);
	          input.value = '';
	        }
	      });
	    }
	  }]);
	  return TaskList;
	}();

	exports.TaskList = TaskList;

}((this.Up.Tasks = this.Up.Tasks || {}),BX));
