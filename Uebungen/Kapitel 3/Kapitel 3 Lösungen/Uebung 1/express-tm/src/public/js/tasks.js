function toggleTask(taskElement) {
  let taskStatus = taskElement.dataset.taskStatus;
  taskStatus = (taskStatus === 'open' ? 'done' : 'open');

  taskElement.dataset.taskStatus = taskStatus;
}

function removeTask(taskElement) {
  taskElement.parentElement.removeChild(taskElement);
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