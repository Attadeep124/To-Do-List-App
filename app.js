// app.js

// Get elements from the DOM
const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');

// Get tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to render tasks from localStorage
function renderTasks() {
  // Clear the current task list
  taskList.innerHTML = '';

  // Create a list item for each task
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.classList.toggle('completed', task.completed);

    // Task text node
    const textNode = document.createTextNode(task.text);
    li.appendChild(textNode);

    // Create "Complete" button
    const completeBtn = document.createElement('button');
    completeBtn.textContent = task.completed ? 'Task completed' : 'Complete';
    
    // Add the 'completed' class to change button color if the task is completed
    if (task.completed) {
      completeBtn.classList.add('completed');
    }

    // Toggle task completion on button click
    completeBtn.onclick = () => toggleComplete(index, completeBtn);

    // Create "Remove" button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.onclick = () => removeTask(index);

    // Append buttons to list item
    li.appendChild(completeBtn);
    li.appendChild(removeBtn);

    // Append list item to the task list
    taskList.appendChild(li);
  });
}

// Function to add a new task
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText) {
    const newTask = {
      text: taskText,
      completed: false,
    };
    tasks.push(newTask);
    taskInput.value = ''; // Clear the input field
    saveTasks();
    renderTasks();
  }
}

// Function to toggle task completion status and change button color
function toggleComplete(index, completeBtn) {
  tasks[index].completed = !tasks[index].completed;

  // Toggle the 'completed' class for the button to change color
  if (tasks[index].completed) {
    completeBtn.classList.add('completed');
    completeBtn.textContent = 'Undo'; // Change text to 'Undo'
  } else {
    completeBtn.classList.remove('completed');
    completeBtn.textContent = 'Complete'; // Change text to 'Complete'
  }

  saveTasks();
  renderTasks();
}

// Function to remove a task
function removeTask(index) {
  tasks.splice(index, 1); // Remove task from the array
  saveTasks();
  renderTasks();
}

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Event listener for "Add Task" button
addBtn.addEventListener('click', addTask);

// Allow pressing Enter to add a task
taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addTask();
  }
});

// Initial rendering of tasks from localStorage
renderTasks();
