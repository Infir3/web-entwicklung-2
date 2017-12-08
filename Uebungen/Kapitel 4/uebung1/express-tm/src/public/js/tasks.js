let removeTasks = document.getElementsByClassName("remove-task");

for (var element of removeTasks) {
    element.addEventListener('click', function(event) {
        removeTask(this.parentNode);
    });
}

let toggleTasks = document.getElementsByClassName("toggle-task");

for (var element of toggleTasks) {
    element.addEventListener('click', function(event) {
        toggleTask(this.parentNode);
    });
}

function removeTask(li) {
    let id = li.getAttribute('data-id');
    let request = new XMLHttpRequest();
    request.open('DELETE', '/tasks/' + id, true);
    request.setRequestHeader('Accept', 'application/json');
    request.responseType = 'json';
    request.onload = function (event) {
        if (request.status === 200) {
            li.remove();
        } else {
            console.log('Status: ' + request.status + ' ' + request.statusText);
        }
    }
    request.onerror = function (event) {
        console.error('Es ist ein Fehler aufgetreten');
    }
    request.send();
}

function toggleTask(element) {
    let id = element.getAttribute('data-id');
    let status = element.getAttribute('data-task-status');
    let newStatus = '';
    if (status === 'open') {
        newStatus = 'done';
    } else {
        newStatus = 'open';
    }

    let data = {status: newStatus};

    let request = new XMLHttpRequest();
    request.open('PATCH', '/tasks/' + id, true);
    request.setRequestHeader('Accept', 'application/json');
    request.setRequestHeader("Content-Type", "application/json");
    request.responseType = 'json';
    request.onload = function (event) {
        if (request.status === 200) {
            element.setAttribute('data-task-status', newStatus);
            console.log(JSON.stringify(request.response));
        } else {
            console.log('Status: ' + request.status + ' ' + request.statusText);
        }
    }
    request.onerror = function (event) {
        console.error('Es ist ein Fehler aufgetreten');
    }
    request.send(JSON.stringify(data));
}
