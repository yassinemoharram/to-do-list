// Save to localStorage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('.task-item').forEach(item => {
        tasks.push({
            text: item.querySelector('span').textContent,
            completed: item.querySelector('span').style.textDecoration === 'line-through'
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load from localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks.forEach(task => {
        const listItem = document.createElement('li');
        listItem.className = 'task-item';

        const taskText = document.createElement('span');
        taskText.textContent = task.text;
        if (task.completed) {
            taskText.style.textDecoration = 'line-through';
            taskText.style.color = '#f0b573';
        }

        const editButton = document.createElement('button');
        editButton.textContent = 'EDIT';
        editButton.className = 'edit';
        editButton.onclick = function() {
            const newTask = prompt('Edit your task:', taskText.textContent);
            if (newTask) {
                taskText.textContent = newTask;
                saveTasks();  // Save after editing
            }
        };

        const completeButton = document.createElement('button');
        completeButton.textContent = 'COMPLETED';
        completeButton.className = 'complete';
        completeButton.onclick = function() {
            if (taskText.style.textDecoration === 'line-through') {
                taskText.style.textDecoration = 'none';
                taskText.style.color = '#fefbf0';
            } else {
                taskText.style.textDecoration = 'line-through';
                taskText.style.color = '#f0b573';
            }
            saveTasks();  // Save after marking as complete
        };

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'DELETE';
        deleteButton.className = 'delete';
        deleteButton.onclick = function() {
            taskList.removeChild(listItem);
            saveTasks();  // Save after deletion
        };

        listItem.appendChild(taskText);
        listItem.appendChild(editButton);
        listItem.appendChild(completeButton);
        listItem.appendChild(deleteButton);

        taskList.appendChild(listItem);
    });
}

document.getElementById('addTaskBtn').addEventListener('click', function() {
    const taskInput = document.getElementById('taskInput');
    const taskValue = taskInput.value;

    if (taskValue === '') {
        alert('Please enter a task.');
        return;
    }

    const taskList = document.getElementById('taskList');

    const listItem = document.createElement('li');
    listItem.className = 'task-item';

    const taskText = document.createElement('span');
    taskText.textContent = taskValue;

    const editButton = document.createElement('button');
    editButton.textContent = 'EDIT';
    editButton.className = 'edit';
    editButton.onclick = function() {
        const newTask = prompt('Edit your task:', taskText.textContent);
        if (newTask) {
            taskText.textContent = newTask;
            saveTasks();  // Save after editing
        }
    };

    const completeButton = document.createElement('button');
    completeButton.textContent = 'COMPLETED';
    completeButton.className = 'complete';
    completeButton.onclick = function() {
        if (taskText.style.textDecoration === 'line-through') {
            taskText.style.textDecoration = 'none';
            taskText.style.color = '#fefbf0';
        } else {
            taskText.style.textDecoration = 'line-through';
            taskText.style.color = '#f0b573';
        }
        saveTasks();  // Save after marking as complete
    };

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'DELETE';
    deleteButton.className = 'delete';
    deleteButton.onclick = function() {
        taskList.removeChild(listItem);
        saveTasks();  // Save after deletion
    };

    listItem.appendChild(taskText);
    listItem.appendChild(editButton);
    listItem.appendChild(completeButton);
    listItem.appendChild(deleteButton);

    taskList.appendChild(listItem);

    saveTasks();  // Save after adding a new task
    taskInput.value = '';  // Clear the input after adding the task
});

// Load tasks on page load
window.onload = loadTasks;
