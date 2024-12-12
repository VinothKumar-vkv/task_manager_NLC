// Select necessary elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const taskCounter = document.getElementById('taskCounter');
const filterButtons = document.querySelectorAll('.filter-btn');
const searchTask = document.getElementById('searchTask');
const currentDateDisplay = document.getElementById('currentDate');
const dueDateInput = document.getElementById('taskDate');

// Display today's date
const today = new Date();
currentDateDisplay.textContent = `Today's Date: ${today.toDateString()}`;

// Base API URL
const API_URL = 'http://localhost:5000/tasks';

// Load tasks from backend
async function loadTasks() {
    try {
        const response = await fetch(API_URL);
        tasks = await response.json();
        renderTasks();
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
}

// Render tasks initially
let tasks = [];
loadTasks();

// Add a new task
addTaskBtn.addEventListener('click', async () => {
    const taskText = taskInput.value.trim();

    if (!taskText) {
        alert('Please enter a task!');
        return;
    }

    const priorityLevels = ['Low', 'Medium', 'High'];
    const priority = prompt('Select task priority (Low, Medium, High):', 'Medium');

    if (!priorityLevels.includes(priority)) {
        alert('Invalid priority!');
        return;
    }

    const newTask = {
        task: taskText,
        dueDate: dueDateInput.value || null,
        priority: priority,
    };

    if (newTask.dueDate && isNaN(new Date(newTask.dueDate))) {
        alert('Invalid due date format!');
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTask),
        });

        const createdTask = await response.json();
        tasks.push(createdTask);
        renderTasks();
        taskInput.value = '';
        dueDateInput.value = ''; // Reset the due date input
    } catch (error) {
        console.error('Error adding task:', error);
    }
});

// Filter tasks
filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        renderTasks(filter);
    });
});

// Search tasks
searchTask.addEventListener('input', () => {
    const query = searchTask.value.toLowerCase();
    renderTasks('all', query);
});

// Render tasks
function renderTasks(filter = 'all', query = '') {
    taskList.innerHTML = '';

    const filteredTasks = tasks.filter((task) => {
        if (filter === 'completed') return task.completed;
        if (filter === 'pending') return !task.completed;
        return true;
    });

    const searchedTasks = filteredTasks.filter((task) =>
        task.task.toLowerCase().includes(query)
    );

    searchedTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

    searchedTasks.forEach((task) => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `
            <input type="checkbox" class="task-item-checkbox" ${task.completed ? 'checked' : ''}>
            <span>${task.task}</span>
            <small>Priority: ${task.priority || 'Medium'}</small>
            <small>${task.dueDate ? `Due: ${task.dueDate}` : 'No due date'}</small>
            <button class="delete-btn"><i class="fas fa-trash"></i></button>
            <button class="mark-completed-btn">${task.completed ? 'Undo' : 'Complete'}</button>
        `;
        taskList.appendChild(li);

        // Mark task as completed or undo
        li.querySelector('.mark-completed-btn').addEventListener('click', async () => {
            try {
                const response = await fetch(`${API_URL}/${task.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ completed: !task.completed }),
                });

                const updatedTask = await response.json();
                task.completed = updatedTask.completed;
                renderTasks();
            } catch (error) {
                console.error('Error updating task:', error);
            }
        });

        // Delete task
        li.querySelector('.delete-btn').addEventListener('click', async () => {
            try {
                await fetch(`${API_URL}/${task.id}`, { method: 'DELETE' });
                tasks = tasks.filter((t) => t.id !== task.id);
                renderTasks();
            } catch (error) {
                console.error('Error deleting task:', error);
            }
        });
    });

    updateTaskCounter();
}

// Update task counter
function updateTaskCounter() {
    taskCounter.textContent = `${tasks.filter((task) => !task.completed).length} tasks remaining`;
}
