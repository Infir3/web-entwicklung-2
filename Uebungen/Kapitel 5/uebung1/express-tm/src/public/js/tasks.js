function toggleTask(taskElement) {
  let taskStatus = taskElement.dataset.taskStatus;
  taskStatus = (taskStatus === 'open' ? 'done' : 'open');

  let request = new XMLHttpRequest();
  let id = taskElement.dataset.id;
  request.open('PATCH', 'tasks/' + id, true);
  request.setRequestHeader('Content-Type', 'application/json');
  request.onload = function (event) {
    if (request.status === 200) {
      taskElement.dataset.taskStatus = taskStatus;
    }
  }
  request.send(JSON.stringify({status: taskStatus }));  
}

function removeTask(taskElement) {
  let request = new XMLHttpRequest();
  let id = taskElement.dataset.id;

  request.open('DELETE', 'tasks/' + id, true);
  request.onload = function (event) {
    if (request.status === 200) {
      taskElement.parentElement.removeChild(taskElement);
    }
  }
  request.send();
}

function initButtons(selector, callback) {
  let collection = document.querySelectorAll(selector);

  for (let i = 0; i < collection.length; i++) {
    let element = collection[i];
    let taskElement = element.parentElement;
    element.addEventListener("click", function () {
      callback(taskElement);
    });    
  }
}

initButtons('.toggle-task', toggleTask);
initButtons('.remove-task', removeTask);
