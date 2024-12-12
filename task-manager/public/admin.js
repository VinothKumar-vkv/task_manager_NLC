document.addEventListener("DOMContentLoaded", function () {
    // Clear any existing tasks in localStorage on page load
    localStorage.removeItem("tasks");
  
    // Load tasks from localStorage when the page loads (only newly added tasks will appear)
    loadTasksFromLocalStorage();
  
    document.getElementById("taskForm").addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent form submission
  
      // Get values from the form
      const user = document.getElementById("user").value;
      const task = document.getElementById("task").value;
      const status = document.getElementById("status").value;
      const dueDate = document.getElementById("dueDate").value;
  
      // Create a new task object
      const newTask = {
        task: task,
        user: user,
        status: status,
        dueDate: dueDate
      };
  
      // Add the new task to the table
      addTaskToTable(newTask);
  
      // Save tasks to localStorage
      saveTaskToLocalStorage(newTask);
  
      // Clear form fields after submission
      document.getElementById("task").value = '';
      document.getElementById("dueDate").value = '';
    });
  
    // Function to add task to the task table
    function addTaskToTable(task) {
      const table = document.getElementById("tasksTable").getElementsByTagName('tbody')[0];
      const newRow = table.insertRow();
  
      newRow.insertCell(0).textContent = task.task;
      newRow.insertCell(1).textContent = task.user;
  
      const statusCell = newRow.insertCell(2);
      const statusSpan = document.createElement("span");
      statusSpan.classList.add("task-status");
  
      switch (task.status) {
        case "pending":
          statusSpan.classList.add("pending");
          statusSpan.textContent = "Pending";
          break;
        case "in-progress":
          statusSpan.classList.add("in-progress");
          statusSpan.textContent = "In Progress";
          break;
        case "completed":
          statusSpan.classList.add("completed");
          statusSpan.textContent = "Completed";
          break;
      }
      statusCell.appendChild(statusSpan);
  
      newRow.insertCell(3).textContent = task.dueDate;
  
      const actionsCell = newRow.insertCell(4);
      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.classList.add("btn");
      editBtn.style.backgroundColor = "#FFA500";
      editBtn.onclick = () => editTask(newRow, task);
      actionsCell.appendChild(editBtn);
  
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.classList.add("btn");
      deleteBtn.style.backgroundColor = "#f44336";
      deleteBtn.onclick = () => deleteTask(newRow);
      actionsCell.appendChild(deleteBtn);
    }
  
    // Function to save task to localStorage
    function saveTaskToLocalStorage(task) {
      let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.push(task);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  
    // Function to load tasks from localStorage when the page is loaded
    function loadTasksFromLocalStorage() {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.forEach(task => {
        addTaskToTable(task);
      });
    }
  
    // Delete task function
    function deleteTask(row) {
      const taskName = row.cells[0].textContent;
      let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks = tasks.filter(task => task.task !== taskName);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      row.parentNode.removeChild(row);
    }
  
    // Edit task function
    function editTask(row, task) {
      document.getElementById("task").value = task.task;
      document.getElementById("user").value = task.user;
      document.getElementById("status").value = task.status;
      document.getElementById("dueDate").value = task.dueDate;
  
      // Remove the task from the table and localStorage
      deleteTask(row);
    }
  });
  