async function fetchTasks() {
    const taskTable = document.getElementById('task-table');
    const taskTableBody = taskTable.querySelector('tbody');
    const message = document.getElementById('message');
    taskTableBody.innerHTML = '<tr><td colspan="4">Loading tasks...</td></tr>'; // Loading indicator

    try {
        const response = await fetch('/tasks');
        const tasks = await response.json();
        taskTableBody.innerHTML = '';
        if (tasks.length === 0) {
            taskTableBody.innerHTML = '<tr><td colspan="4">No tasks found.</td></tr>';
            message.textContent = 'Action Passed: No tasks found.';
            message.classList.remove('error');
            message.classList.add('success');
        } else {
            tasks.forEach(task => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${task._id}</td>
                    <td>${task.title}</td>
                    <td>${task.description}</td>
                    <td>${task.status}</td>
                `;
                taskTableBody.appendChild(row);
            });
            message.textContent = 'Action Passed: Tasks fetched successfully.';
            message.classList.remove('error');
            message.classList.add('success');
            populateTaskSelects(tasks); // Populate dropdowns for update and delete actions
        }
        taskTable.style.display = 'table';
    } catch (error) {
        taskTableBody.innerHTML = '';
        message.textContent = 'Action Failed: Could not fetch tasks.';
        message.classList.remove('success');
        message.classList.add('error');
        console.error('Error fetching tasks:', error); // Log error for debugging
    }
}

function populateTaskSelects(tasks) {
    const updateTaskSelect = document.getElementById('updateTaskSelect');
    const deleteTaskSelect = document.getElementById('deleteTaskSelect');

    updateTaskSelect.innerHTML = '<option value="">Select a task to update</option>';
    deleteTaskSelect.innerHTML = '<option value="">Select a task to delete</option>';

    tasks.forEach(task => {
        const option = document.createElement('option');
        option.value = task._id;
        option.textContent = `${task.title} (${task._id})`;
        option.setAttribute('data-task', JSON.stringify(task));
        updateTaskSelect.appendChild(option);
        deleteTaskSelect.appendChild(option.cloneNode(true));
    });
}

function handleTaskAction(event) {
    const action = document.getElementById('task-actions').value;
    if (action === 'fetch-tasks') {
        fetchTasks();
        document.getElementById('create-task-form').style.display = 'none';
        document.getElementById('update-task-form').style.display = 'none';
        document.getElementById('delete-task-form').style.display = 'none';
    } else if (action === 'create-task') {
        document.getElementById('create-task-form').style.display = 'block';
        document.getElementById('update-task-form').style.display = 'none';
        document.getElementById('delete-task-form').style.display = 'none';
    } else if (action === 'update-task') {
        document.getElementById('create-task-form').style.display = 'none';
        document.getElementById('update-task-form').style.display = 'block';
        document.getElementById('delete-task-form').style.display = 'none';
        fetchTasks(); // Ensure dropdown is populated
        document.getElementById('updateTaskSelect').addEventListener('change', populateUpdateForm);
    } else if (action === 'delete-task') {
        document.getElementById('create-task-form').style.display = 'none';
        document.getElementById('update-task-form').style.display = 'none';
        document.getElementById('delete-task-form').style.display = 'block';
        fetchTasks(); // Ensure dropdown is populated
    } else {
        document.getElementById('create-task-form').style.display = 'none';
        document.getElementById('update-task-form').style.display = 'none';
        document.getElementById('delete-task-form').style.display = 'none';
    }
}

function populateUpdateForm() {
    const taskId = document.getElementById('updateTaskSelect').value;
    if (!taskId) return;

    const taskOption = document.querySelector(`#updateTaskSelect option[value="${taskId}"]`);
    const task = JSON.parse(taskOption.getAttribute('data-task'));

    document.getElementById('updateTaskTitle').value = task.title;
    document.getElementById('updateTaskDescription').value = task.description;
    document.getElementById('updateTaskStatus').value = task.status;
}

async function createTask() {
    const title = document.getElementById('taskTitle').value;
    const description = document.getElementById('taskDescription').value;
    const status = document.getElementById('taskStatus').value;
    const message = document.getElementById('message');

    try {
        const response = await fetch('/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, description, status })
        });

        if (response.ok) {
            fetchTasks();
            document.getElementById('taskForm').reset();
            showNotification('Task created successfully');
            message.textContent = 'Action Passed: Task created successfully.';
            message.classList.remove('error');
            message.classList.add('success');
        } else {
            showNotification('Error creating task', true);
            message.textContent = 'Action Failed: Could not create task.';
            message.classList.remove('success');
            message.classList.add('error');
        }
    } catch (error) {
        showNotification('Error creating task: ' + error.message, true);
        message.textContent = 'Action Failed: Could not create task.';
        message.classList.remove('success');
        message.classList.add('error');
        console.error('Error creating task:', error); // Log error for debugging
    }
}

async function updateTask() {
    const taskId = document.getElementById('updateTaskSelect').value;
    const title = document.getElementById('updateTaskTitle').value;
    const description = document.getElementById('updateTaskDescription').value;
    const status = document.getElementById('updateTaskStatus').value;
    const message = document.getElementById('message');

    try {
        const response = await fetch(`/tasks/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, description, status })
        });

        if (response.ok) {
            fetchTasks();
            document.getElementById('updateForm').reset();
            showNotification('Task updated successfully');
            message.textContent = 'Action Passed: Task updated successfully.';
            message.classList.remove('error');
            message.classList.add('success');
        } else {
            showNotification('Error updating task', true);
            message.textContent = 'Action Failed: Could not update task.';
            message.classList.remove('success');
            message.classList.add('error');
        }
    } catch (error) {
        showNotification('Error updating task: ' + error.message, true);
        message.textContent = 'Action Failed: Could not update task.';
        message.classList.remove('success');
        message.classList.add('error');
        console.error('Error updating task:', error); // Log error for debugging
    }
}

async function deleteTask() {
    const taskId = document.getElementById('deleteTaskSelect').value;
    const message = document.getElementById('message');

    try {
        const response = await fetch(`/tasks/${taskId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            fetchTasks();
            document.getElementById('deleteForm').reset();
            showNotification('Task deleted successfully');
            message.textContent = 'Action Passed: Task deleted successfully.';
            message.classList.remove('error');
            message.classList.add('success');
        } else {
            const errorData = await response.json();
            showNotification(`Error deleting task: ${errorData.error}`, true);
            message.textContent = `Action Failed: ${errorData.error}`;
            message.classList.remove('success');
            message.classList.add('error');
        }
    } catch (error) {
        showNotification('Error deleting task: ' + error.message, true);
        message.textContent = 'Action Failed: Could not delete task.';
        message.classList.remove('success');
        message.classList.add('error');
        console.error('Error deleting task:', error); // Log error for debugging
    }
}
function showNotification(messageText, isError = false) {
    const message = document.getElementById('message');
    message.textContent = messageText;
    if (isError) {
        message.classList.remove('success');
        message.classList.add('error');
    } else {
        message.classList.remove('error');
        message.classList.add('success');
    }
}

// Event Listeners
document.getElementById('task-actions').addEventListener('change', handleTaskAction);
document.getElementById('create-task-button').addEventListener('click', createTask);
document.getElementById('update-task-button').addEventListener('click', updateTask);
document.getElementById('delete-task-button').addEventListener('click', deleteTask);

// Fetch tasks on page load
fetchTasks();
